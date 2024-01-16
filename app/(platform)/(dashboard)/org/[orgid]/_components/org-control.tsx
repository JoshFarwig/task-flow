"use client"; 

import { useEffect } from "react"; 
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs"; 

// Component to control client side URL changes when switching organizations 
// uses clerk's setActive Function. 
export const OrgControl = () => { 

    const params = useParams(); 
    const { setActive } = useOrganizationList(); 
     
    useEffect(() => {  
        if (!setActive) return;
        setActive({ 
            organization: params.orgid as string,
        })

    }, [setActive, params.orgid])

    return null; 
}