"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';


function useFetchData(apiEndPoint) {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {

        if(initialLoad){
            // set setInitialLoad to false to prevent the api call on subreqest render 
            setInitialLoad(false);
            setLoading(false); // set loading to false to show component initaly
            return; // exit useEffect
        }
        setLoading(true);
        const fetchAllData = async () => {
            try {
                const res = await axios.get(setAllData);
               const allData = res.data;
                setAllData(allData);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching blog data",error);
                setLoading(false);
            }
        }
        if(apiEndPoint){
            fetchAllData();
        }
    }, [initialLoad, apiEndPoint])

    return {allData, loading}
}

export default useFetchData;