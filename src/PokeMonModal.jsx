import ReactModal from "react-modal";
import { useState, useEffect } from "react";
import { Text,Box, Image,Heading} from "@chakra-ui/react"; // Import Text from Chakra UI

export default function AddStudentsButton({ name, url }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    if (modalOpen) {
      fetchData();
    }
  }, [name, modalOpen]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleModalOpen}>Info</button>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={handleModalClose}
        shouldCloseOnOverlayClick={true}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px 25px 20px 25px",
            // margin:"20",
            border: "none",
            borderRadius: "25px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            minWidth: "518px",
            minHeight: "488px",
            backgroundColor: "#f3f30d.400",
            color: "#000",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
        }}
        ariaHideApp={false}
      >
                <button
          onClick={handleModalClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#000",
          }}
        >
          &#10006; {/* Unicode for the cross (X) symbol */}
        </button>
        {pokemonData ? (
          <div>
            <Box>
            <Image h="100px" objectFit='fill' w="100px" src={url} alt={`Sprite for ${name}`}/>
            <Heading size="xl" fontWeight="bold"> {name.toUpperCase()} </Heading>
            <Text>Base Experience: {pokemonData.base_experience}</Text>
            <Text>Height: {pokemonData.height}</Text>
            <Text>Weight: {pokemonData.weight}</Text>
            <Text>Types: {pokemonData.types.map((type) => type.type.name).join(', ')}</Text>
            <Text>Stats:</Text>
            {pokemonData.stats.map((stat) => (
              <Text key={stat.stat.url}>
                {stat.stat.name}: {stat.base_stat}
              </Text>
            ))}
            </Box>
          </div>
        ) : (
          'Loading...'
        )}
      </ReactModal>
    </div>
  );
}
