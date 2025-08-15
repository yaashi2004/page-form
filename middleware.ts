import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Add public routes that don't require authentication
  publicRoutes: [
    "/",
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
    "/submit/(.*)", // Allow form submissions without auth
    "/_next/(.*)", // Allow Next.js assets
    "/favicon.ico",
  ],
  // Add ignored routes that bypass middleware completely
  ignoredRoutes: [
    "/api/webhook/(.*)",
    "/_next/(.*)",
    "/favicon.ico",
    "/api/trpc/(.*)",
    "/(.*\\.(?:css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot))",
  ],
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};