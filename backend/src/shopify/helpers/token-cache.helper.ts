/**
 * Token cache helper for managing Shopify access tokens
 */
export type TokenCache = {
  token: string;
  expiresAtMs: number;
};

export class TokenCacheHelper {
  private cache: Record<string, TokenCache | undefined> = {};

  /**
   * Get cached token if it exists and is not expired
   * @param shopDomain - Shopify shop domain
   * @param bufferMs - Buffer time in milliseconds before expiration (default: 60 seconds)
   * @returns Cached token or undefined if not found/expired
   */
  get(shopDomain: string, bufferMs = 60_000): string | undefined {
    const cached = this.cache[shopDomain];
    if (cached && cached.expiresAtMs - Date.now() > bufferMs) {
      return cached.token;
    }
    return undefined;
  }

  /**
   * Set token in cache
   * @param shopDomain - Shopify shop domain
   * @param token - Access token
   * @param expiresInSeconds - Token expiration time in seconds
   */
  set(shopDomain: string, token: string, expiresInSeconds: number): void {
    const expiresAtMs = Date.now() + expiresInSeconds * 1000;
    this.cache[shopDomain] = { token, expiresAtMs };
  }

  /**
   * Clear token cache for a specific shop or all shops
   * @param shopDomain - Optional shop domain, if not provided clears all
   */
  clear(shopDomain?: string): void {
    if (shopDomain) {
      delete this.cache[shopDomain];
    } else {
      this.cache = {};
    }
  }

  /**
   * Check if token exists and is valid
   * @param shopDomain - Shopify shop domain
   * @returns True if token exists and is valid
   */
  hasValidToken(shopDomain: string): boolean {
    return this.get(shopDomain) !== undefined;
  }
}
