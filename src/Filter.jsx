import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFilter } from "./store/features/infiniteScrollSlice"

const Filter = () => {
    const dispatch = useDispatch
    // useEffect(() => {
    //     dispatch(
    //         fetchFilter()
            
    //     );
    //     }, []);
    // dispatch(fetchFilter())
    const filter = useSelector(state=>state.PokemonList.filter)
  return (
    <div>Filter
        <ul>
        {filter.pokemon.map((item,idx)=>(<li key={idx}>{item.pokemon.name}</li>))}
        </ul>
    </div>
  )
}
export default Filter