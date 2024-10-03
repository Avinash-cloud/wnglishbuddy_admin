import React, { useState } from 'react';
import Layout from "../components/Layout"

export default function Orders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const orders = [
        { orderId: '1', title: 'Product A', customerName: 'John Doe', date: '2024-09-01', status: 'Shipped', paymentType: 'COD', address: [{ lineone: '509 5th floar', linetwo: 'RG trade Tower', city: 'Delhi', state: 'Delhi', zipcode: '110034', country: 'India' }] },
        { orderId: '2', title: 'Product B', customerName: 'Jane Smith', date: '2024-09-02', status: 'NEW', paymentType: 'Prepaid', address: [{ lineone: '509 5th floar', linetwo: 'RG trade Tower', city: 'Delhi', state: 'Delhi', zipcode: '110034', country: 'India' }] },
        { orderId: '3', title: 'Product c', customerName: 'Avinash Purohit', date: '2024-09-02', status: 'CANALED', paymentType: 'COD', address: [{ lineone: '509 5th floar', linetwo: 'RG trade Tower', city: 'Delhi', state: 'Delhi', zipcode: '110034', country: 'India' }] },
        // Add more sample orders
    ];

    const filteredOrders = orders.filter(order =>
        (order.orderId.includes(searchTerm) ||
            order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!dateFrom || new Date(order.date) >= new Date(dateFrom)) &&
        (!dateTo || new Date(order.date) <= new Date(dateTo))
    );

    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentOrders = filteredOrders.slice(startIndex, startIndex + rowsPerPage);

    const downloadExcel = () => {
        // Logic to download data in Excel format
        // //console.log("Download Excel");
    };

    const clearFilters = () => {
        setSearchTerm('');
        setDateFrom('');
        setDateTo('');
        setRowsPerPage(10);
        setCurrentPage(1);
    };
    return (
        <Layout>
            <div className="p-4 overflow-auto">
                <input
                    type="text"
                    placeholder="Search by Order ID, Title, or Customer Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-md p-2 mr-4 flex-grow"
                />
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 overflow-auto">
                    <select
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                        className="border rounded-md p-2 mb-2 sm:mb-0 w-1/2 lg:w-1/5"
                    >
                        <option value={10}>Show 10</option>
                        <option value={20}>Show 20</option>
                        <option value={50}>Show 50</option>
                        <option value={100}>Show 100</option>
                    </select>

                    <div className="flex space-x-4 mb-2 sm:mb-0">
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="border rounded-md p-2"
                        />
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="border rounded-md p-2"
                        />
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={downloadExcel}
                            className="bg-green-800 text-white px-4 py-2 rounded-md w-auto"
                        >
                            Download Excel
                        </button>
                        <button
                            onClick={clearFilters}
                            className="bg-gray-300 text-black px-4 py-2 rounded-md"
                        >
                            Clear Filter
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start"># OrderId</th>
                                            <th scope="col" className="px-6 py-3 text-start">Date</th>
                                            <th scope="col" className="px-6 py-3 text-start">Status</th>
                                            <th scope="col" className="px-6 py-3 text-start">Payment Type</th>
                                            <th scope="col" className="px-6 py-3 text-start">Title</th>
                                            <th scope="col" className="px-6 py-3 text-start">Customer</th>
                                            <th scope="col" className="px-6 py-3 text-start">Customer Info</th>
                                            <th scope="col" className="px-6 py-3 text-start">Address</th>
                                            <th scope="col" className="px-6 py-3 text-start">Order Info</th>
                                            <th scope="col" className="px-6 py-3 text-end">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 ">
                                        {currentOrders.length > 0 ? (
                                            currentOrders.map(order => (
                                                <tr className='hover:bg-slate-100' key={order.orderId}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"># {order.orderId}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`${order.status === "NEW" ? "inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800 shadow-md" :
                                                            order.status === "Shipped" ? "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 shadow-md" :
                                                                "inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800 shadow-md"}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`${order.paymentType === "COD" ? "inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800 shadow-md" :
                                                            order.paymentType === "Prepaid" ? "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 shadow-md" :
                                                                "text-gray-700"}`}>
                                                            {order.paymentType}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.title}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.customerName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.title}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {order.address.map((add, index) => (
                                                            <div key={index}>
                                                                <div><span className='font-semibold'>Address line 1: </span>{add.lineone}</div>
                                                                <div><span className='font-semibold'>Address line 2: </span>{add.linetwo}</div>
                                                                <div><span className='font-semibold'>City: </span> {add.city}</div>
                                                                <div><span className='font-semibold'>State: </span>{add.state},</div>
                                                                <div><span className='font-semibold'>Zip Code: </span> {add.zipcode}</div>
                                                                <div><span className='font-semibold'>Country: </span> {add.country}</div>
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.title}</td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">
                                                            Cancel
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                                                    No orders found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-7'>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </Layout>
    )
}