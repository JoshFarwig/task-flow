import {Prisma, PrismaClient} from "@prisma/client"; 
/* The reason why we define a globalThis var as the Prisma client is due to
the nature of Next.JS Hot-Reloading or Fast-Refreshing: https://nextjs.org/docs/architecture/fast-refresh 
Since the init of a prisma client will be outside of the react Tree, Next will do a full-re render when 
we are trying to access the PrismaClient outside of the Component Tree. 
Because we dont want to have to init our prismaClient multiple times in our app, we do this

*** GLOBALTHIS is exluded from fast refreshing***

*/
declare global { 
    var prisma: PrismaClient | undefined;
}; 

// Check if we have created a PrismaClient or not, will only create new PrismaClient on start up 
export const db = globalThis.prisma || new PrismaClient(); 
// Since we are in the development env, we will set the global prisma var to the PrismaClient created on app start
if (process.env.NODE_ENV !== "production") globalThis.prisma = db; 

