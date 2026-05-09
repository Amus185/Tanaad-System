/**
 * API client — wraps fetch with JWT auth and error handling.
 */
import type { ApiError } from '@/types';

const BASE_URL = '/api';

function getToken(): string | null {
  return localStorage.getItem('tanaad_token');
}

export function setToken(token: string): void {
  localStorage.setItem('tanaad_token', token);
}

export function clearToken(): void {
  localStorage.removeItem('tanaad_token');
}

class ApiClient {
  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) ?? {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => ({
        error: 'Request failed',
      }))) as ApiError;

      // If unauthorized, clear token and redirect
      if (response.status === 401) {
        clearToken();
        window.location.href = '/login';
      }

      throw new Error(errorBody.error || `HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>(path);
  }

  post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export const api = new ApiClient();
