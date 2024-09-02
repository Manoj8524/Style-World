import React from "react";
import { Box, Typography } from "@mui/material";
import '../components/css/StatBox.css';

// If you used the npm method, import the fonts here
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';

const StatBox = ({ title, increase, backgroundColor, icon, description }) => {
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      sx={{
        width: "25vw",
        minWidth: "210px",
        borderRadius: "0.55rem",
        backgroundColor
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" sx={{ color: "black", fontSize: ".95rem", fontFamily: 'Lato', alignSelf: 'flex-start' }}>
          {title}
        </Typography>
        {icon}
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="flex-end" flexGrow={1}>
        <Typography variant="h3" fontWeight="600" sx={{ color: "black", fontSize: "1.2rem", fontFamily: 'Lato', alignSelf: 'flex-end' }}>
          {increase}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: "black", fontSize: "1rem", fontFamily: 'Lato', alignSelf: 'flex-end' }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
