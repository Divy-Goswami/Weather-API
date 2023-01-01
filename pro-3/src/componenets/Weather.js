import React, { useState, useEffect } from 'react'
import "./Weather.css"

const Weather = () => {
    const [searchvalue, setSearchvalue] = useState("Ahmedabad");
    const [tempinfo, setTempinfo] = useState({});
    const [weatherlogo, setWeathetlogo] = useState("");
    const getweatherinput = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=f592c02ece2682935d012bfea18a196f`;

            const res = await fetch(url);
            const data = await res.json();
            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;
            let currentDate = new Date();
            let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();



            const mynewInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
                time,
            }

            setTempinfo(mynewInfo);

        } catch (error) {
            console.log(error);
        }

    }
    let sec = tempinfo.sunset;
    let date = new Date(sec * 1000);
    let timestr = `${date.getHours()}:${date.getMinutes()}`;
    useEffect(() => {
        if (tempinfo.weathermood) {
            switch (tempinfo.weathermood) {
                case "Clouds": setWeathetlogo("bi-clouds")
                    break;
                case "Clear": setWeathetlogo("bi-cloud")
                    break;
                case "Haze": setWeathetlogo("bi-cloud-haze")
                    break;
                case "Sunny": setWeathetlogo("bi-brightness-high")
                    break;
                case "Mist": setWeathetlogo("bi-cloud-fog")
                    break;
                case "Smoke": setWeathetlogo("bi-cloud-fog")
                    break;
                case "Rain": setWeathetlogo("bi-cloud-drizzle")
                    break;


                default: setWeathetlogo("bi-brightness-high")
                    break;
            }
        }
    }, [tempinfo.weathermood]);
    

    useEffect(() => { getweatherinput(); }, [])
    return (
        <div    >
            <div className="container-fluid ">
                <div className="row  mt-5 text-center mb-3">
                    <div className="col-md-12 ">
                        <input type="text"  onKeyPress={(e) => {
                        if (e.key === "Enter")
                          return getweatherinput();
                        }}className="searchdiv ps-3" placeholder="✍🏻 search cities.." value={searchvalue} onChange={(e) => {
                            setSearchvalue(e.target.value);
                        }} />

                        <button className="glow-on-hover" type="button" onClick={getweatherinput}>Search</button>


                    </div>
                </div>
                <div className="container mt-4 rounded ">
                    <div className="row justify-content-center" id="logodiv">
                        <div className="col-md-10 text-center  pt-3 pb-5 rounded">
                            <h1><i className={` bi ${weatherlogo} text-light `} id="logo"></i></h1>
                        </div>
                    </div><hr />
                    <div className="row justify-content-evenly text-center text-light">
                        <div className="col-md-5 ">
                            <div className="row justify-content-evenly text-center mt-5 mb-5 " id="tempdiv" >
                                <div className="col-md-5 pt-5 pb-5"><h1 className="temp">{tempinfo.temp} <i className="bi bi-thermometer-sun text-danger"></i></h1></div>
                                <div className="col-md-5 pt-5 pb-5"><h6 className="display-6">{tempinfo.weathermood}</h6>
                                    <p>{tempinfo.name} , {tempinfo.country}</p></div>
                            </div>
                        </div>
                        <div className="col-md-5 text-light mt-3 ">
                            <div className="row text-light text-center  " id="datediv">
                                <div className="col-md-12  pt-5 pb-5"><h1 className="display-6">{new Date().toLocaleString()}</h1></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container  mt-2 mb-3 ' id="card-1">
                    <div className="row justify-content-evenly p-2" >
                        <div className="col-md-3">
                            <div className="row text-center text-light mb-4 " >
                                <div className="col-md-5 pt-2 ps-5 "><h1><i className="bi bi-sunset-fill text-warning"></i></h1></div>
                                <div className="col-md-5 pe-5"><h5 className="display-6">{timestr}</h5><p>sunset</p></div>
                            </div>
                        </div>
                        <div className="col-md-3"> <div className="row text-center text-light mb-4">
                            <div className="col-md-5 pt-2 ps-5"><h1><i className="bi bi-percent text-success"></i></h1></div>
                            <div className="col-md-5 pe-5"><h5 className="display-6">{tempinfo.humidity}</h5><p>Humidity</p></div>
                        </div></div>
                        <div className="col-md-3"> <div className="row text-center text-light mb-4">
                            <div className="col-md-5 pt-2 ps-5"><h1><i className="bi bi-cloud-arrow-down-fill text-primary"></i></h1></div>
                            <div className="col-md-5 pe-5"><h5 className="display-6">{tempinfo.pressure}</h5><p>pressure</p></div>
                        </div></div>
                        <div className="col-md-3"> <div className="row text-center text-light mb-4">
                            <div className="col-md-5 pt-2 ps-5"><h1><i className="bi bi-speedometer text-danger"></i></h1></div>
                            <div className="col-md-5 pe-5"><h5 className="display-6">{tempinfo.speed}</h5><p>speed</p></div>
                        </div></div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Weather
