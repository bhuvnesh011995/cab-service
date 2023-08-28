import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';
import Management_container from '../../Common/Management_container';
import AddTollMap from './AddTollMap';
import Text_Input from '../../Common/Inputs/Text_Input';
import { useState } from 'react';
import Number_Input from '../../Common/Inputs/Number_Input';
import Selection_Input from '../../Common/Inputs/Selection_input';
import BtnDark from '../../Common/Buttons/BtnDark';
import BASE_URL from '../../../config/config';
import { useNavigate } from 'react-router-dom';

const initialToll = {
    title:"",
    status:"",
    amount:null

}



export default function AddToll() {
    const [marker,setMarker] = useState(null)
    const [toll,setToll] = useState(initialToll);
    const navigate = useNavigate()


    function handleSubmit(){
        fetch(BASE_URL+"/toll/",{
            method:"POST",
            body:JSON.stringify({...toll,location:marker}),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.success) navigate(-1)
            else console.log(data)
        }).catch(error=>console.log(error))
    }


    return(
        <Management_container title={"Add Toll"}>
            <div className='row'>
                <div className='col-lg-13'>
                    <div className='card'>
                        <div className='card-body'>
                        <AddTollMap market= {marker} setMarker={setMarker} />

                        <div className='row'>
                        <form>
                        <div>
                        <Text_Input input={toll} setInput={setToll} setKey={"title"} lebel_text={"Title :"} />
                        <div className='row'>
                        <div className='col-md-6'>
                            <div className='row'>
                            <label className='col-md-4 ms-3'>Latitude</label>
                            <input disabled className='col-md-6 ms-3' value={marker?.lat} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='row'>
                            <label className='col-md-4 ms-3'>Longitude</label>
                            <input disabled className='col-md-6 ms-3' value={marker?.lng} />
                            </div>
                        </div>
                        </div>
                        </div>
                            
                            <Number_Input input={toll} setInput={setToll} lebel_text={"Amount :"} setKey={"amount"} />
                            <Selection_Input input={toll} setInput={setToll} setKey={"status"} lebel_text={"Status :"} options={["ACTIVE","INACTIVE"]} />

                            <BtnDark handleClick={handleSubmit} title={"Add Toll"} />
                        </form>    
                        
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        
        
        </Management_container>
    )
};
