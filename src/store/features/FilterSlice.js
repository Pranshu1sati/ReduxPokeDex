import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFilter = createAsyncThunk('filter', async(url,{rejectWithValue})=>{
  console.log(url);
  const furl = url || "https://pokeapi.co/api/v2/type/1/";
  try {
    const res = await fetch(furl);
    if (!res.ok) {
      console.log(res.error);
      throw new Error(res.error);
    }
    const result = await res.json(); // Fix: change 'response' to 'res'
    console.log(result);
    return result.pokemon;
  } catch (error) {
    throw rejectWithValue(error.message); // Fix: 'return' is not needed here
  }
})

export const FilterList = createSlice({
    name: 'filter',
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchFilter.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchFilter.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchFilter.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});

export default FilterList.reducer