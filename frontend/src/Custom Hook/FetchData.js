import { useEffect, useState } from "react";
import axios from "axios";


export default function Fetchdata(url){
    const [apidata,setData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const [isError,setError] = useState(null)


    useEffect(()=>{
        setIsLoading(true)
            async function fetchData(){
             try{    
            let res = await axios.get(url);
            let data = await res?.data;

            setData(data)
            setIsLoading(false)

        }catch(error){
            setIsLoading(false)
            setError(error)
        }
        }

        fetchData()
        
    },[url])

    return {isLoading,apidata,isError}
}