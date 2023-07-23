import { makeStyles } from "tss-react/mui";
import { container } from "../../globalStyle";

const carouselStyle = makeStyles()(
  () => ({
  section: {
    padding: "0"
  },
  container: {
    width: "100%"
  },
  gridContainre: {
    margin: "0",
    padding: "0"
  },
  gridItem: {
    margin: "0",
    padding: "0"
  }
}));

export default carouselStyle;
