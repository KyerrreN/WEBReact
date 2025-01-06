import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosHeaders } from "axios";

export const fetchBids = createAsyncThunk("bids/fetchBids", async () => {
    const response = await axios.get("http://localhost:3001/api/bids");

    if (response.data.success) {
        return response.data.data.bids;
    }
});

export const addBidThunk = createAsyncThunk(
    "bids/addBidThunk",
    async (newBid) => {
        const response = await axios.post(
            "http://localhost:3001/api/bids",
            newBid
        );

        if (response.data.success) {
            return response.data.data;
        }
    }
);

export const deleteBidThunk = createAsyncThunk(
    "bids/deleteBidThunk",
    async (bidId) => {
        const response = await axios.delete(
            `http://localhost:3001/api/bids/${bidId}`
        );

        if (response.data.success) {
            return bidId;
        }
    }
);

export const updateBidThunk = createAsyncThunk(
    "bids/updateBidThunk",
    async ({ id, updatedBid }) => {
        const response = await axios.put(
            `http://localhost:3001/api/bids/${id}`,
            updatedBid
        );

        if (response.status === 204) {
            return { id, updatedBid };
        } else {
            throw new Error("Failed to update bid");
        }
    }
);

const initialState = {
    bids: [],
    filter: "",
    loading: false,
    error: null,
};

const bidsSlice = createSlice({
    name: "bids",
    initialState,
    reducers: {
        deleteBid: (state, action) => {
            state.bids = state.bids.filter(
                (worker) => worker.id !== action.payload
            );
        },
        updateBid: (state, action) => {
            state.bids = state.bids.map((bid) => {
                if (bid.id === action.payload.id) {
                    return { ...bid, ...action.payload };
                }

                return bid;
            });
        },
        addBid: (state, action) => {
            state.bids = [...state.bids, action.payload];
        },
        filterBids: (state, action) => {
            state.filter = action.payload;
        },
        updateSort: (state, action) => {
            state.sortByPayment = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBids.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBids.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = action.payload;
            })
            .addCase(fetchBids.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.bids.push(action.payload);
            })
            .addCase(addBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = state.bids.filter(
                    (bid) => bid.id !== action.payload
                );
            })
            .addCase(deleteBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = state.bids.map((bid) => {
                    if (bid.id === action.payload.id) {
                        return { ...bid, ...action.payload.updatedBid };
                    }
                    return bid;
                });
            })
            .addCase(updateBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { deleteBid, updateBid, addBid, filterBids, updateSort } =
    bidsSlice.actions;
export default bidsSlice.reducer;
