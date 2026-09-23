const encoder = new TextEncoder();

export async function hashPassword(password: string, saltB64?: string) {
  const salt = saltB64
    ? base64ToBytes(saltB64)
    : crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: 120_000,
      hash: 'SHA-256'
    },
    key,
    256
  );

  const hash = bytesToBase64(new Uint8Array(bits));

  return `pbkdf2$120000$${bytesToBase64(salt)}$${hash}`;
}

export async function verifyPassword(password: string, stored: string) {
  const parts = stored.split('$');

  if (parts.length !== 4 || parts[0] !== 'pbkdf2') {
    return false;
  }

  const salt = parts[2];
  const expected = parts[3];

  const recomputed = await hashPassword(password, salt);
  const recomputedParts = recomputed.split('$');

  return recomputedParts[3] === expected;
}

export function newId(prefix: string) {
  const bytes = crypto.getRandomValues(new Uint8Array(16));

  return `${prefix}_${bytesToBase64(bytes)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '')}`;
}

export function bytesToBase64(bytes: Uint8Array) {
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

export function base64ToBytes(base64: string) {
  const binary = atob(base64);
  const output = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    output[i] = binary.charCodeAt(i);
  }

  return output;
}