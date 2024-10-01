import Layout from "../../../components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo,setProductInfo] = useState([]);
  const {titles} = router.query;
  useEffect(() => {
    
    axios.get(`/api/store?title=${titles}`).then(response => {
      setProductInfo(response.data);
    });
  }, [titles]);
  function goBack() {
    router.push('/store');
  }
  async function deleteProduct() {
    await axios.delete(`/api/store?title=${titles}`);
    goBack();
  }
 
  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete
        &nbsp;&quot;{productInfo?.data?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteProduct}
          className="inline-flex rounded-full bg-red-100 px-2 text-s font-semibold leading-5 text-red-800 shadow-md ">Yes</button>
        <button
          className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 shadow-md"
          onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}
