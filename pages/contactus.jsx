import { useState } from "react";
import Layout from "../components/Layout";

export default function contactus({initialProducts}) {

    const [data, setBanner] = useState(initialProducts)

    const [loading, setloading] = useState(false);

  const generateCoolId = (id) => {
        // Select a part of the original ID, for example, the first 4 and last 4 characters
        const prefix = "EBC-"; // You can add a prefix if needed
        const shortId = `${id.slice(0, 4)}-${id.slice(-4)}`; // Taking first 4 and last 4 characters
        return `${prefix}${shortId}`;
    };

    return (
        <Layout>
            <h1 className="font-serif">Contact us </h1>

            <div>
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-4">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="border border-gray-200 md:rounded-lg overflow-auto">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                                #ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                                Number
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                                Place
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                                Message
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                                Date
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {loading ? (
                                            <tr>
                                                <td colSpan="3" className="text-center py-6">
                                                    <span className="text-gray-500">Loading...</span>
                                                </td>
                                            </tr>
                                        ) : (
                                            data?.map((module, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition ease-in-out duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {generateCoolId(module._id)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {module.firstname} {module.lastname }
                                                       
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <a href={`tel:+${module.phone}`}>{module.phone}</a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <a href={`mailto:${module.email}`}>{module.email}</a>
                                                    </td>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                         <span className="font-semibold"> City :</span>{module.city} , <span className="font-semibold"> Country :</span>{module.country}
                                                    </td>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {module.message}
                                                    </td>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {new Date(module.createdAt).toLocaleString()}
                                                    </td>

                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <ImageModal open={modalOpen} onClose={closeModal2} imageUrl={selectedImage} /> */}
            </div>

        </Layout>
    )
}




// Server-side function to fetch products
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXTAUTH_SECRET;
export async function getServerSideProps() {
    
    const url = process.env.NEXT_PUBLIC_HOSTNAME;
    const response = await fetch(`${url}/api/contactus`); // Replace with your API endpoint
    const result = await response.json();

    let initialProducts = [];


    // console.log("hellow",serverIP)
    

    if (result.success) {
        // Decrypt the encrypted data
        const decryptedData = CryptoJS.AES.decrypt(result.data, SECRET_KEY);
        const stores = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

        initialProducts = stores.data; // Extract the actual data from the decrypted object
    }

    // console.log('initialProducts is',initialProducts)

    return {
        props: {
            initialProducts,
           
        },
    };
}
