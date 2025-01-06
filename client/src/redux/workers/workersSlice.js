import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch freelancers
export const fetchFreelancers = createAsyncThunk(
    "freelancers/fetchFreelancers",
    async () => {
        const response = await axios.get(
            "http://localhost:3001/api/freelancers?page=1&limit=100"
        );

        if (response.data.success) {
            return response.data.data.freelancers;
        }
        throw new Error("Failed to fetch freelancers");
    }
);

// Async thunk to add a new freelancer
export const addFreelancerThunk = createAsyncThunk(
    "freelancers/addFreelancerThunk",
    async (newFreelancer) => {
        const response = await axios.post(
            "http://localhost:3001/api/freelancers",
            newFreelancer
        );

        if (response.data.success) {
            return response.data.data;
        }
        throw new Error("Failed to add freelancer");
    }
);

// Async thunk to delete a freelancer
export const deleteFreelancerThunk = createAsyncThunk(
    "freelancers/deleteFreelancerThunk",
    async (freelancerId) => {
        const response = await axios.delete(
            `http://localhost:3001/api/freelancers/${freelancerId}`
        );

        console.log(response.status);
        if (response.status !== 204) {
            throw new Error("Failed to delete freelancer");
        }
    }
);

// Async thunk to update a freelancer
export const updateFreelancerThunk = createAsyncThunk(
    "freelancers/updateFreelancerThunk",
    async ({ id, updatedFreelancer }) => {
        const response = await axios.put(
            `http://localhost:3001/api/freelancers/${id}`,
            updatedFreelancer
        );

        if (response.status === 204) {
            return { id, updatedFreelancer };
        }
        throw new Error("Failed to update freelancer");
    }
);

const initialState = {
    freelancers: [],
    filter: "",
    loading: false,
    error: null,
};

const freelancersSlice = createSlice({
    name: "freelancers",
    initialState,
    reducers: {
        updateFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFreelancers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFreelancers.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancers = action.payload;
            })
            .addCase(fetchFreelancers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addFreelancerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFreelancerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancers.push(action.payload);
            })
            .addCase(addFreelancerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteFreelancerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFreelancerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancers = state.freelancers.filter(
                    (freelancer) => freelancer.id !== action.payload
                );
            })
            .addCase(deleteFreelancerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateFreelancerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFreelancerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancers = state.freelancers.map((freelancer) => {
                    if (freelancer.id === action.payload.id) {
                        return {
                            ...freelancer,
                            ...action.payload.updatedFreelancer,
                        };
                    }
                    return freelancer;
                });
            })
            .addCase(updateFreelancerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export actions
export const { updateFilter } = freelancersSlice.actions;

// Export the reducer
export default freelancersSlice.reducer;
