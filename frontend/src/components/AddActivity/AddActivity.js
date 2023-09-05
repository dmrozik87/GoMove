import React, {useContext, useEffect, useState} from 'react';
import {Autocomplete, useJsApiLoader} from '@react-google-maps/api';
import GoogleMapComponent from "../GoogleMap/GoogleMap";
import {useNavigate} from "react-router-dom";
import {Context} from "../../App";
import {v4 as UUID} from 'uuid';
import './AddActivity.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonBiking, faPersonRunning, faPersonSkating, faPersonWalking} from "@fortawesome/free-solid-svg-icons";

const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const googleMapsLibraries = ["places"];

const AddActivity = () => {
    const setDisplayActivityAddedModal = useContext(Context).setDisplayActivityAddedModal;
    const [title, setTitle] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [activityType, setActivityType] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [city, setCity] = useState("");
    const [timeDisable, setTimeDisable] = useState(true);
    const [chosenOption, setChosenOption] = useState(null);

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const today = new Date().toISOString().substring(0, 10);

    const handleChosenOption = (option) => {
        if (chosenOption === option) {
            setChosenOption(null);
            setActivityType(null);
        } else {
            setChosenOption(option);
            setActivityType(option);
        }
    };

    const handlePlaceSelect = () => {
        const selectedPlace = window.autocomplete.getPlace();
        if (selectedPlace) {
            setSelectedAddress(selectedPlace.formatted_address);
        }

        const cityComponent = selectedPlace.address_components.find(
            component => component.types.includes('locality')
        );
        if (cityComponent) {
            setCity(cityComponent.long_name);
        }

    }

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapApiKey,
        libraries: googleMapsLibraries
    });

    function handleSubmit(e) {
        e.preventDefault();


        if(activityType === ""){
            alert("Choose correct activity type.")
            return;
        }


        if (selectedAddress === "") {
            alert("Choose correct address.");
            return;
        }


        const activityId = UUID();
        fetch("http://localhost:8080/activities", {
            headers: {Authorization: localStorage.getItem("jwt"), "Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({
                "activityId": activityId,
                "activityType": activityType,
                "owner": {
                    "userId": userId
                },
                "title": title,
                "city": city,
                "address": selectedAddress,
                "date": date,
                "time": time,
                "description": description,
                "participants": null,
                "activityPhotoUrl": null
            })
        }).then(response => {
            if (response.status === 200) {
                setDisplayActivityAddedModal(true);
                setTimeout(() => {
                    setDisplayActivityAddedModal(false)
                    navigate(`/activity-page/${activityId}`)
                }, 3000)
            } else {
                console.log("something went wrong")
            }
        })
    }

    function addHours(date, hours) {
        date.setHours(date.getHours() + hours);
        return date.toLocaleString().substring(12, 17);
    }

    function manageTime() {
        if (new Date(date).getDate() === new Date().getDate()) {
            return addHours(new Date(), 2);
        }
    }

    function dateHandler(e) {
        setDate(e.target.value);
        setTimeDisable(false);
    }

    useEffect(() => {
        manageTime();
    }, [date])

    return isLoaded ? (

        <div className="add-activity">
            <form className="add-activity-form" onSubmit={handleSubmit}>
                <div className="title-field">
                    <label className="title-label">Title</label>
                    <input
                        required={true}
                        className="title-input"
                        type="text"
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="location-field">
                    <label className="location-label">Select location</label>
                    <Autocomplete
                        onLoad={(autocomplete) => (window.autocomplete = autocomplete)}
                        onPlaceChanged={handlePlaceSelect}
                    >
                        <input type="text" placeholder="Enter a location" required={true}/>
                    </Autocomplete>
                </div>
                <div className="activity-type-field">
                    <label className="activity-type-label">Activity type</label>
                    <div className="activities ">
                        <div className={`${chosenOption === 'RUNNING' ? 'activity-add' : 'activity'}`}
                             onClick={() => handleChosenOption('RUNNING')}
                        >
                            <FontAwesomeIcon icon={faPersonRunning} size="2xl"/>
                            <p>Running</p>
                        </div>
                        <div className={`${chosenOption === 'WALKING' ? 'activity-add' : 'activity'}`}
                             onClick={() => handleChosenOption('WALKING')}
                        >
                            <FontAwesomeIcon icon={faPersonWalking} size="2xl"/>
                            <p>Walking</p>
                        </div>
                        <div className={`${chosenOption === 'SKATING' ? 'activity-add' : 'activity'}`}
                             onClick={() => handleChosenOption('SKATING')}
                        >
                            <FontAwesomeIcon icon={faPersonSkating} size="2xl"/>
                            <p>Skating</p>
                        </div>
                        <div className={`${chosenOption === 'CYCLING' ? 'activity-add' : 'activity'}`}
                             onClick={() => handleChosenOption('CYCLING')}
                        >
                            <FontAwesomeIcon icon={faPersonBiking} size="2xl"/>
                            <p>Cycling</p>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="description-label">Description</label>
                    <input
                        required={true}
                        className="description-input"
                        type="text"
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    /></div>
                <div className="date-field">
                    <label className="date-label">Date</label>
                    <input
                        required={true}
                        value={date}
                        type="date"
                        id="date"
                        name="date"
                        min={today}
                        onChange={(e) => dateHandler(e)}/>
                </div>
                <div className="time-field">
                    <label className="time-label">Time</label>
                    <input
                        disabled={timeDisable}
                        required={true}
                        value={time}
                        type="time"
                        id="time"
                        name="time"
                        min={manageTime()}
                        onChange={(e) => setTime(e.target.value)}/>
                </div>
                <button className="submit-btn" type="submit">Create activity</button>
            </form>
            {selectedAddress ?
                <div className="google-maps">
                    <p>Selected Address: {selectedAddress}</p>
                    <GoogleMapComponent height={'400px'} width={'1020px'} address={selectedAddress}/></div> : <></>}
        </div>
    ) : <></>;
};


export default AddActivity;