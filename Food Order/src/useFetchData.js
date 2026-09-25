import { useEffect, useState } from "react";

export function useFetchData(){
    const [data, setData] = useState([]);

    async function fetchData(){
        await fetch('http://localhost:3000/meals')
        .then(res => res.json())
        .then(resData => {
            setData(resData);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return data;
}