import { OrganizationList } from "@clerk/nextjs"; 

export default function CreateOrgList () { 
    return ( 
        <OrganizationList  
        hidePersonal 
        afterCreateOrganizationUrl="/org/:id"
        afterSelectOrganizationUrl="/org/:id"
        />
    );
};