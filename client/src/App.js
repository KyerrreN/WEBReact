import React from "react";
import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
    const [freelancers, setFreelancers] = useState([]);
    const [newFreelancer, setNewFreelancer] = useState({
        id: 0,
        name: "",
        surname: "",
        spec: "",
        rating: 0,
    });

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
    function handleInputChange(e) {
        const { name, value } = e.target;

        setNewFreelancer((prev) => ({ ...prev, [name]: value }));
    }

    function addNewFreelancer(e) {
        e.preventDefault();

        fetch("http://localhost:3001/api/freelancers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFreelancer),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error submitting data to a server");
                }

                return response.json();
            })
            .then((newFreel) => {
                setFreelancers((prev) => [...prev, newFreel]);
                setNewFreelancer({
                    name: "",
                    surname: "",
                    spec: "",
                    rating: 0,
                });
            })
            .catch((error) => {
                console.error("Error POST request: " + error);
            });
    }
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
                            <div key={freel.id} className="fetched-freel">
                                <span>Freelancer {freel.id}</span>
                                <span>
                                    Name: {freel.name} {freel.surname}
                                </span>
                                <span>Specialty: {freel.spec}</span>
                                <span style={{ paddingBottom: 20 }}>
                                    Rating: {freel.rating}
                                </span>
                            </div>
                        );
                    })
                )}

                <h1>Add new freelancer</h1>
                <form onSubmit={addNewFreelancer}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={newFreelancer.name}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="surname">Surname</label>
                    <input
                        id="surname"
                        type="text"
                        name="surname"
                        value={newFreelancer.surname}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="spec">Specialty</label>
                    <input
                        id="spec"
                        type="text"
                        name="spec"
                        value={newFreelancer.spec}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="rating">Rating</label>
                    <input
                        id="rating"
                        type="number"
                        name="rating"
                        value={newFreelancer.rating}
                        onChange={handleInputChange}
                        required
                        min={0}
                        max={5}
                    />

                    <button type="submit">Add freelancer</button>
                </form>
            </div>
        </div>
    );
}
