export { default } from "next-auth/middleware";

export const config = { matcher: ["/((?!api).*)"] }; // This attempts to apply middleware to all routes except those starting with /api