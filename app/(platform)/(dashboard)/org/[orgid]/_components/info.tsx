"use client"; 

import { useOrganization } from "@clerk/nextjs";

export const Info = () => { 
    const { organization, isLoaded} = useOrganization(); 

    if (!isLoaded) { 
        return (
            <p>
                Loading...
            </p>
        )
    }

    return ( 
        <div className="flex items-center gap-x-4"> 
            <div className="w-[60px] h-[]">

            </div>
            Info! 
        </div>
    )
}