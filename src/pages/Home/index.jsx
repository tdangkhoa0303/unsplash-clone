import { useEffect, useState } from "react";
import { Box, Container } from "@material-ui/core";

import Hero from "./Hero";
import { getPhotos } from "../../utils/api";

import { ImageGrid } from "../../components/UI";
import { Card, Nav } from "../../components";
import { arrayToMap } from "../../utils/data.util";

function Home() {
  const [photos, setPhotos] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data } = await getPhotos(page);
      if (data.status === "success")
        setPhotos((photos) => ({
          ...photos,
          ...arrayToMap(data.data.photos),
        }));
      console.log(data.data.photos);
    };

    fetchPhotos();
  }, [page]);

  return (
    <Box>
      <Nav />
      <Hero />
      <Box py={4}>
        <Container>
          <ImageGrid>
            {Object.values(photos).map((photo) => (
              <Card photo={photo} key={photo.id} />
            ))}
          </ImageGrid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
