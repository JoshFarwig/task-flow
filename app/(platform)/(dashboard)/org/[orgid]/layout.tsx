
import { startCase } from "lodash";

import { OrgControl } from "./_components/org-control";
import { auth } from "@clerk/nextjs";

export async function generateMetadata() { 
    const { orgSlug } = auth(); 
    
    return { 
        title: startCase(orgSlug || "organization"),
    }
}
const OrgIdLayout = ({ 
    children
} : { 
    children: React.ReactNode; 
}) => { 
    return ( 
        <div className="w-full h-auto"> 
            <OrgControl />
            {children}
        </div>
    )
}

export default OrgIdLayout; 