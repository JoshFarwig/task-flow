import { auth } from "@clerk/nextjs"; 

const OrgIdPage = () => {  
    const {userId, orgId } = auth(); 
    return ( 
        <div>
            OrgId: {orgId} 
            userId: {userId}
        </div>
    );
}; 

export default OrgIdPage; 
