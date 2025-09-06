import { z } from "zod";

export const formSchema=z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }).max(100, { message: "Title must be at most 100 characters long" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }).max(500, { message: "Description must be at most 500 characters long" }),
    category: z.string().min(3, { message: "Category must be at least 3 characters long" }).max(50, { message: "Category must be at most 50 characters long" }),
    link: z.string().url({ message: "Link must be a valid URL" })
    .refine(async(url)=>{
        try {
            const res=await fetch(url, {method:"HEAD"});
            const contentType=res.headers.get("Content-Type");
            return contentType?.startsWith("image/")?true:false;
            
        } catch (error) {
            return false;
        }
    }),
    pitch: z.string().min(10, { message: "Pitch must be at least 20 characters long" }).max(2000, { message: "Pitch must be at most 2000 characters long" }),
}); 