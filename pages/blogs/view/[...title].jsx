import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { CircleUserRound, User } from 'lucide-react'
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
export default function ViewBlog() {
    const [blogInfo, setBlogInfo] = useState([]);
    const router = useRouter();
    const { title } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/blogs?title=' + title);
            const result = await res.json();
            if (result.success) {
                setBlogInfo(result.data);
            }
        };

        fetchData();
    }, [title]);


    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }
    return (
        <Layout>
            {/* <h1>{blogInfo?.title}</h1>
            <p>{blogInfo?.content}</p>
            <img src={blogInfo?.image} alt={blogInfo?.title} />
            <p>Posted by {blogInfo?.author}</p>
            <p>Posted on {formatDate( blogInfo?.createdAt)}</p>
            <button onClick={() => router.push('/blogs')}>Back to Blogs</button> 
            <div className='text-lg' dangerouslySetInnerHTML={{ __html: blogInfo.content }} />*/}

            <div className="w-full flex-row items-center">
                <div className=" flex justify-center w-full p-3">
                    <Image src={blogInfo?.cardImage} height={1000} width={1000} alt="Card image" className="m-5" />
                </div>

                <div className="flex-row justify-center">
                    <div className="container mx-auto p-10">
                        <h1 className="text-3xl font-bold mb-3">{blogInfo?.title}</h1>
                        <p className="text-sm text-gray-500">{blogInfo?.author}</p>
                        <p className="text-sm text-gray-500">{formatDate(blogInfo?.createdAt)}</p>
                        <p className="text-sm text-gray-500 flex justify-stretch">Published by <User /> {blogInfo?.author}</p>

                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                        <div className='text-lg' style={{ all: 'initial' }}
                            dangerouslySetInnerHTML={{ __html: blogInfo?.content }} />
                    </div>

                </div>
            </div>






        </Layout>
    )


}