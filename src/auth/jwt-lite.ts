function base64UrlDecode(input: string): string {
  const padded = input.padEnd(input.length + ((4 - (input.length % 4)) % 4), '=');
  const b64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(b64, 'base64').toString('utf8');
}

export type JwtClaims = Record<string, unknown>;

export function decodeJwtNoVerify(token: string): JwtClaims | null {
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    return JSON.parse(base64UrlDecode(parts[1])) as JwtClaims;
  } catch {
    return null;
  }
}

export type RequestIdentity = {
  userId: string;
  name?: string;
  email?: string;
};

export function identityFromBearer(authHeader: string | undefined): RequestIdentity | null {
  if (!authHeader) return null;
  const m = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  const token = m[1].trim();
  if (!token) return null;
  const claims = decodeJwtNoVerify(token);
  if (!claims) return null;

  const userId =
    (claims.sub as string | undefined) ??
    (claims.userId as string | undefined) ??
    (claims.id as string | undefined);

  if (!userId) return null;

  return {
    userId,
    name: (claims.name as string | undefined) ?? (claims.userName as string | undefined),
    email: claims.email as string | undefined,
  };
}

