import React from "react";
import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
    const [freelancers, setFreelancers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/freelancers")
            .then((response) => response.json())
            .then((data) => {
                setFreelancers(data);
            })
            .catch((error) =>
                console.log("There was a problem fetching: " + error)
            );
    }, []);

    return (
        <div className="wrapper">
            <div className="container">
                {typeof freelancers === "undefined" ? (
                    <p>Loading</p>
                ) : freelancers.length === 0 ? (
                    <p>There are no freelancers in the DB</p>
                ) : (
                    freelancers.map((freel, i) => {
                        return (
                            <>
                                <span>Freelancer {freel.id}</span>
                                <span>
                                    Name: {freel.name} {freel.surname}
                                </span>
                                <span>Specialty: {freel.spec}</span>
                                <span style={{ paddingBottom: 20 }}>
                                    Rating: {freel.rating}
                                </span>
                            </>
                        );
                    })
                )}
            </div>
        </div>
    );
}
