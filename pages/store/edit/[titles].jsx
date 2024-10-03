import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
export default function Page() {

    const router = useRouter();
    const { titles } = router.query;
    //console.log(titles);
    const URL = process.env.NEXT_PUBLIC_UPLOAD_API;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState();
    const [publicationYear, setPublicationYear] = useState();
    const [publisher, setPublisher] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [language, setLanguage] = useState('');
    const [format, setFormat] = useState('');
    const [numberOfPages, setNumberOfPages] = useState();
    const [dimensions, setDimensions] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState();
    const [discount, setDiscount] = useState();
    const [quantity, setQuantity] = useState();
    const [minimumOrderQuantity, setMinimumOrderQuantity] = useState();
    const [shippingOptions, setShippingOptions] = useState('');
    const [shippingCosts, setShippingCosts] = useState('');
    const [deliveryTimes, setDeliveryTimes] = useState('');
    const [tax, setTax] = useState('');
    const [bookCoverImage, setBookCoverImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [videoLink, setVideoLink] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');

    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const [product, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`/api/store?title=${titles}`); // Replace with your API endpoint
            const result = await response.json();
            if (result.success) {

                const productData = result.data || '';
                setProducts(productData);
                setTitle(productData.title || '');
                setAuthor(productData.author || '');
                setIsbn(productData.isbn || '');
                setPublicationYear(productData.publicationYear || '');
                setPublisher(productData.publisher || '');
                setCategory(productData.category || '');
                setSubcategory(productData.subcategory || '');
                setDescription(productData.description || '');
                setKeywords(productData.keywords || '');
                setLanguage(productData.language || '');
                setFormat(productData.format || '');
                setNumberOfPages(productData.numberOfPages || '');
                setDimensions(productData.dimensions || '');
                setWeight(productData.weight || '');
                setPrice(productData.price || '');
                setDiscount(productData.discount || '');
                setQuantity(productData.quantity || '');
                setMinimumOrderQuantity(productData.minimumOrderQuantity || '');
                setShippingOptions(productData.shippingOptions || '');
                setShippingCosts(productData.shippingCosts || '');
                setDeliveryTimes(productData.deliveryTimes || '');
                setTax(productData.tax || '');
                setVideoLink(productData.videoLink || '');
                setMetaTitle(productData.metaTitle || '');
                setMetaDescription(productData.metaDescription || '');
                setMetaKeywords(productData.metaKeywords || '');
                setImages(productData.images || []);

            }

        };
        fetchProducts();
    }, [titles])




    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setImages([]);
        setIsbn('');
        setPublicationYear('');
        setPublisher('');
        setCategory('');
        setSubcategory('');
        setDescription('');
        setKeywords('');
        setLanguage('');
        setFormat('');
        setNumberOfPages('');
        setDimensions('');
        setWeight('');
        setPrice('');
        setDiscount('');
        setQuantity('');
        setMinimumOrderQuantity('');
        setShippingOptions('');
        setShippingCosts('');
        setDeliveryTimes('');
        setTax('');
        setBookCoverImage(null);
        setAdditionalImages([]);
        setVideoLink('');
        setMetaTitle('');
        setMetaDescription('');
        setMetaKeywords('');
    };

    const showToast = (type, message, options = {}) => {
        const toastOptions = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            ...options, // Merge any additional options
        };

        switch (type) {
            case 'success':
                toast.success(message, toastOptions);
                break;
            case 'info':
                toast.info(message, toastOptions);
                break;
            case 'error':
                toast.error(message, toastOptions);
                break;
            default:
                toast(message, toastOptions); // Fallback to a default toast
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            _id: product._id,
            title,
            author,
            isbn,
            publicationYear,
            publisher,
            category,
            subcategory,
            description,
            keywords,
            language,
            format,
            numberOfPages,
            dimensions,
            weight,
            price,
            discount,
            quantity,
            minimumOrderQuantity,
            shippingOptions,
            shippingCosts,
            deliveryTimes,
            tax,
            videoLink,
            metaTitle,
            metaDescription,
            metaKeywords,
            images,
        };

        try {
            const response = await axios.put('/api/store', data);
            //console.log('Data submitted successfully:', response.data);
            showToast('success', 'Book Edited successfully', { autoClose: 3000 });
            // resetForm();
            // Optionally, reset the form or handle the response as needed
        } catch (error) {
            console.error('Error submitting data:', error);
            showToast('error', '❌ Error! Something went wrong.', { autoClose: 3000 });
        }
        // Handle form submission logic here, e.g., send data to server
    };


    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],              // toggled buttons
            ['blockquote', 'code-block'],                            // block elements
            ['link', 'image', 'video', 'formula'],                   // media
            [{ 'header': 1 }, { 'header': 2 }],                      // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }], // lists
            [{ 'script': 'sub' }, { 'script': 'super' }],            // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],                // outdent/indent
            [{ 'direction': 'rtl' }],                               // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],        // custom dropdown sizes
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],              // custom header sizes
            [{ 'color': [] }, { 'background': [] }],                 // color and background
            [{ 'font': [] }],                                       // font family
            [{ 'align': [] }],                                      // text alignment
            ['clean']                                                // remove formatting button
        ],
    };

    const quillFormats = [
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'code-block',
        'link', 'image', 'video', 'formula',
        'header', 'list', 'bullet', 'check',
        'script', 'indent', 'direction',
        'size', 'color', 'background',
        'font', 'align',
        'clean'
    ];


    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            //console.log("url are", URL);
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"

            />
            <div>
                <h1 className="font-serif">Add New Book</h1>
                <div className="justify-center items-center flex flex-col mt-16" >
                    <form className=" w-2/4 justify-center flex flex-col book_from" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="bookCoverImage">Book Cover Image:</label>
                            {/* <input
                                type="file"
                                id="bookCoverImage"
                                onChange={(event) => setBookCoverImage(event.target.files[0])}
                                className="form-control"
                                accept="image/*"
                            /> */}

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
                                <input type="file" accept="image/*" onChange={uploadImages} className="hidden" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="author">Author:</label>
                            <input
                                type="text"
                                id="author"
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="isbn">ISBN:</label>
                            <input
                                type="text"
                                id="isbn"
                                value={isbn}
                                onChange={(event) => setIsbn(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="publicationYear">Publication Year:</label>
                            <input
                                type="number"
                                id="publicationYear"
                                value={publicationYear}
                                onChange={(event) => setPublicationYear(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="publisher">Publisher:</label>
                            <input
                                type="text"
                                id="publisher"
                                value={publisher}
                                onChange={(event) => setPublisher(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <input
                                type="text"
                                id="category"
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                                className="form-control"
                                list="category-options" // Link input to datalist
                            />
                            <datalist id="category-options">
                                <option value="IELTS" />
                                <option value="PTE" />
                                <option value="TOEFL" />
                                <option value="CELPIP" />
                            </datalist>
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="subcategory">Subcategory:</label>
                            <input
                                type="text"
                                id="subcategory"
                                value={subcategory}
                                onChange={(event) => setSubcategory(event.target.value)}
                                className="form-control"
                            />
                        </div> */}

                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            {/* <textarea
                                id="description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                className="form-control"
                            ></textarea> */}
                            <ReactQuill
                                id="description"
                                value={description}
                                onChange={setDescription}
                                modules={quillModules}
                                formats={quillFormats}
                                placeholder="Write Description of book here..."
                                className="border border-gray-200 p-4 rounded-md shadow-sm form-control"

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="keywords">Keywords:</label>
                            <input
                                type="text"
                                id="keywords"
                                value={keywords}
                                onChange={(event) => setKeywords(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="language">Language:</label>
                            <input
                                type="text"
                                id="language"
                                value={language}
                                onChange={(event) => setLanguage(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="format">Format:</label>
                            <input
                                type="text"
                                id="format"
                                value={format}
                                onChange={(event) => setFormat(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="numberOfPages">Number of Pages:</label>
                            <input
                                type="number"
                                id="numberOfPages"
                                value={numberOfPages}
                                onChange={(event) => setNumberOfPages(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dimensions">Dimensions:</label>
                            <input
                                type="text"
                                id="dimensions"
                                value={dimensions}
                                onChange={(event) => setDimensions(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="weight">Weight:</label>
                            <input
                                type="text"
                                id="weight"
                                value={weight}
                                onChange={(event) => setWeight(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="discount">Discount:</label>
                            <input
                                type="number"
                                id="discount"
                                value={discount}
                                onChange={(event) => setDiscount(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(event) => setQuantity(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="minimumOrderQuantity">Minimum Order Quantity:</label>
                            <input
                                type="number"
                                id="minimumOrderQuantity"
                                value={minimumOrderQuantity}
                                onChange={(event) => setMinimumOrderQuantity(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="shippingOptions">Shipping Options:</label>
                            <input
                                type="text"
                                id="shippingOptions"
                                value={shippingOptions}
                                onChange={(event) => setShippingOptions(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="shippingCosts">Shipping Costs:</label>
                            <input
                                type="number"
                                id="shippingCosts"
                                value={shippingCosts}
                                onChange={(event) => setShippingCosts(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="deliveryTimes">Delivery Times:</label>
                            <input
                                type="text"
                                id="deliveryTimes"
                                value={deliveryTimes}
                                onChange={(event) => setDeliveryTimes(event.target.value)}
                                className="form-control"
                            />
                        </div> */}

                        <div className="form-group">
                            <label htmlFor="tax">Tax:</label>
                            <input
                                type="number"
                                id="tax"
                                value={tax}
                                onChange={(event) => setTax(event.target.value)}
                                className="form-control"
                            />
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="videoLink">Video Link:</label>
                            <input
                                type="text"
                                id="videoLink"
                                value={videoLink}
                                onChange={(event) => setVideoLink(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="metaTitle">Meta Title:</label>
                            <input
                                type="text"
                                id="metaTitle"
                                value={metaTitle}
                                onChange={(event) => setMetaTitle(event.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="metaDescription">Meta Description:</label>
                            <textarea
                                id="metaDescription"
                                value={metaDescription}
                                onChange={(event) => setMetaDescription(event.target.value)}
                                className="form-control"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="metaKeywords">Meta Keywords:</label>
                            <input
                                type="text"
                                id="metaKeywords"
                                value={metaKeywords}
                                onChange={(event) => setMetaKeywords(event.target.value)}
                                className="form-control"
                            />
                        </div> */}
                        <div className="flex justify-center gap-4 items-center m-8">

                            <button type="submit" className="bg-blue-500  text-white p-2  w-1/5 font-serif rounded-lg">
                                Save Edited Book
                            </button>
                            <a href="/store">
                                <button type="button" className="bg-black  text-white p-2 px-4 w-1/7 font-serif rounded-lg ">
                                    Back
                                </button>
                            </a>

                            <a href={`/store/delete/${product?.title}`} >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" className="fill-red-600">
                                    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                </svg>
                            </a>
                        </div>
                    </form>
                </div>
            </div>


        </Layout>
    )

}