import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilter, fetchPokemons } from "./store/features/infiniteScrollSlice";
import {
    Button,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    SimpleGrid,
    Box,
    Card,
    CardHeader,
    Flex,
    Heading,
    Spinner,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import PokemonModal from './PokeMonModal'
const InfinteComp = ({tab}) => {
    const dispatch = useDispatch();
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (tab === 0) {
          dispatch(fetchPokemons({ url: "https://pokeapi.co/api/v2/pokemon/", offset }));
        }
      }, [dispatch, offset, tab]);

    const handleScroll = () => {
        // Check if the user has scrolled to the bottom
        let height = document.documentElement.scrollHeight;
        let scroll = document.documentElement.scrollTop;
        let viewHeight = window.innerHeight;
        if (viewHeight + scroll + 20 >= height && (tab===0)) setOffset((prevOffset) => prevOffset + 20); // Increase the offset to load more data
    };

    useEffect(() => {
        console.log('called');
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const prevList = useSelector((state) => {
        console.log(state.PokemonList.filter, "here");
        return state.PokemonList.prev;
    });
  return (
    <> {prevList && prevList.map((prev) => (
        <>
        <Card key={prev.url} bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'>
            <CardHeader>
                <Flex>
                    <Box w='50px' h='50px'>
                        <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${prev.url.split('/').filter(Boolean).pop()}.svg`} alt={`Sprite for ${prev.name}`} />
                    </Box>
                    <Box>
                        <Heading>{prev.name}</Heading>
                    </Box>
                </Flex>
            </CardHeader>
            <Heading size="lg" padding={'5'} fontWeight="bold"><PokemonModal name={prev.name} url={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${prev.url.split('/').filter(Boolean).pop()}.svg`}/></Heading>
        </Card>
        
        </>
    ))}</>
  )
}
export default InfinteComp