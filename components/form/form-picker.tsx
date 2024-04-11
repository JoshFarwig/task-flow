"use client"; 


import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { unsplash } from "@/lib/unsplash"; 
import { cn } from "@/lib/utils";
import Image from "next/image";

import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface FormPickerProps { 
    id: string; 
    errors?: Record<string, string[] | undefined>;  
}; 

export const FormPicker = ({
    id, 
    errors,
}: FormPickerProps) => { 
    const { pending } = useFormStatus(); 

    const [images, setImages] = useState<Array<Record<string, any>>>([]) 
    const [isLoading, setIsLoading] = useState(true); 
    const [selectedImageId, setSelectedImageId] = useState(null); 

    useEffect(() => { 
        const fetchImages = async () => { 
            try { 
                const result = await unsplash.photos.getRandom({ 
                    // Collection ID that Trello uses for their default wallpapers
                    collectionIds: ["317099"], 
                    count: 9. 
                }); 

                if (result && result.response) { 
                    const resultImages = (result.response as Array<Record<string, any>>); 
                    setImages(resultImages);
                } else { 
                    console.error("Failed to get images from Unsplash"); 
                }
            } catch (error) { 
                console.log(error); 
                setImages(defaultImages);
            } finally { 
                setIsLoading(false);
            }
        }; 

        fetchImages();
    }, [])
    
    if (isLoading) { 
        return (
            <div className="p-6 flex items-center justify-center"> 
                <Loader2 className="h-6 w-6 text-sky-700 animate-spin"/> 
            </div>
        ); 
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
        
                {images.map((image) => (
                    <div 
                        key={image.id}
                        className={cn(
                            "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted", 
                            pending && "opacity-50 hover:opacity-50 cursor-auto" 
                        )}
                        onClick={() => {
                            if (pending) return; 
                            setSelectedImageId(image.id); 
                        }}
                    >
                        <input 
                            type="radio"
                            id={id}
                            name={id}
                            className="hidden"
                            checked={selectedImageId === image.id} 
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />
                        <Image 
                            src={image.urls.thumb}
                            alt="Unsplash Image"
                            className="object-cover rounded-sm"
                            fill
                            />
                            {/* Make sure to consider DOM layering order, fixed by making check
                            render after image, not before. */}
                            {selectedImageId === image.id && (
                                <div className="absolute inset-y-0 h-full w-full bg-black/30 
                                flex items-center justify-center">
                                    <Check 
                                        className="h-4 w-4 text-white"
                                    />
                                </div>
                            )}
                        {/* There are a few guidelines for the Unsplash License for Production, 
                        one is a hotlink to the orginal image URL. I am making this app for educational
                        purposes but incase for future uses, will apply link here to the guidelines
                        https://help.unsplash.com/api-guidelines/unsplash-api-guidelines */}
                        <Link 
                            href={image.links.html} 
                            target="_blank" 
                            className="opacity-0 group-hover:opacity-100 absolute 
                            bottom-0 w-full text-[10px] truncate text-white 
                            hover:underline p-0.5 bg-black/50"
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            <FormErrors 
                id="image"
                errors={errors}
            />
        </div>
    );
};