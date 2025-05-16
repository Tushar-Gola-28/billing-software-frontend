import { Box, CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        position:"absolute",
        top:0,
        left:0,
        // background:"#00000010",
        // zIndex:100
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export { LoadingScreen };
