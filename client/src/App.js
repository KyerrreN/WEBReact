import React from "react";
import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
    const [freelancers, setFreelancers] = useState([]);
    const [hired, setHired] = useState([]);

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
                console.log(
                    "There was a problem fetching FREELANCERS: " + error
                )
            );

        fetch("http://localhost:3001/api/hired")
            .then((response) => response.json())
            .then((data) => setHired(data))
            .catch((error) =>
                console.log("There was a problem fetching HIRED: ", error)
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

    function hireFreelancer(id) {
        fetch(`http://localhost:3001/api/freelancers/${id}`, {
            method: "POST",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error while hiring a freelancer");
                }

                return response.json();
            })
            .then((data) => {
                const newHired = { id: data.id };
                setHired([...hired, newHired]);
            })
            .catch((e) => console.error("Error message: ", e));
    }

    function fireFreelancer(id) {
        const idToFire = parseInt(id);

        fetch(`http://localhost:3001/api/hired/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error while firing a freelancer");
                }
            })
            .then((data) => {
                const newArray = hired.filter((hire) => hire.id !== idToFire);
                setHired(newArray);
            })
            .catch((e) => {
                console.error("Error while processing a DELETE request: ", e);
            });
    }

    function downloadInFormat(format) {
        fetch("http://localhost:3001/api/format", {
            method: "GET",
            headers: {
                Accept: format,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error while processing a request");
                }

                return response.blob();
            })
            .then((data) => {
                const url = window.URL.createObjectURL(data);
                const a = document.createElement("a");
                a.href = url;
                a.download = `hired_freelancers.${format.split("/")[1]}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="wrapper">
            <div className="container">
                <h1>Freelancers</h1>
                {typeof freelancers === "undefined" ? (
                    <p>Loading</p>
                ) : freelancers.length === 0 ? (
                    <p>There are no freelancers in the DB</p>
                ) : (
                    freelancers.map((freel) => {
                        return (
                            <div key={freel.id} className="fetched-freel">
                                <button
                                    onClick={() => hireFreelancer(freel.id)}
                                >
                                    Hire!
                                </button>
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
                <h1>Hired freelancers</h1>
                {typeof hired === "undefined" ? (
                    <p>Loading hired freelancers...</p>
                ) : hired.length === 0 ? (
                    <p>You haven't hired anyone yet.</p>
                ) : (
                    <>
                        {hired.map((hire) => {
                            return (
                                <div key={hire.id} className="fetched-freel">
                                    <button
                                        onClick={() => fireFreelancer(hire.id)}
                                    >
                                        Fire!
                                    </button>
                                    <span style={{ paddingBottom: 20 }}>
                                        Freelancer with id: {hire.id}
                                    </span>
                                </div>
                            );
                        })}
                        <div className="download-buttons">
                            <button
                                onClick={() =>
                                    downloadInFormat("application/json")
                                }
                            >
                                Download in JSON
                            </button>
                            <button
                                onClick={() =>
                                    downloadInFormat("application/xml")
                                }
                            >
                                Download in XML
                            </button>
                            <button
                                onClick={() => downloadInFormat("text/html")}
                            >
                                Download in HTML
                            </button>
                        </div>
                    </>
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
