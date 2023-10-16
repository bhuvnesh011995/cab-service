import { useEffect, useState } from "react"


export default function Practice (){
    const [state,setState]= useState({name:''});
    const [img,setImg] = useState()

    useEffect(()=>{
        fetch("http://localhost:8080/",{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            const base64ImageData = arrayBufferToBase64(data.data)

            function arrayBufferToBase64(buffer){
                let binary = '';
                const bytes = new Uint8Array(buffer);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                  binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
              };
              console.log(base64ImageData)
              setImg(base64ImageData)
        })
    },[])

    function handleClick(){
    }
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"600px",height:"400px"}}>
            {img ? (
        <img src={`data:image/jpeg;base64,${img}`} alt="Image" />
      ) : (
        <p>Loading image...</p>
      )}

            <form>
                <input onChange={(e)=>setState({name:e.target.value})} type="text" width="300" />
                <input type="file" />
                <button onClick={handleClick}>submit</button>
            </form>
        </div>
    )
}