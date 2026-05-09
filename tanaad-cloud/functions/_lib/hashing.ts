/**
 * PBKDF2 password hashing — Werkzeug-compatible.
 *
 * Werkzeug (Python) stores hashes as:
 *   pbkdf2:sha256:<iterations>$<salt>$<hash>
 *
 * Where:
 *   - salt = secrets.token_hex(16) → 32-char hex string
 *   - PBKDF2 input salt = salt.encode('utf-8') (the hex string as UTF-8 bytes)
 *   - hash = hex(derived_key)
 *
 * This module replicates that exact behavior using Web Crypto API
 * so existing Flask password hashes work without a password reset.
 */

function hexEncode(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Hash a password in Werkzeug-compatible format.
 * Output: pbkdf2:sha256:600000$<salt_hex>$<derived_hex>
 */
export async function hashPassword(password: string): Promise<string> {
  const iterations = 600000;
  // Generate a 32-char hex salt (same as Werkzeug's secrets.token_hex(16))
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const salt = hexEncode(saltBytes.buffer);

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );

  // Werkzeug passes salt.encode('utf-8') — the hex string as UTF-8 bytes
  const derivedBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: enc.encode(salt), iterations, hash: 'SHA-256' },
    keyMaterial,
    256,
  );

  const hash = hexEncode(derivedBits);
  return `pbkdf2:sha256:${iterations}$${salt}$${hash}`;
}

/**
 * Verify a password against a Werkzeug-format hash.
 * Parses the stored hash to extract method, iterations, salt, and expected hash.
 */
export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const match = storedHash.match(/^pbkdf2:sha256:(\d+)\$([^$]+)\$([^$]+)$/);
  if (!match) return false;

  const [, iterStr, salt, expectedHash] = match;
  const iterations = parseInt(iterStr, 10);

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );

  const derivedBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: enc.encode(salt), iterations, hash: 'SHA-256' },
    keyMaterial,
    256,
  );

  const computedHash = hexEncode(derivedBits);
  return computedHash === expectedHash;
}
