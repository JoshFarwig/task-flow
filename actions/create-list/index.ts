"use server"

import { auth } from "@clerk/nextjs"

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types"
import { CreateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const {userId, orgId} = auth();  

    if (!userId || !orgId) { 
        return { 
            error: "Unauthorized" 
        }
    }
    
    const { title, boardId } = data;  

    let list; 

    try {
        /* Find Board associated to List to see if it still exists / if the user has access to the 
        org associated with the board, then find the last list in the board to change the order of 
        the newly created board*/
        const board = await db.board.findUnique({
            where: { 
                id: boardId,
                orgId: orgId,
            }
        }) 

        if (!board) { 
            return { 
                error: "Board not found", 
            }
        }

        const lastList = await db.list.findFirst({ 
            where: { boardId: boardId }, 
            orderBy: { order: "desc" },
            select: { order: true }
        })  
 
        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
            data: { 
                title, 
                boardId, 
                order: newOrder, 
            } 
        })
    } catch (error) {
        return { 
            error: "Failed to create List"
        }
    }

    revalidatePath(`/board/${boardId}`); 
    return { data: list }; 
}; 

export const createList = createSafeAction(CreateList, handler); 
