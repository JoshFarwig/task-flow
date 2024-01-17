"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { SideBar } from "./sidebar";

/* IMPORTANT DISTINCTION IN RENDERING: HYDRATION ERRORS
    Use client still server-side renders,  
    Hydration errors occur because each component, gets 
    server-side rendered in its first iteration. 

    When using sheet, models, other components. Server-Side 
    rendering may cause state to change in an un-expected way 
    and not match what the user has changed state to 

    To make sure something is ALWAYS client-side rendered,  
    make sure to use useEffect (this will not run on the server) 

    https://www.joshwcomeau.com/react/the-perils-of-rehydration/
*/

export const MobileSidebar = () => {   
    const pathname = usePathname(); 

    // Helps with Hydration issues, sheet components from shadcn
    const [isMounted, setIsMounted] = useState(false);

    const onOpen = useMobileSidebar((state) => state.onOpen);  
    const onClose = useMobileSidebar((state) => state.onClose);  
    const isOpen = useMobileSidebar((state) => state.isOpen); 

    // When this code is rendered client-side, isMounted will be set 
    // to true and will render the side-bar component
    useEffect(() => { 
        setIsMounted(true); 
    }, []); 

    // Whenever URL changes, mobile-siderbar will close.  
    useEffect(() => { 
        onClose()
    }, [pathname, onClose]);

    // IF this code is running and being render on the server side, 
    // isMounted = false therefore don't return anthing
    if(!isMounted) { 
        return null; 
    }

    return ( 
        <> 
            <Button 
                onClick={onOpen} 
                className="block md:hidden mr-2" 
                variant="ghost" 
                size="sm"
            >  
                <Menu className="h-4 w-4" />
            </Button>  
            <Sheet open={isOpen} onOpenChange={onClose}> 
                <SheetContent 
                    side="left" 
                    className="p-2 pt-10"
                > 
                    <SideBar 
                        storageKey="taskflow-sidebar-mobile-state"
                    />
                </SheetContent>
            </Sheet>
        </>
    ) 
}

