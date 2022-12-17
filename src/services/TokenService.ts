import { NextPageContext } from "next";
import nookies from "nookies";

type TokenServiceContext = NextPageContext | null;

const key = "client";

export const TokenService = {
  save(ctx: TokenServiceContext, token: string) {
    return nookies.set(ctx, key, JSON.stringify(token));
  },

  get(ctx: TokenServiceContext = null) {
    const cookies = nookies.get(ctx);
    return JSON.parse(cookies.client);
  },

  destroy(ctx: TokenServiceContext) {
    return nookies.destroy(ctx, key);
  },
};
