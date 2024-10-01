import React, { useState, useEffect } from 'react';
import { BsViewList } from "react-icons/bs"
import Layout from "../components/Layout"
import { ViewIcon } from "lucide-react"
import axios from 'axios';
const people = [
  {
    name: 'John Doe',
    title: 'Front-end Developer',
    department: 'Engineering',
    email: 'john@devui.com',
    role: 'Developer',
    image:
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
  },
  {
    name: 'Jane Doe',
    title: 'Back-end Developer',
    department: 'Engineering',
    email: 'jane@devui.com',
    role: 'CTO',
    image:
      'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
  },
]


const mockData = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    title: 'Math Teacher',
    department: 'Mathematics',
    image: 'https://via.placeholder.com/150',
    role: 'Admin',
  },
  // Add more data objects
];

export default function modules() {

  const [module, setmodule] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalItems, setTotalItems] = useState(0); // Total number of items in the API
  const [loading, setLoading] = useState(true);

  // Fetch data from API whenever page, rowsPerPage, or searchTerm changes
  useEffect(() => {
    const fetchmodules = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/modules', {
          params: {
            page: currentPage,
            limit: rowsPerPage,
            search: searchTerm
          }
        });
        setmodule(response.data.modules); // Assuming the data contains a 'modules' array
        setTotalItems(response.data.totalItems); // Assuming the API sends total items
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchmodules();
  }, [currentPage, rowsPerPage, searchTerm]);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <Layout>
      <div className="flex col-a justify-center border-e-red-50">
        <section className="mx-auto w-full  px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">modules</h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all modules. You can add new modules, edit or delete existing
                ones.
              </p>
            </div>
            <div className="flex items-center space-x-2 w-auto">
              <select
                className="rounded-md border px-3 py-2 text-sm"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <input
                type="text"
                className="rounded-md border px-3 py-2 text-sm"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <a href="/modules/new">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black w-[10rem]"
              >
                
                Add new module
                
              </button>
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="border border-gray-200 md:rounded-lg overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                          <span>Module Name</span>
                        </th>
                        <th scope="col" className="px-12 py-3.5 text-left text-sm font-normal text-gray-700">
                          Teacher
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                          Price
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                          Number of Students
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            Loading...
                          </td>
                        </tr>
                      ) : (
                        module.map((module,index) => (
                          <tr key={index}>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={module.image}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{module.name}</div>
                                  
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-12 py-4">
                              <div className="text-sm text-gray-900">{module.teacher}</div>
                              {/* <div className="text-sm text-gray-700">{module.department}</div> */}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                ₹ {module.price}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                              {module.students_no}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                              <a href="/modules/details" className="text-gray-700">
                                <ViewIcon />
                              </a>
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

          {/* Pagination */}
          <div className="flex items-center justify-center pt-6">
            <button
              className={`mx-1 text-sm font-semibold text-gray-900 ${currentPage === 1 ? 'cursor-not-allowed' : ''
                }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              &larr; Previous
            </button>
            {/* Page numbers */}
            {Array.from(
              { length: Math.ceil(totalItems / rowsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  className={`mx-1 flex items-center rounded-md border px-3 py-1 text-gray-900 hover:scale-105 ${currentPage === index + 1 ? 'bg-gray-200' : ''
                    }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              className={`mx-1 text-sm font-semibold text-gray-900 ${currentPage === Math.ceil(totalItems / rowsPerPage)
                  ? 'cursor-not-allowed'
                  : ''
                }`}
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(totalItems / rowsPerPage)}
            >
              Next &rarr;
            </button>
          </div>
        </section>
      </div>
    </Layout>
  )
}