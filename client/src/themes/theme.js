import { createMuiTheme } from "@material-ui/core";
import { spacing } from "@material-ui/system"

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    primary: { main: "#000000" }
  },
});
