import {configureStore} from '@reduxjs/toolkit'
import  PokemonList  from './features/infiniteScrollSlice'
import FilterList from './features/FilterSlice'


export const store = configureStore({
    reducer :{
        PokemonList:PokemonList
    },
})