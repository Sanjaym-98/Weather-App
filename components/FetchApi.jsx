import { useEffect, useState } from "react";

const FetchApi=()=>{
    const [city,setcity]=useState("")
    const [name,setname]=useState("")
    const [temperature,settemperature]=useState("");
    const [range,setrange]=useState("");
    const [humidity,sethumidity]=useState("");
    const [sealevel,setsealevel]=useState("");
    const [groundlevel,setgroundlevel]=useState("");
    const [validation,setvalidation]=useState(true)
    const [place,setplace]=useState([])
    useEffect(()=>{
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5e07840d752cbf5afce5f8e4146731cf`).then((resp)=>{
           return resp.json()
        }).then((data)=>{
            console.log(data)
            console.log(data.message)
            if(data.message === "city not found"){
                setvalidation(false)
            }else{
                setvalidation(true)
            }
            console.log(data.name)
           setname(data.name)
          if(place.length>=2){
            place.shift()
          }
           
            settemperature(data.main.temp)
            setrange(data.main.temp_max)
            sethumidity(data.main.humidity) 
            setsealevel(data.main.sea_level)   
            setgroundlevel(data.main.grnd_level)
            setplace((prevPlace) => [...prevPlace, data.name]);
            
        console.log(place)
            
        }).catch((err)=>{console.log(err)})
    },[city])
  
    return (
        <div>
 <input type="text" onChange={(e)=>{setcity(e.target.value)}} id="input"/>
        {(city.length && validation)?(<div id="data">
        <h3>Weather details of the city:{name}</h3>
        <h3>Current Temperature:{temperature-parseInt( 273.15)}</h3>
        <h3>Temperature Range:{range-parseInt( 273.15)}C to {range-parseInt( 273.15)}C</h3>
        <h3>Humidity:{humidity}</h3>
        <h3>Sea Level:{sealevel}</h3>
        <h3>Ground Level:{groundlevel}</h3> 
        </div>):(<h1>Please enter Valid City Name</h1>)}
        
        {place.map((val,idx)=>{
            return <li key ={idx}>{val}</li>
        })}
        </div>

    )
}

export default FetchApi;