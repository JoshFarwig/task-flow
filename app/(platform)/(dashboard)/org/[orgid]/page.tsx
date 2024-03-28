import { db } from "@/lib/db";

const OrgIdPage = () => {  
    async function create(formData: FormData) {
        "use server"  

        const title = formData.get("title") as string; 

        await db.board.create({ 
            data: { 
                title, 
            }
        })
    }
    

    return ( 
        <div>
            <form action={create}>
                <input 
                name="title" 
                id="title"
                placeholder="Enter a Board Title"
                className="border-black border p-1"
                required
                 />
            </form>
        </div>
    );
}; 

export default OrgIdPage; 
