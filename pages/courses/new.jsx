/**
 * The function `Courses` in this JavaScript React component manages a multi-step form for creating
 * courses with image upload functionality.
 */
import Layout from "../../components/Layout";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
export default function Courses() {
    const URL = process.env.NEXT_PUBLIC_UPLOAD_API;
    const [step, setStep] = useState(1); // Tracks which form is visible
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save data goes here

        // Move to next step
        handleNext();
    };

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            console.log("url are", URL);
            const res = await axios.post(`${URL}:5000/api/upload`, data);
            setImages((oldImages) => {
                return [...oldImages, res.data.fileUrl];
            });
            setIsUploading(false);
        }
    }
    function updateImagesOrder(images) {
        setImages(images);
    }
    return (
        <Layout>
            <div className="container mx-auto mt-8">
                <div className="tabs">
                    <div className={`tab ${step === 1 ? 'active' : ''}`}>Course cover</div>
                    <div className={`tab ${step === 2 ? 'active' : ''}`}>Form 2</div>
                    <div className={`tab ${step === 3 ? 'active' : ''}`}>Form 3</div>
                </div>

                <div className="form-content mt-4">
                    {step === 1 && (
                        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                            <h2 className="text-xl font-bold mb-4">Basic Detail </h2>
                            <div className="mb-4 w-2/4">
                                <label className="block text-sm font-medium text-gray-700"> Course name </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />

                            </div>
                            <div className="mb-4 w-2/4">
                                <label className="block text-sm font-medium text-gray-700">Teacher</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />

                            </div>
                            <div className="mb-4 w-2/4">
                                <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                <div className="mb-2 flex flex-wrap gap-1">
                                    <ReactSortable
                                        list={images}
                                        className="flex flex-wrap gap-1"
                                        setList={updateImagesOrder}
                                    >
                                        {!!images?.length &&
                                            images.map((link) => (
                                                <div
                                                    key={link}
                                                    className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                                                >
                                                    <img src={link} alt="" className="rounded-lg" height={100} width={100} />

                                                </div>
                                            ))}
                                    </ReactSortable>
                                    {isUploading && (
                                        <div className="h-24 flex items-center">
                                            <Spinner />
                                        </div>
                                    )}
                                    <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                            />
                                        </svg>
                                        <div>Add image</div>
                                        <input type="file" onChange={uploadImages} className="hidden" />
                                    </label>
                                </div>

                            </div>
                            <div className="mb-4 w-2/4">
                                <label className="block text-sm font-medium text-gray-700">Course Category</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Save & Next
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-xl font-bold mb-4">Form 2</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Save & Next
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-xl font-bold mb-4">Form 3</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </div>

        </Layout>
    )


}


