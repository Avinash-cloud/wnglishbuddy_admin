import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { useState, useEffect } from "react";
import TutorProfile from "../../../components/TutorProfile";




export default function Details() {
    const router = useRouter();
    const { id } = router.query;
    const [tutor, setTutor] = useState([]);

    const featchData = async () => {
        try {
            const res = await fetch(`/api/tutor?id=${id}`);
            const data = await res.json();
            setTutor(data.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        featchData();
    }, [id]);

console.log(tutor.education); 


    return ( 
        <Layout>
            <TutorProfile data={tutor} />
        </Layout>
    )
}