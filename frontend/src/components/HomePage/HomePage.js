import './HomePage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useState} from "react";
import ActivityCard from "./ActivityCard";
import {Context} from "../../App";
import {Link} from 'react-router-dom';

function HomePage() {
    const isUserLogged = useContext(Context).isUserLogged;
    const setDisplayLoginForm = useContext(Context).setDisplayLoginForm;

    const [activities, setActivities] = useState([]);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const [loggedUser, setLoggedUser] = useState(null);

    const loggedUserId = localStorage.getItem("userId");


    const fetchLoggedUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${loggedUserId}`, {
                headers: {
                    "Authorization": localStorage.getItem("jwt"),
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setLoggedUser(data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };


 function filterActivities(activities) {
        const filteredActivities = activities.filter(activity => {
            const participantIds = activity.participants.map(participant => participant.userId);
            const isUserEnrolled = participantIds.includes(loggedUserId);

            const isMatchingCity = activity.city === loggedUser.city
            const isMatchingActivityType = activity.activityType === loggedUser.preferredActivity;

            return !isUserEnrolled && isMatchingCity && isMatchingActivityType;
        });

        console.log("filtered" + filteredActivities);
        return filteredActivities;
    }

    const fetchActivities = async () => {
        try {
            const response = await fetch('http://localhost:8080/activities/future');
            const data = await response.json();
            setActivities(filterActivities(data));
            setCurrentActivityIndex(0);
            console.log(data)
            console.log(activities)
        } catch (error) {
            console.error('Błąd podczas pobierania aktywności:', error);
        }
    };

    const fetchNextActivity = () => {
        if (currentActivityIndex < activities.length - 1) {
            setCurrentActivityIndex(currentActivityIndex + 1);
        } else {
            alert('Nie ma więcej aktywności. Chcesz wrócić do pierwszej?');
            fetchActivities();
        }
    };



       useEffect(() => {
            fetchLoggedUser();
        }, []);

        useEffect(() => {
            if (loggedUser !== null) {
                fetchActivities();
            }
        }, [loggedUser]);


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


    const handleAcceptActivity = async () => {
        await enrollUserToActivity();
        alert('Dodano do ulubionych!');
        await fetchNextActivity();
    };


    return (
        <div className='home-page'>
            <div className='delete-activity' onClick={() => fetchNextActivity()}>
                <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#000000",}}/>
            </div>
            <div className='card-activity'>
                {activities.length > 0 ? (
                    <ActivityCard activity={activities[currentActivityIndex]}/>
                ) : (
                    <div>
                        <h3>
                            We don't have more activities with Your preferences
                        </h3>

                        <Link to="/search" className={"go-to-search"}>
                            <p>Go to search to find more</p>
                        </Link>


                    </div>


                )}
            </div>

            {isUserLogged ?
                <div className='accept-activity' onClick={handleAcceptActivity}>
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