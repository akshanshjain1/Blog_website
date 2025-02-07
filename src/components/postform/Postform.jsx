import React,{useCallback,useEffect} from "react";
import { useForm } from "react-hook-form";
import service from  '../../appwrite/config'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Button,Input,Select,Rte} from '..'




export default function Postform({post}){
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.$id || '',
            content:post?.content||'',
            status:post?.status||'active',
        },
    })  /*gives register handlesubmit watch setvalue control getvalues */
    const navigate=useNavigate()
    const userData=useSelector((state)=>state.user.userData)
    const submit=async (data)=>{
        if(post){
            const file=data.image[0]? await service.uploadfile(data.image[0]):null
            if(file){
                service.deletefile(post.featuredimage)
            }
            const dbpost=await service.updatepost(post.$id/*slug */,{
                ...data,
                featuredimage:file?file.$id:undefined,
                
            
            })
            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            } }
            else{
             // no db post kuch update karne ko nhi new form
             const file=await service.uploadfile(data.image[0])
             if(file){
                const fileid=file.$id
                data.featuredimage=fileid
                const dbpost=await service.createpost({
                    ...data,
                    userid:userData.$id,

                })
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
             }
                 
            }
        }   // title ko watch  slug me value generate
        const slugtransform=useCallback((value)=>{
            if(value && typeof(value)==='string'){
                return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-')
            }
            return ''

        }
        ,[])
        useEffect(()=>{
            const subscription=watch((value,{name})=>{
                if(name==='title'){
                    setValue('slug',slugtransform(value.title,{shouldValidate:true}))
                }
            })    // use effect ke mathod ko optimise
            return ()=>{
                subscription.unsubscribe()
            }
        },[watch,slugtransform,setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
            <Input
                label='Title:'
                placeholer='Title'
                className='mb-4'
                {...register('title',{required:true})}
            
            />
            <Input
                label='Slug:'
                placeholer='Slug'
                className='mb-4'
                {...register('slug',{required:true})}
                onInput={(e)=>{
                    setValue('slug',slugtransform(e.currentTarget.value),{
                        shouldValidate:true
                    })
                }

                }
            
            />
            <Rte
            label='Content:'
            name='content'
            control={control}
            defaultValue={getValues('content')}
            
            />
            
            
            </div>
            <div className="w-1/3 px-2">
            <Input
            label='Featured image:'
            type='file'
            className='mb-4'
            accept='image/png,image/jpg,image/jpeg,image/gif'
            {...register('image',{required:!post})}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                    src={service.getfilepreview(post.featuredimage)}
                    alt={post.title}
                    className="rounded-lg"
                    
                     />
                </div>
            )}
            <Select
            options={['active,inactive']}
            label='status'
            className='mb-4'
            {...register('status',{required:true})}
            
            />
            <Button
            
            type='submit'
            bgColor={post?'bg-green-500':undefined}
            className="w-full">
            {post?"Update":"Submit"}
            </Button>
            </div>
        </form>


    )
}

