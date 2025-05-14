import PropTypes from "prop-types";
import { Box, Stack } from "@mui/material";
const CompanyLogo = ({ open }) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: "18px",
        height: "5rem",
      }}
    >
      {open ? (
        <Box
          component="img"
          src={"/images/logo/logo.svg"}
          alt="Icon"
          sx={{ maxHeight: "100%" }}
        />
      ) : (
        <Box component="img"  src={"/images/logo/small_logo.svg"} alt="Icon" sx={{ maxHeight: "100%" }} />
      )}
    </Stack>
  );
};

CompanyLogo.propTypes = {
  open: PropTypes.bool,
};

export default CompanyLogo;
