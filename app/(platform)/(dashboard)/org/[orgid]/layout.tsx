import { OrgControl } from "./_components/org-control";

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