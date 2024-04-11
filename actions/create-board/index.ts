"use server" 

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { InputType, ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => { 
    const { userId, orgId } = auth();  
    // InputData is already santized through create-safe-action.ts in ./lib
    if (!userId || !orgId) { 
        return { 
            error: "Unauthorized",
        }; 
    }
     
    const { title, image } = data; 

    const [
        imageId, 
        imageThumbUrl,
        imageFullUrl, 
        imageLinkHTML, 
        imageCreator, 
    ] = image.split("|"); 

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageCreator|| !imageLinkHTML) { 
        return {
            error: "Missing fields. Failed to create board."
        }
    }

    let board; 

    try {
        board = await db.board.create({
            data: { 
                title, 
                orgId, 
                imageId, 
                imageThumbUrl, 
                imageFullUrl, 
                imageCreator, 
                imageLinkHTML
            }
        });
    } catch (error) {
        return {
            error: "Failed to create Board."
        }
    }

    revalidatePath(`/board/${board.id}`); 
    return { data: board };
} ;

export const createBoard = createSafeAction(CreateBoard, handler); 
