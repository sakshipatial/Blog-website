import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import service from '../../appwrite/config'
import { useForm } from 'react-hook-form'
import { InputButton, RTE, SelectButton, Button } from '../index'
function PostForm({ post }) {
    const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {

        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                console.log("file is", file)
                service.deleteFile(post.featuredImage)
            }

            const dbPost = await service.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined, });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            const file = await service.uploadFile(data.image[0]);
            console.log("file is", file);
            if (file) {

                const fileId = file.$id;

                data.featuredImage = fileId;

                const dbPost = await service.addPost({ userId: userData.$id, ...data });

                if (dbPost) {
                    navigate(`/post/:${dbPost.$id}`)
                }
            }
        }

    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <InputButton
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <InputButton
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }}
                />

                <RTE label="content" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="w-1/3 px-2">
                <InputButton label="Featured Image" type="file" className="mb-4" accept="image/png , image/jpg , image/jpeg , image/gif" {...register("image", { required: !post })} />

                {post && (
                    <div className="w-full mb-4">
                        <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg" />
                    </div>
                )}

                <SelectButton
                    options={["active", "inactive"]}
                    label="status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >{post ? "update" : "submit"}
                </Button>

            </div>

        </form>
    )

}
export default PostForm;

//The onInput handler for the slug field keeps the slug synchronized even if users directly edit it.
//subscriptions allow us to listen for changes, and unsubscribing is essential to avoid memory leaks and keep our components efficient.