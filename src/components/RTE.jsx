import React from 'react'
import {Editor } from '@tinymce/tinymce-react'; //yhase editor aata hai
import {Controller } from 'react-hook-form'; //yha se controller aata h. kyuki h, dusre jagho p editor ka use karenge so monitor the editoe even there we need this controller.


export default function RTE({name, control, label, defaultValue =""}) { //y control aata h react-hook-form se
  return (
    <div className='w-full'> 
    {/* if there is label then show that */}
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>} 

    <Controller //controls the editor
    name={name || "content"}
    control={control}
    defaultValue={defaultValue}
    render={({field: {onChange, value}}) => ( //it will render the feild of editor on any change.
        <Editor
        apiKey='wosluhtlw0e72da8ua71y6811kn3mzsvcyhjz9znztfnnj13'
        value={value}
        init={{
           //defining how editor will be
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar: //what tools editor have
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}  //the controller renders on change. onchange method will happen on any editor change.
        />
    )}
    />

     </div>
  )
}