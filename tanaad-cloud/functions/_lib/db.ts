/**
 * D1 database helper utilities.
 * Provides typed query wrappers and pagination helpers.
 */
import type { PaginatedResponse } from './types';

/**
 * Fetch a single row or null.
 */
export async function findOne<T>(
  db: D1Database,
  sql: string,
  params: unknown[] = [],
): Promise<T | null> {
  const stmt = db.prepare(sql);
  const result = await (params.length ? stmt.bind(...params) : stmt).first<T>();
  return result ?? null;
}

/**
 * Fetch multiple rows.
 */
export async function findMany<T>(
  db: D1Database,
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const stmt = db.prepare(sql);
  const result = await (params.length ? stmt.bind(...params) : stmt).all<T>();
  return result.results ?? [];
}

/**
 * Execute an INSERT/UPDATE/DELETE and return the result meta.
 */
export async function execute(
  db: D1Database,
  sql: string,
  params: unknown[] = [],
): Promise<D1Result> {
  const stmt = db.prepare(sql);
  return params.length ? stmt.bind(...params).run() : stmt.run();
}

/**
 * Paginated query helper.
 * Automatically runs a COUNT(*) query and returns structured pagination data.
 */
export async function paginate<T>(
  db: D1Database,
  baseQuery: string,
  countQuery: string,
  params: unknown[] = [],
  page = 1,
  perPage = 50,
): Promise<PaginatedResponse<T>> {
  const offset = (page - 1) * perPage;

  // Get total count
  const countStmt = db.prepare(countQuery);
  const countResult = await (params.length
    ? countStmt.bind(...params)
    : countStmt
  ).first<{ total: number }>();
  const total = countResult?.total ?? 0;

  // Get page data
  const dataQuery = `${baseQuery} LIMIT ? OFFSET ?`;
  const dataParams = [...params, perPage, offset];
  const dataStmt = db.prepare(dataQuery);
  const dataResult = await dataStmt.bind(...dataParams).all<T>();

  return {
    data: dataResult.results ?? [],
    total,
    page,
    per_page: perPage,
    total_pages: Math.ceil(total / perPage),
  };
}
