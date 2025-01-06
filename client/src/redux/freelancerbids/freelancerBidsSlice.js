import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch freelancer bids
export const fetchFreelancerBids = createAsyncThunk(
    "freelancerBids/fetchFreelancerBids",
    async () => {
        const response = await axios.get(
            "http://localhost:3001/api/freelancers/bids/?page=1&limit=30"
        );

        if (response.data.success) {
            return response.data.data.bids;
        }
        throw new Error("Failed to fetch freelancer bids");
    }
);

// Async thunk to add a new freelancer bid
export const addFreelancerBidThunk = createAsyncThunk(
    "freelancerBids/addFreelancerBidThunk",
    async (newFreelancerBid) => {
        const response = await axios.post(
            "http://localhost:3001/api/freelancers/bids",
            newFreelancerBid
        );

        if (response.data.success) {
            return response.data.data;
        }
        throw new Error("Failed to add freelancer bid");
    }
);

// Async thunk to delete a freelancer bid
export const deleteFreelancerBidThunk = createAsyncThunk(
    "freelancerBids/deleteFreelancerBidThunk",
    async ({ freelancerId, bidId }) => {
        console.log("freel: ", freelancerId, ". bid: ", bidId);
        const response = await axios.delete(
            `http://localhost:3001/api/freelancers/bids/${freelancerId}/${bidId}`
        );

        if (response.status !== 204) {
            throw new Error("Failed to delete freelancer bid");
        }
        // return freelancerBidId; // Return the ID for further processing
    }
);

// Async thunk to update a freelancer bid
export const updateFreelancerBidThunk = createAsyncThunk(
    "freelancerBids/updateFreelancerBidThunk",
    async ({ freelancerId, bidId, bidObject }) => {
        console.log(
            "FREELID: ",
            freelancerId,
            ". BIDID: ",
            bidId,
            ".BIDOBJECT:",
            bidObject
        );
        const response = await axios.put(
            `http://localhost:3001/api/freelancers/bids/${freelancerId}/${bidId}`,
            bidObject
        );

        if (response.status !== 204) {
            throw new Error("Failed to update freelancer bid");
        }

        return freelancerId;
    }
);

const initialState = {
    freelancerBids: [],
    filter: "",
    loading: false,
    error: null,
};

const freelancerBidsSlice = createSlice({
    name: "freelancerBids",
    initialState,
    reducers: {
        updateFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFreelancerBids.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFreelancerBids.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancerBids = action.payload;
            })
            .addCase(fetchFreelancerBids.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addFreelancerBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFreelancerBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancerBids.push(action.payload);
            })
            .addCase(addFreelancerBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteFreelancerBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFreelancerBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancerBids = state.freelancerBids.filter(
                    (bid) => bid.id !== action.payload
                );
            })
            .addCase(deleteFreelancerBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateFreelancerBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFreelancerBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancerBids = state.freelancerBids.map((bid) => {
                    if (bid.id === action.payload.id) {
                        return {
                            ...bid,
                            ...action.payload.updatedFreelancerBid,
                        };
                    }
                    return bid;
                });
            })
            .addCase(updateFreelancerBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export actions
export const { updateFilter } = freelancerBidsSlice.actions;

// Export the reducer
export default freelancerBidsSlice.reducer;
