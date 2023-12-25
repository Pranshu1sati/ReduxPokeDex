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
import InfiniteComp from './InfinteComp'
const Infinitescroll = () => {
    const [tabState,setTabState] = useState(0)
    const types = [
        {
          name: "normal",
          url: "https://pokeapi.co/api/v2/type/1/"
        },
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/"
        },
        {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        },
        {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/"
        },
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        },
        {
          name: "unknown",
          url: "https://pokeapi.co/api/v2/type/10001/"
        },
        {
          name: "shadow",
          url: "https://pokeapi.co/api/v2/type/10002/"
        }
      ]
      

    const dispatch = useDispatch();
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        dispatch(fetchPokemons({ url: "https://pokeapi.co/api/v2/pokemon/", offset }));
    }, [dispatch, offset]);




    const prevList = useSelector((state) => {
        console.log(state.PokemonList.filter, "here");
        return state.PokemonList.prev;
    });
    const filter = useSelector((state) => {
        return state.PokemonList.filter.pokemon;
    })
    const handleClick = (url) => {
        dispatch(fetchFilter(url));
      };
      const loading = useSelector((state)=>{state.PokemonList.loading})
      console.log(loading)
    return (
        <>
            <Tabs mt='40px' p='20px' colorScheme='blue'>
                <TabList>
                    <Tab _selected={{ color: "blue.600", bg: "white", rounded: "md" }} onClick={()=>setTabState(0)}>Infinite Scroll</Tab>
                    <Tab _selected={{ color: "blue.600", bg: "white", rounded: "md" }} onClick={()=>setTabState(1)}>Filter</Tab>
                    {console.log(tabState)}
                </TabList>
                <TabPanels>
                    <TabPanel className="tab1">
                        <SimpleGrid spacing={10} minChildWidth={'300px'} minChildHeight={'5000px'}>
                            <InfiniteComp tab={tabState}></InfiniteComp>
                        </SimpleGrid>
                        {useSelector((state)=>state.PokemonList.loading) &&<Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                            />}
                    </TabPanel>
                    <TabPanel>
  <SimpleGrid spacing={10} minChildWidth={'300px'}>
    <Button
      position="absolute"
      top="0"
      right="0"
      mt="4"
      mr="4"
    //   colorScheme="blue"
      textColor={"white"}
    >
      <Menu backgroundColor={"blue.500"}>
        <MenuButton as="Button">
          Types
        </MenuButton>
        <MenuList>
          {types.map((type) => (
            <MenuItem key={type.url} onClick={() => handleClick(type.url)}>
              {type.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Button>

    {useSelector((state) => state.PokemonList.loading) ? (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    ) : (
      <>
        {filter.length >= 1 ? (
          filter.map((item, idx) => (
            <Card key={idx} bgGradient='linear(to-r, #0BC5EA, #4299e1, #bee3f8)'>
              <CardHeader>
                <Flex>
                  <Box w='50px' h='50px'>
                    <img
                      src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${item.pokemon.url
                        .split("/")
                        .filter(Boolean)
                        .pop()}.svg`}
                      alt={`Sprite for ${item.pokemon.name}`}
                    />
                  </Box>
                  <Box>
                    <Heading>{item.pokemon.name}</Heading>
                  </Box>
                </Flex>
              </CardHeader>
              <Heading size='lg' padding='5' fontWeight='bold'>
                <PokemonModal
                  name={item.pokemon.name}
                  url={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${item.pokemon.url
                    .split("/")
                    .filter(Boolean)
                    .pop()}.svg`}
                />
              </Heading>
            </Card>
          ))
        ) : (
          <Heading>No data</Heading>
        )}
      </>
    )}
  </SimpleGrid>
</TabPanel>

                </TabPanels>
            </Tabs>
        </>
    );
};

export default Infinitescroll;
