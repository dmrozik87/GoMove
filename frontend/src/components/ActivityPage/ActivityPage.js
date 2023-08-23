import './ActivityPage.css';
import {useEffect, useState} from "react";
import GoogleMapComponent from "../GoogleMap/GoogleMap";
import ActivityComments from "../ActivityComments/ActivityComments";


function ActivityPage() {
    const [activityData, setActivityData] = useState("");


    const activityId = '182ebeab-a2db-4dfe-864a-1c358b697060'

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/activities/${activityId}`,);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setActivityData(data);
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };
        fetchActivityData();
    }, []);


    return (
        <div className={"activity-page"}>
            {activityData ? (
                <div>

                    <h1>{activityData.title}</h1>

                    <img src={activityData.activityPhotoUrl} alt={activityData.title} className="activity-image"/>

                    <h3>What?</h3>
                    <p>{activityData.description}</p>

                    <h3>When?:</h3>
                    <p>{activityData.date}, {activityData.time}</p>

                    <h3>Where?</h3>
                    <p>City: {activityData.city}</p>
                    <p>Street: {activityData.street}</p>

                    <GoogleMapComponent height={'400px'} width={'400px'}
                                        address={`${activityData.city} ${activityData.street}`}/>

                    <h3>Who?</h3>


                    <p>
                        {activityData.participants.map((participant) => participant.username).join(', ')}
                    </p>

                    <h3>Leave a message:</h3>
                    <ActivityComments currentActivityID={activityId}/>


                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ActivityPage;