import Link from "next/link"; 
import localFont from "next/font/local";  
import { Poppins } from "next/font/google";
import { Medal, Weight } from "lucide-react"; 

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";  
import { text } from "stream/consumers";
const headingFont = localFont({ 
    src: "../../public/fonts/postcss.config.woff2"
})

const textFont = Poppins({
    subsets: ["latin"], 
    weight: [ 
        "100", 
        "200", 
        "300", 
        "400",
        "500",
        "600", 
        "700", 
        "800", 
        "900"
    ]
})

const MarketingPage = () => { 
    return ( 
        <div className="flex items-center justify-center flex-col"> 
            <div className={cn(
                    "flex items-center justify-cetner flex-col", 
                    headingFont.className,
                )}>
                <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100
                text-amber-700 uppercase rounded-full">
                    <Medal className="h-6 w-6 mr-2" />
                    No 1 Task Manager 
                </div> 
                <h1 className="text-3xl md:text-6xl text-center text-central text-neutral-600 mb-6"> 
                    Task Flow helps teams
                </h1>
                <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">  
                organize and execute. 
                </div>  
            </div> 
            <div className={cn(
                    "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto", 
                    textFont.className, 
                )}> 
                    Collaborate, manage Projects, and reach new productivity peaks. 
                    From high mountains to the home office the way your team works is unique - accomplish 
                    it all with Task Flow 
            </div> 
            <Button className="mt-6" size="lg" asChild>
                <Link href="/sign-up"> 
                    Get Task Flow for Free! 
                </Link> 
            </Button>
        </div>
    );
}; 

export default MarketingPage;  