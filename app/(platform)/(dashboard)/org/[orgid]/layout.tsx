import { OrgControl } from "./_components/org-control";

const OrgIdLayout = ({ 
    children
} : { 
    children: React.ReactNode; 
}) => { 
    return ( 
        <div> 
            <OrgControl />
            {children}
        </div>
    )
}

export default OrgIdLayout; 