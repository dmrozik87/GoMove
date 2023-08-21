import {useEffect, useState} from "react";

function CitySelect({setActivitiesList,}) {

    const [cities, setCities] = useState([]);
    const [city, setCity] = useState("");

    async function getAllCities() {
        const response = await fetch(
            "http://localhost:8080/activities/cities", {
                method: "GET",
                "headers": {
                    "Authorization": localStorage.getItem("jwt"),
                }
            }
        );
        const data = await response.json();
        setCities(data);
    }

    useEffect(() => {
        getAllCities();
    }, []);

    async function getActivitiesByCity() {
        const response = await fetch(
            `http://localhost:8080/activities/filter?city=${city}`, {
                method: "GET",
                "headers": {
                    "Authorization": localStorage.getItem("jwt"),
                }
            }
        )
        const data = await response.json();
        setActivitiesList(JSON.stringify(data));
    }

    return (
        <div>
            <select name="citySelect"
                    onChange={event => setCity(event.target.value)}
            >
                <option>Select City</option>
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
            <button onClick={() => getActivitiesByCity(city)}>get activity by city</button>
        </div>
    )
}

export default CitySelect;