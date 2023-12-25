import { combineReducers } from 'redux';
import { PokemonList, fetchPokemons, updateTypeUrl } from './infiniteScrollSlice'; // Make sure to export fetchPokemons and updateTypeUrl from PokemonListSlice
import { FilterList, fetchFilter } from './FilterSlice'; // Make sure to export fetchFilter from FilterListSlice

const rootReducer = combineReducers({
  pokemon: PokemonList,
  filter: FilterList,
});

export const combinedFetchPokemons = createAsyncThunk(
  'combined/fetchPokemons',
  async (params, thunkAPI) => {
    // You can dispatch the fetchFilter action here if needed
    const filterAction = fetchFilter();
    await thunkAPI.dispatch(filterAction);

    // You can also dispatch updateTypeUrl action here if needed
    const updateTypeUrlAction = updateTypeUrl({/* typeUrl params */});
    await thunkAPI.dispatch(updateTypeUrlAction);

    // Now you can dispatch fetchPokemons action
    const fetchPokemonsAction = fetchPokemons(params);
    return await thunkAPI.dispatch(fetchPokemonsAction);
  }
);

export default rootReducer;