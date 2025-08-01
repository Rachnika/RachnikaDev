"use client";
import BreadCrumb from '@/components/Application/Admin/BreadCrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useFetch from '@/hooks/useFetch'
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '@/routes/AdminPanelRoute';
import {use, useEffect, useState} from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from '@/components/Application/ButtonLoading';
import { zSchema } from '@/lib/zodSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
import { showToast } from '@/lib/showToast';
import axios from 'axios';
 
const  breadCrumbData=[
  {
    href:ADMIN_DASHBOARD,
    label:'Home'
  },
  {
    href:ADMIN_MEDIA_SHOW,
    label:'Media'
  },
  {
    href:"",
    label:'Edit Media'
  }
]

const EditMedia = ({params}) => {
  const {id}=use(params)
  const {data:mediaData} =useFetch(`/api/media/get/${id}`)
  const [loading,setLoading]=useState(false)

  const formSchema = zSchema
      .pick({
        _id:true,
        alt:true,
        title:true
      })
      
  
    // Importing the zod schema for form validation
    // define form schema using zod
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        _id:"",
        alt:"",
        title:"",
      },
    });

    useEffect(()=>{
      if(mediaData && mediaData.success){
        const data=mediaData.data
        form.reset({
          _id:data._id,
          alt:data.alt,
          title:data.title
        })
      }

    },[mediaData])
  
    // handle form submission
    const onSubmit = async (values) => {
      try {
        setLoading(true);
        // Assuming the API endpoint is /api/medi/update
        const { data: response } = await axios.put(
          "/api/media/update",
          values
        );
        if (!response.success) {
          throw new Error(response.message);
        }
        showToast("success", response.message);
      } catch (error) {
        showToast("error", error.message);
      } finally {
        // Reset loading state
        setLoading(false);
      }
    };





  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData}/>


      <Card className="py-0 rounded shadow-sm ">
              <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
                <h4 className='text-xl font-semibold'>Edit Media</h4>
              </CardHeader>
      
              
      
              <CardContent className="pb-5">



              <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)}>

                          <div className='mb-5'>
                              <Image
                                src={mediaData?.data?.secure_url || imgPlaceholder}
                                width={150}
                                height={150}
                                alt={mediaData?.alt || 'Image'}
                                
                              />
                          </div>
                            <div className="mb-5">
                              <FormField
                                control={form.control}
                                name="alt"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Alt </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        placeholder="Enter Alt"
                                        {...field}
                                      />
                                    </FormControl>
              
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="mb-5">
                              <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Title </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        placeholder="Enter Title"
                                        {...field}
                                      />
                                    </FormControl>
              
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
              
                            <div className="mb-3">
                              <ButtonLoading
                                loading={loading}
                                type="submit"
                                text="Update Media"
                                className="cursor-pointer"
                              />
                            </div>
              
                            
                          </form>
                        </Form>
 
              </CardContent>
            </Card>


    </div>
  )
}

export default EditMedia