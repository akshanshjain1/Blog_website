import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'
function Rte({name,control,label,defaultValue=''}){    // control passed when rte is used
     return (
        <div className='w-full'>
            {label && <label className='initial block mb-1 pl-1 '>{label}</label>}
            <Controller
            name={name || 'some'}
            control={control}  //traking
            render={({field :{onChange}})=>(
                // jo bhi element render karnwana
                <Editor
                initialValue={defaultValue}
                init={{
                    initialValue:defaultValue,
                    height:500,
                    menubar:true,
                    plugins:[
                        'advlist',
                        'image',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblock',
                        'code',
                        'fullscreen',
                        'insertdatatime',
                        'media',
                        'table',
                        'code',
                        'help',
                        'wordcout',
                        'anchor',],
                    toolbar:"undo redo | blocks|image| bold italic| forecolor| alignleft aligncenter bold italic forecolor|alignleft aligncenter alignright|alignjustify|bullist|numlist outdent indent|removeformat|help",
                    content_style:'body {font-family:Helvetica,Arial,sans-serif;font-size:14px}'    }}
                    onEditorChange={onChange}
                />
            )}   />
        </div>
    )
}
export default Rte