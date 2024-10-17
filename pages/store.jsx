import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Head from 'next/head';
import { getServerIP } from "../lib/getServerIP";

export default function Store({ initialProducts, serverIP }) {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filteredProducts, setFilteredProducts] = useState([]);


    const getImageUrl = (url) => {
        return url.replace('localhost', serverIP);
      };



    // Filter products by title based on the search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [searchTerm, products]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const indexOfLastProduct = currentPage * limit;
    const indexOfFirstProduct = indexOfLastProduct - limit;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / limit);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setSearchTerm('');
        setFilteredProducts(products);
    };

    const truncateHTML = (html, limit) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;

        const textContent = tempElement.textContent || tempElement.innerText || '';
        const truncatedText = textContent.length > limit ? textContent.slice(0, limit) + '...' : textContent;

        const truncatedElement = document.createElement('div');
        truncatedElement.textContent = truncatedText;

        return truncatedElement.innerHTML;
    };

    return (
        <Layout>
            <Head>
                <title>Store</title>
                <meta name="description" content="Explore our collection of books available for purchase." />
                <meta name="keywords" content="books, store, buy books, online bookstore" />
                <meta name="author" content="Your Name" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Your Store Title" />
                <meta property="og:description" content="Explore our collection of books." />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_HOSTNAME} />
            </Head>
            <div className="flex flex-col justify-center border-e-red-50">
                <h1 className="font-serif items-center justify-center">Store</h1>
                <h2>All Available book &apos;s</h2>
                <div>
                    <Link href="/store/new">
                        <button className="float-right bg-black text-white p-3 rounded-md font-serif text-lg w-1/7">
                            Add New Book
                        </button>
                    </Link>
                </div>
                <div className="flex gap-10">
                    <div className="mb-4">
                        <input
                            type="search"
                            placeholder="Search by title"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border rounded p-2 border-gray-500"
                        />
                    </div>

                    <div>
                        <button onClick={handleResetFilters} className="p-2 rounded-md bg-blue-600 font-serif text-white">
                            Clear filter
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {currentProducts.length === 0 ? (
                        <div className="col-span-full text-center p-4">
                            <h2 className="text-gray-700 text-xl font-semibold">No Products Available</h2>
                            <p className="text-gray-500">Please check back later or try again.</p>
                        </div>
                    ) : (
                        currentProducts.map((product, index) => (
                            <Link key={index} href={`/store/edit/${product.title}`} className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border hover:shadow-2xl cursor-pointer">
                                <div className="p-4 rounded-lg">
                                    <img className="w-full h-48 object-cover rounded-lg" src={getImageUrl(product.images[0])} alt={product.title} />
                                    <h3 className="text-gray-900 font-bold text-xl mb-2 mt-9">{product.title}</h3>
                                    <p className="text-gray-700 text-base mb-4" dangerouslySetInnerHTML={{ __html: truncateHTML(product?.description, 40) }} />
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-900 font-bold text-lg">₹{product.discount}</span>
                                        <p className={`text-base font-semibold mb-4 ${product.quantity > 10
                                            ? 'bg-green-100 text-green-800'
                                            : product.quantity > 0
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.quantity > 10 ? 'In Stock' : product.quantity > 0 ? 'Low stock' : 'Out of Stock'}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`mx-1 text-sm font-semibold text-gray-900 ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                    >
                        &larr; Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 rounded-md border px-3 py-1 text-gray-900 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`mx-1 text-sm font-semibold text-gray-900 ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        </Layout>
    );
}

// Server-side function to fetch products
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXTAUTH_SECRET;
export async function getServerSideProps() {
    const serverIP = getServerIP();
    const url = process.env.NEXT_PUBLIC_HOSTNAME;
    const response = await fetch(`${url}/api/store`);
    const result = await response.json();

    let initialProducts = [];

    if (result.success) {
        const decryptedData = CryptoJS.AES.decrypt(result.data, SECRET_KEY);
        const stores = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
        initialProducts = stores.data;
    }

    return {
        props: {
            initialProducts,
            serverIP
        },
    };
}
