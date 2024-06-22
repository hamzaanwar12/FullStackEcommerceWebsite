import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaidIcon from "@mui/icons-material/Paid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./CheckOut.css";

const Steps = [
  {
    label: "Shipping Details",
    icon: (size) => <LocalShippingIcon sx={{ fontSize: size }} />,
  },
  {
    label: "Confirm Order",
    icon: (size) => <LibraryAddIcon sx={{ fontSize: size }} />,
  },
  {
    label: "Payment",
    icon: (size) => <PaidIcon sx={{ fontSize: size }} />,
  },
];

const CheckOut = ({ activeStep }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLarge = useMediaQuery(theme.breakpoints.up("md"));

  let iconSize;

  if (isSmall) {
    iconSize = "13px";
  } else if (isMedium) {
    iconSize = "17px";
  } else if (isLarge) {
    iconSize = "24px";
  }

  return (
    <div className="mt-[7%]   w-[98%] mx-auto sm2:w-[90%]">
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{
          "& .MuiStepConnector-line": {
            borderColor: "#565050", // Set the color of the connector line
          },
        }}
      >
        {Steps.map((item, index) => (
          <Step
            key={index}
            active={index === activeStep ? true : false}
            style={
              index === activeStep ? { color: "tomato" } : { color: "black" }
            }
            completed={index < activeStep}
          >
            <StepLabel icon={item.icon(iconSize)}>
              <span className="text-myFont sm2:text-xs md:text-lg">
                {item.label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckOut;
