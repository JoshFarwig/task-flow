"use client"

import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import { use, useEffect, useState } from "react"

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";


interface ListContainerProps { 
    boardId: string; 
    data: ListWithCards[]; 
} 

export const ListContainer = ({
    boardId, 
    data,
}: ListContainerProps) => {  
    // In order to make drag n drop smooth, we transform list data into state, then only update the database when state changes 
    // This is an optimistic mutation.
    const [orderedData, setOrderedData] = useState(data);

    // 
    useEffect(() => { 
        setOrderedData(data); 
    }, [data])

    return ( 
        <ol className="flex gap-x-3 h-full">
            {orderedData.map((list, index) => { 
                return ( 
                    <ListItem   
                        key={list.id}
                        index={index} 
                        data={list}
                    />
                )
            })}
            <ListForm />
            <div className="flex-shrink-0 w-1"/>
        </ol>
    )
}