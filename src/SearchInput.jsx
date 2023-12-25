import React, { useState } from 'react';
import { Input, Button, Box, Flex, SimpleGrid, Card, CardHeader, Heading, Spinner } from '@chakra-ui/react';  // Adjust imports based on your Chakra UI setup
import PokemonModal from './PokeMonModal';  // Assuming you have a PokemonModal component

const SearchComponent = () => {
    const fetchPokemonByNameOrId = async (input) => {
        if(input.length<1) return [{id:"No data", name :"Enter Something"}]
        try {
            setLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
            if (response.ok) {
                const data = await response.json();
                setLoading(false);
                return [{ id: data.id, name: data.name }];
            } else {
                setLoading(false);
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
            throw error;
        }
    };

    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        fetchPokemonByNameOrId(searchInput)
            .then((data) => {
                setSearchResults(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <>
            <Box p={4} bg="blue.500" color="darkblue" borderRadius={"25px"}>
                <Flex align="center">
                    <Input
                        
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        bg="white"

                        color="black"
                        placeholder="Single Item Search Enter Pokemon's Name or id (1-...)"
                    />
                    <Button ml={4} colorScheme="teal" onClick={handleSearch}>
                        Search
                    </Button>
                </Flex>
            </Box>
            {loading && (<Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />)}
            {!loading && (
                <SimpleGrid spacing={5} mt={4} columns={3}>
                    {searchResults.map((result) => (
                        <Card key={result.id} bgGradient='linear(to-r, #0BC5EA, #4299e1, #bee3f8)'>
                            <CardHeader>
                                <Flex>
                                    <Box w='50px' h='50px'>
                                        <img
                                            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${result.id}.svg`}
                                            alt={`Sprite for ${result.name}`}
                                        />
                                    </Box>
                                    <Box>
                                        <Heading>{result.name}</Heading>
                                    </Box>
                                </Flex>
                            </CardHeader>
                            <Heading size='lg' padding='5' fontWeight='bold'>
                             { result.name!=="Enter Something" && <PokemonModal name={result.name} url={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${result.id}.svg`} />}
                            </Heading>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </>
    );
};

export default SearchComponent;
