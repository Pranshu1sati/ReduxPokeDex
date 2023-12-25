import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPokemons = createAsyncThunk('fetchPokemons', async ({ url, offset, limit=20 } , { rejectWithValue }) => {
    // console.log(url)
    const furl = `${url}?offset=${offset}&limit=${limit}`;
  try {
    const response = await fetch(furl);
    console.log(response)
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemons: ${response.status}`);
    }

    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchFilter = createAsyncThunk('fetchFilter', async(url,{rejectWithValue})=>{
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
    return result;
  } catch (error) {
    throw rejectWithValue(error.message); // Fix: 'return' is not needed here
  }
})

export const PokemonList = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [], 
    prev : [],
    loading: false,
    filter : [],
    error: null,
    typeUrl: "https://pokeapi.co/api/v2/type/1/", // Set a default type URL
  },
  reducers: {
    updateTypeUrl: (state, action) => {
      state.filter=true;
      state.typeUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        
        
        state.pokemons =  action.payload;
        console.log(state.pokemons)
        state.prev = [...state.prev, ...new Set([...state.pokemons.results])]
        
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        
        state.loading = false;
        state.prev = [...state.prev, ...new Set([...state.pokemons.results])]
        state.error = action.payload.results;
      })
      .addCase(fetchFilter.pending, (state)=>{
        state.loading =true;
      })
      .addCase(fetchFilter.fulfilled, (state,action)=>{
        state.loading=false;
        state.filter = action.payload;
      })
      .addCase(fetchFilter.rejected,(state,action)=>{
        state.loading=false;
        state.error = action.payload
      });
  },
});



export default PokemonList.reducer;
