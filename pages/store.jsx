import Layout from "../components/Layout"

export default function Store() {
    return (
        <Layout>
            <div className="flex flex-col justify-center  border-e-red-50">

                <h1 className="font-serif items-center justify-center"> Store</h1>
                <h3>All Available book&apos;s</h3>
                <div>
                    <button className="float-right bg-black text-white p-2 rounded-md font-serif" >Add New Book</button>

                </div>



                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

                    
                    <div class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
                        <img class="w-full h-48 object-cover" src="https://via.placeholder.com/300x200" alt="Product Image"/>

                            <div class="p-4">
                                <h3 class="text-gray-900 font-bold text-xl mb-2">Product Title</h3>
                                <p class="text-gray-700 text-base mb-4">This is a brief product description that provides some information about the item.</p>

                                <div class="flex items-center justify-between">
                                    <span class="text-gray-900 font-bold text-lg">₹123.00</span>
                                    
                                        {/* <p className={`text-base font-semibold mb-4 ${stockQuantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {stockQuantity > 0 ? 'In Stock' : 'Out of Stock'} */}
                                        <p className={`text-base font-semibold mb-4 ${false ? 'text-green-700 shadow-sm'  : 'text-red-500'}`}>
                                        {false ? 'In Stock' : 'Out of Stock'}
                                      </p>
                                    
                                </div>
                            </div>
                    </div>
                    
                </div>

            </div>
        </Layout>
    )
}