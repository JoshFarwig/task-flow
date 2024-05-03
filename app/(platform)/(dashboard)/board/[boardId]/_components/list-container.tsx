"use client"

import { List } from "@prisma/client";


interface ListContainerProps { 
    boardId: string; 
    data: List[]; 
} 

export const ListContainer = ({
    boardId, 
    data,
}: ListContainerProps) => { 
    return ( 
        <div>
            List Container
        </div>
    )
}