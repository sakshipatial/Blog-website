import React from 'react'
import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import conf from '../conf/conf'
function RTE({label, control, name, defaultValue = ""}

) {
   return (
      <div className="w-full">
         {label && <label className="inline-block mb-1 pl-1">{label}</label>}

         <Controller
            name={name || "content"}
            control={control}
            render={
               ({ field: { onChange } }) => (
                  <Editor
                     apiKey={conf.tinyMceKey}
                     initialValue={defaultValue}
                     init={
                        {
                           initialVlaue: defaultValue,
                           height: 500,
                           menubar: false,
                           plugins: [
                              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                           ],
                           toolbar: 'undo redo | blocks | ' +
                              'bold italic forecolor | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              'removeformat | help',
                           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

                        }
                     }
                     onEditorChange={onChange}
                  />
               )
            }
        />


      </div>
   )

}
export default RTE;