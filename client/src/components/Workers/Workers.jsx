import { useState, useEffect } from "react";
import "./Workers.css";
import WorkerCard from "../WorkerCard/WorkerCard";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import React from "react";
import FilterDialog from "../FilterDialog/FilterDialog";
import { useTranslation } from "react-i18next";
import WorkersAddDialog from "../WorkersAddDialog/WorkersAddDialog";
import {
    deleteFreelancerThunk,
    fetchFreelancers,
    updateFreelancerThunk,
} from "../../redux/workers/workersSlice";

function Workers(props) {
    // Filtering workers
    // const filteredWorkers =
    //     filter === ""
    //         ? workers
    //         : workers.filter((worker) => worker.spec === filter);

    // Sorting
    // const [sortOrder, setSortOrder] = useState("asc");

    // const sortedWorkers = [...filteredWorkers].sort((a, b) => {
    //     return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
    // });

    // Dialog for filter
    // const [openFilter, setOpenFilter] = React.useState(false);

    // const handleFilterOpen = () => {
    //     setOpenFilter(true);
    // };

    // const handleFilterClose = () => {
    //     setOpenFilter(false);
    // };
    // Redux selectors + dispatch
    // const workers = useSelector((state) => state.workers.workers);
    // const filter = useSelector((state) => state.workers.filter);
    const { freelancers, loading, error } = useSelector(
        (state) => state.freelancers
    );
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchFreelancers());
    }, [dispatch]);

    const handleUpdate = async ({ id, freelancerObject }) => {
        try {
            await dispatch(
                updateFreelancerThunk({
                    id,
                    updatedFreelancer: freelancerObject,
                })
            ).unwrap();
            await dispatch(fetchFreelancers()).unwrap();
            console.log("Freelancer updated succesfully");
        } catch (e) {
            console.error("Failed to update freelancer: ", e);
        }
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteFreelancerThunk(id)).unwrap();
            dispatch(fetchFreelancers());
            console.log(
                "Freelancer deleted successfully, fetching updated freelancers."
            );
        } catch (error) {
            console.error("Failed to delete freelancer:", error);
        }
    };

    return (
        <div className="container workers-container">
            <WorkersAddDialog />

            {loading ? (
                <h1>Freelancers are loading</h1>
            ) : freelancers.length > 0 ? (
                <div className="workers">
                    {freelancers.map((freelancer) => (
                        <WorkerCard
                            key={freelancer._id}
                            name={freelancer.name}
                            surname={freelancer.surname}
                            spec={freelancer.spec}
                            header={freelancer.header}
                            rating={freelancer.rating}
                            piclink={freelancer.piclink}
                            id={freelancer._id}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <h1>No freelancers to display</h1>
            )}
            {/* {workers.length > 0 ? (
                <>
                    { <Button
                        variant="contained"
                        color="white"
                        onClick={handleFilterOpen}
                        sx={{ alignSelf: "center", marginTop: 2 }}
                    >
                        {t("filter")}
                    </Button>
                    <Button
                        variant="contained"
                        color="blue"
                        onClick={() => {
                            setSortOrder((prevOrder) =>
                                prevOrder === "asc" ? "desc" : "asc"
                            );
                        }}
                        sx={{ alignSelf: "center", marginTop: 2 }}
                    >
                        {t("freelancers-sort")}
                    </Button> }

                    <div className="workers">
                         {sortedWorkers.map((worker) => (
                            <WorkerCard
                                 key={worker.id}
                                 name={worker.name}
                                 surname={worker.surname}
                                 spec={worker.spec}
                                 header={worker.header}
                                rating={worker.rating}
                             id={worker.id}
                             />
                         ))}
                     </div>
                 </>
             ) : (
                 <h1 style={{ alignSelf: "center", textAlign: "center" }}>
                     There are no workers in state
                 </h1>
             )} */}

            {/* <FilterDialog
                selectedValue=""
                open={openFilter}
                onClose={handleFilterClose}
                header="Choose freelancer's specialty"
                sliceToHandle="workers"
            /> */}
        </div>
    );
}

export default Workers;
