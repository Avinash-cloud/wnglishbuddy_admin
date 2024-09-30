import Layout from "../components/Layout"
import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link";
import { FaDumpster } from "react-icons/fa";
import { MdAutoDelete, MdDeleteOutline } from "react-icons/md";
export default function Store() {
    const [products, setProducts] = useState([]); // Assuming this will be fetched from an API
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10); // Limit of products per page
    const [filteredProducts, setFilteredProducts] = useState([]);
    // Sample data fetching simulation (replace with actual API call)
    useEffect(() => {
        // Simulate fetching products
        const fetchProducts = async () => {
            const response = await fetch('/api/store'); // Replace with your API endpoint
            const result = await response.json();
            if (result.success) {
                setProducts(result.data);
            }

        };
        fetchProducts();
    }, []);

    // Filter products by title based on the search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products); // Show all products when searchTerm is empty
        }
    }, [searchTerm, products]);

    console.log(products)

    // Calculate the index of the last product on the current page
    const indexOfLastProduct = currentPage * limit;
    const indexOfFirstProduct = indexOfLastProduct - limit;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate total pages
    const totalPages = Math.ceil(filteredProducts.length / limit);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleResetFilters = () => {
        setSearchTerm(''); // Reset the search term
        setFilteredProducts(products); // Reset filtered products to original list
    };

    const truncateHTML = (html, limit) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;

        // Get the text content and truncate it
        const textContent = tempElement.textContent || tempElement.innerText || '';
        const truncatedText = textContent.length > limit ? textContent.slice(0, limit) + '...' : textContent;

        // Create a new element to hold the truncated HTML
        const truncatedElement = document.createElement('div');
        truncatedElement.textContent = truncatedText;

        return truncatedElement.innerHTML; // Return the innerHTML of the truncated element
    };

    const productEdit=(data)=>{
        alert("data is",data)

    }
    return (
        <Layout>
            <div className="flex flex-col justify-center  border-e-red-50">

                <h1 className="font-serif items-center justify-center"> Store</h1>
                <h3>All Available book&apos;s</h3>
                <div>
                    <button className="float-right bg-black text-white p-2 rounded-md font-serif" ><a href="/store/new"> Add New Book </a></button>

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
                        <button className="p-2 rounded-md bg-blue-600 font-serif text-white">
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
                            <div key={index}  >
                                <div className="p-4  rounded-lg">
                                    <img className="w-full h-48 object-cover rounded-lg" src={product.images[0]} alt={product.title} />
                                    <h3 className="text-gray-900 font-bold text-xl mb-2">{product.title}</h3>
                                    <p className="text-gray-700 text-base mb-4" dangerouslySetInnerHTML={{ __html: truncateHTML(product?.description, 100) }} />
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-900 font-bold text-lg">₹{product.price}</span>
                                        <p className={`text-base font-semibold mb-4 ${product.quantity > 10
                                            ? 'inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 shadow-md'
                                            : product.quantity > 0
                                                ? 'inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800 shadow-md' // Optional: you can add a different color for limited stock
                                                : 'inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800 shadow-md'
                                            }`}>
                                            {product.quantity > 10
                                                ? 'In Stock'
                                                : product.quantity > 0
                                                    ? 'Low stock'
                                                    : 'Out of Stock'}
                                        </p>

                                        
                                    </div>
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
                        className={`mx-1 text-sm font-semibold text-gray-900 ${currentPage === 1 ? 'cursor-not-allowed' : ''
                        }`}
                    >
                        &larr; Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 flex items-center rounded-md border px-3 py-1 text-gray-900 hover:scale-105 ${currentPage === index + 1 ? 'bg-gray-200' : ''
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`mx-1 text-sm font-semibold text-gray-900 ${currentPage === Math.ceil(totalPages / limit)
                            ? 'cursor-not-allowed'
                            : ''
                          }`}
                    >
                        Next &rarr;
                    </button>
                </div>

            </div>
        </Layout>
    )
}