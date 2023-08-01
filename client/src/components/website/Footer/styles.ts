import { styled } from "@mui/material";
import COLORS from "../../../constants/colors";
import { tablet, desktop } from "../../../constants/breakpoints";
import { container } from "src/styles/jss/globalStyle";

export const StyledFooter = styled("div")(() => ({
  marginTop: 51,
  ...desktop({
    marginTop: 0,
  }),
}));

export const StyledFooterContainer = styled("div")(() => ({
  background: COLORS.GRAY_LIGTH,
}));

export const MainFooterContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3.5, 0),
  ...container,
  ...tablet({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }),
}));

export const Divider = styled("div")(() => ({
  height: 1,
  background: COLORS.GRAY_FOR_TEXT,
}));

export const StyledLinks = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  margin: theme.spacing(3, 0),
  ...tablet({
    flexDirection: "row",
    alignItems: "center",
    margin: theme.spacing(0, 0),
  }),
}));

export const Socials = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(4),
  position: "relative",
  ...tablet({
    alignItems: "center",
  }),
}));

export const Certifications = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(4),
  position: "relative",
  ...tablet({
    alignItems: "center",
  }),
}));

export const ImageLink = styled("a")(({ theme }) => ({
  position: "relative",
  display: "block"
}));

export const StyledCopyRightContainer = styled("div")((p) => ({
  background: p.theme.palette.primary.main,
}));

export const InfoText = styled("p")(({ theme }) => ({
  textAlign: "center",
  margin: 0,
  padding: theme.spacing(2, 0),
  fontSize: 14,
  color: COLORS.WHITE,
}));
