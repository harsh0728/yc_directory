"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils"
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client"

export const createPitch= async(
    state:any,
    formdata:FormData,
    pitch:string
)=>{
    const session=await auth();
    
    if (!session) 
        return parseServerActionResponse({
            STATUS:"ERROR",
            error:"You must be logged in to submit a pitch"}
        );

        const {title,description,category,link}=Object.fromEntries(
            Array.from(formdata).filter(([key])=>key!=="pitch")
        );

        const slug=slugify(title as string, {lower:true,strict:true});

        try {
            const startup={
                title,
                description,
                category,
                image:link,
                slug:{
                    _type:slug,
                    current:slug
                },
                author:{
                    _type:"reference",
                    _ref:session.user.id
                },
                pitch
            }
            const result=await writeClient.create({_type:"startup", ...startup});
            return parseServerActionResponse({
                STATUS:"SUCCESS",
                error:'',
                ...result
            });
            
        } catch (error) {
            console.log(error);
            return parseServerActionResponse({
                STATUS:"ERROR",
                error:JSON.stringify(error)
            });
        }

   
}