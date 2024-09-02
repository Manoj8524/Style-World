import { Box } from '@mui/material';
const { styled } = require("@mui/system");

const FlexBetween = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 16px", // Optional padding for spacing

  [theme.breakpoints.down('md')]: {
    padding: "0 8px", // Adjust padding for medium screens
  },

  [theme.breakpoints.down('sm')]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0 4px", // Adjust padding for small screens
  },
}));

export default FlexBetween;
