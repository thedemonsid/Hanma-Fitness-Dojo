export { default } from "next-auth/middleware";

export const config = { matcher: ["/Diet/your-meal/(.*)", "/dashboard"] }; // This attempts to apply middleware to all routes except those starting with /api
