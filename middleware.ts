import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"; 
import { redirect } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"; 
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({ 
    publicRoutes: ["/"], 
    afterAuth(auth, req) { 
      // if user logged in and on public root
      if (auth.userId && auth.isPublicRoute) { 
        let path = "/select-org"; 
        // if user logged with orgid 
        if (auth.orgId) { 
          path = `/organization/${auth.orgId}`; 
        }

        const orgSelection = new URL(path, req.url); 
        return NextResponse.redirect(orgSelection); 
      }
      // if user not logged in and trying to access private route
      if (!auth.userId && !auth.isPublicRoute) { 
        return redirectToSignIn({ returnBackUrl: req.url })
      } 
      // if user logged in without an associated orgId and not on select-org
      if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") { 
        const orgSelection = new URL("/select-org", req.url);
        return NextResponse.redirect(orgSelection); 
      }

    }
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};