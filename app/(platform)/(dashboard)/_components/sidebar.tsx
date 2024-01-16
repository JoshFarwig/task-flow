"use client"; 

import Link from "next/link"; 
import { Plus } from "lucide-react"; 
import { useLocalStorage } from "usehooks-ts";  
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button"; 
import { Separator } from "@/components/ui/separator"; 
import { Skeleton } from "@/components/ui/skeleton"; 
import { Accordion } from "@/components/ui/accordion"; 

import { NavItem, Organization } from "./nav-item";
// Use Local Session Storage to keep track of what user has open in sidebar

interface SidebarProps { 
    storageKey?: string
};

export const SideBar = ({ 
    storageKey = "taskflow-sidebar-state",
}: SidebarProps) => { 

    // Local storage object to track if org is open, makes it easier if user 
    // refreshes page
    // Expanded Object will look like {"my-org-id" : true}
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey,
        {}
    );

    // Getting user / org params through clerk hook, renaming with aliases 
    const { 
        organization: activeOrganization, 
        isLoaded: isLoadedOrg, 
    } = useOrganization();   

    const { 
        userMemberships, 
        isLoaded: isLoadedOrgList 
    } = useOrganizationList({ 
        userMemberships: { 
            infinite: true, 
        },
    }); 

    /* This method iterates over all active orgs, combines them into an array
    that describes what orgs are active I.E => {"org-1" : true, "org-2" : false, "org-3": true}
    becomes ["org-1", "org-3"]
    */
    const defaultAccordianValue: string[] = Object.keys(expanded) 
        .reduce((acc: string[], key: string) => { 
            if (expanded[key]) { 
                acc.push(key); 
            } 
            return acc; 
        }, []);   
    
    // Wrapper function reverse id type when added to expanded, 
    const onExpand = (id: string) => { 
        setExpanded((curr) => ({ 
            ...curr, 
            [id]: !expanded[id], 
        }));
    }; 

    // loading icon / page 
    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) { 
        return ( 
            <> 
                {/* Loading Icon */}
                <Skeleton/>
            </>
        )
    }
    
    return ( 
        <> 
            <div className="font-medium text-xs flex items-center mb-1">  
                <span className="pl-4"> 
                    Workspaces
                </span>
                <Button 
                    asChild
                    type="button"
                    size="icon" 
                    variant="ghost"
                    className="ml-auto"
                >  
                    <Link href="/select-org"> 
                        <Plus className="h-4 w-4"/>
                    </Link>
                </Button>
            </div>
            <Accordion
                type="multiple" 
                defaultValue={defaultAccordianValue} 
                className="space-y-2"
            >  
            {userMemberships.data.map( ({ organization }) => (
                <NavItem 
                    key={organization.id} 
                    isActive={activeOrganization?.id === organization.id} 
                    isExpanded={expanded[organization.id]}
                    organization={organization as Organization} 
                    onExpand={onExpand}
                />
            ))}
            </Accordion>
        </>
    );
};