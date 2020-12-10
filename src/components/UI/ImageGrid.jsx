import { useTheme } from "@material-ui/core/styles";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function ImageGrid({ children }) {
  const theme = useTheme();
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        [theme.breakpoints.values["lg"]]: 4,
        [theme.breakpoints.values["md"]]: 3,
        [theme.breakpoints.values["xs"]]: 1,
      }}
    >
      <Masonry gutter="16px">{children}</Masonry>
    </ResponsiveMasonry>
  );
}

export default ImageGrid;
