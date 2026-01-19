import { registerAs } from '@nestjs/config';

export const shopifyConfig = registerAs('shopify', () => ({
  clientId: process.env.SHOPIFY_CLIENT_ID,
  clientSecret: process.env.SHOPIFY_CLIENT_SECRET,
  adminApiVersion: process.env.SHOPIFY_ADMIN_API_VERSION,
  defaultShopDomain: process.env.SHOPIFY_SHOP_DOMAIN,
  scopes: process.env.SHOPIFY_SCOPES,
}));
