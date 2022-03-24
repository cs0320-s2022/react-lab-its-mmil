import React, {useState} from 'react';
import './App.css';
import TextBox from "./TextBox";
// @ts-ignore
import {AwesomeButton} from "react-awesome-button"
import "react-awesome-button/dist/styles.css";
// @ts-ignore
import axios from 'axios'

function Horoscope() {
    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");

    const [horoscope, setHoroscope] = useState([]);

    const requestHoroscope = () => {
        const toSend = {
            sun: sun,
            moon: moon,
            rising: rising
        };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        axios.post("http://localhost:4567/horoscope", toSend, config)
            .then((response : any) => {
                console.log(response.data);
                setHoroscope(response.data["horoscope"]);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }


  return (
      <div>
        <h1>Horoscopes!</h1>
        <TextBox label={"Sun Sign "} change={setSun}/>
        <TextBox label={"Moon Sign "} change={setMoon}/>
        <TextBox label={"Rising Sign "} change={setRising}/>
        <AwesomeButton type="primary" onPress={requestHoroscope}>Request Horoscope!</AwesomeButton>
          {horoscope.map(result => <li>{result}</li>)}
      </div>
  );
}

export default Horoscope;

