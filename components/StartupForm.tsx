"use client"

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { useFormStatus } from 'react-dom';
import { z } from 'zod';
// import { Toast } from './ui/toast';
import { useRouter } from 'next/navigation';
//import { toast } from "@/components/ui/toast";  
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner"
import { createPitch } from '@/lib/actions';


const StartupForm = () => {
    const [errors,setErrors] = useState<Record<string,string>>({});
    const [pitch, setPitch] = useState("");
    //const { toast } = useToast();   // ✅ Correct
    
    const router = useRouter();

    const handleFormSubmit= async (prevState:any,formData: FormData) => {
        
        try {
            const formValues={
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch: pitch,
            }
            const result = await createPitch(prevState, formData, pitch);

            if (result.STATUS=="SUCCESS")
            {
                toast("Your startup pitch has been created successfully!")
                router.push(`/startup/${result._id}`);
            }

            return result;

        } catch (error) 
        {
            console.log("error:", error);
            if (error instanceof z.ZodError) 
            {
                const fieldError=error.flatten().fieldErrors;
                setErrors(fieldError as unknown as Record<string, string>);
                
                toast("Your startup pitch has been created successfully!")

                return { ...prevState, status: "ERROR", error: "Validation failed" };

            } 

            toast("Your startup pitch has been created successfully!")

            return {
                ...prevState, 
                status: "ERROR",
                error: "An unexpected error has occured" 
            };
           
        }
    }


    const [state,formAction, isPending]= useActionState(handleFormSubmit,
        {
            error:"",
            status:"INITIAL",
            isPending: false
        }
    );


  return (
    <form action={formAction} className='startup-form'>
        <div>
            <label htmlFor='title' className='startup-form_label'>
                Title
            </label>
            <Input type='text' id='title' name='title' className='startup-form_input' required placeholder='Enter your startup title' />
            {errors.title && <p className='startup-form_error'>{errors.title}</p>}
        </div>

        <div>
            <label htmlFor='description' className='startup-form_label'>
                Description
            </label>
            <Textarea id='description' name='description' className='startup-form_textarea' required placeholder='Enter your startup description' />
            {errors.description && <p className='startup-form_error'>{errors.description}</p>}
        </div>

        <div>
            <label htmlFor='category' className='startup-form_label'>
                Category
            </label>
            <Input type='text' id='category' name='category' className='startup-form_input' required placeholder='Enter your startup category(Tech, Health, Education...)' />
            {errors.category && <p className='startup-form_error'>{errors.category}</p>}
        </div>

        <div>
            <label htmlFor='link' className='startup-form_label'>
                Image URL
            </label>
            <Input type='text' id='link' name='link' className='startup-form_input' required placeholder='Enter your startup image URL' />
            {errors.link && <p className='startup-form_error'>{errors.link}</p>}
        </div>

        <div data-color-mode="light">
            <label htmlFor='pitch' className='startup-form_label'>
                Pitch
            </label>

            {/* <MDEditor 
                value={pitch} 
                onChange={(value) => setPitch(value as string)} 
                id='pitch'
                preview="edit"
                height={300}
                style={{ borderRadius:20, overflow:"hidden" }}
                textareaProps={{
                    placeholder: "Briefly describe your startup idea and what problem it solves.",
                    previewoptions: {
                        disallowedElements: ['style']
                    }
                }}
            /> */}
            <MDEditor 
                value={pitch} 
                onChange={(value) => setPitch(value as string)} 
                id='pitch'
                preview="edit"
                height={300}
                style={{ borderRadius: 20, overflow: "hidden" }}
                previewOptions={{
                    disallowedElements: ['style']
                }}
                textareaProps={{
                    placeholder: "Briefly describe your startup idea and what problem it solves.",
                }}
            />
            {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
        </div>

        <Button type='submit' className='startup-form_btn' disabled={isPending}>
            {isPending ? "Submitting..." : "Submit your Startup"}
            <Send className='size-6 ml-2' />
        </Button>

    </form>
  )
}

export default StartupForm