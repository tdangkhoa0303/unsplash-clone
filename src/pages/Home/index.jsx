import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Box, Container } from "@material-ui/core";

import Hero from "./Hero";
import { getPhotos } from "../../utils/api";

import { ImageGrid } from "../../components/UI";
import { Card, Nav } from "../../components";
import { arrayToMap } from "../../utils/data.util";
import Context from "../../Context";

function Home() {
  const { photos, setPhotos } = useContext(Context);
  const [page, setPage] = useState(1);

  const location = useLocation();

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data } = await getPhotos(page);
      if (data.status === "success")
        setPhotos((photos) => ({
          ...photos,
          data: arrayToMap(data.data.photos),
        }));
    };

    if (location.pathname === window.location.pathname) {
      fetchPhotos();
    }
  }, []);

  return (
    <Box>
      <Nav />
      <Hero />
      <Box py={4}>
        <Container>
          {Object.values(photos.data).length > 0 && (
            <ImageGrid>
              {Object.values(photos.data).map((photo) => (
                <Card photo={photo} key={photo.id} />
              ))}
            </ImageGrid>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
