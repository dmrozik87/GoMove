import './HomePage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useState} from "react";
import ActivityCard from "./ActivityCard";
import {Context} from "../../App";

function HomePage() {
    const isUserLogged = useContext(Context).isUserLogged;
    const setDisplayLoginForm = useContext(Context).setDisplayLoginForm;

    const [activities, setActivities] = useState([]);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

    const loggedUserId = localStorage.getItem("userId");



    const filteredActivities = activities.filter(activity => {
        const participantIds = activity.participants.map(participant => participant.userId);
        return !participantIds.includes(loggedUserId);
    });


    console.log(filteredActivities)

    const fetchActivities = async () => {
        try {
            const response = await fetch('http://localhost:8080/activities/future');
            const data = await response.json();
            setActivities(data);
            setCurrentActivityIndex(0);
        } catch (error) {
            console.error('Błąd podczas pobierania aktywności:', error);
        }
    };

    const fetchNextActivity = () => {
        if (currentActivityIndex < activities.length - 1) {
            setCurrentActivityIndex(currentActivityIndex + 1);
        } else {
            alert('Nie ma więcej aktywności. Chcesz wrócić do pierwszej?');
            setCurrentActivityIndex(0);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);


    const enrollUserToActivity = () => {
        fetch(`http://localhost:8080/users/enroll/${loggedUserId}/${activities[currentActivityIndex].activityId}`, {
            method: 'PATCH',
            headers: {
                "Authorization": localStorage.getItem("jwt"),
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Enrollment failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='home-page'>
            <div className='delete-activity' onClick={() => fetchNextActivity()}>
                <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#000000",}}/>
            </div>
            <div className='card-activity'>
                {activities.length > 0 ? (
                    <ActivityCard activity={filteredActivities[currentActivityIndex]}/>
                ) : (
                    <p>Pobieranie aktywności...</p>
                )}
            </div>

            {isUserLogged ?
                <div className='accept-activity' onClick={() => {
                    fetchNextActivity();
                    enrollUserToActivity();
                    alert('Dodano do ulubionych!');
                }}>
                    <FontAwesomeIcon icon={faCheck} size="2xl" style={{color: "#000000"}}/>
                </div>
                :
                <div className='accept-activity' onClick={() => {
                    setDisplayLoginForm(true);
                }}>
                    <FontAwesomeIcon icon={faCheck} size="2xl" style={{color: "#000000"}}/>
                </div>
            }
        </div>
    )
}

export default HomePage;