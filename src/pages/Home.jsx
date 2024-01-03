import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  InputBase,
  Typography,
  Button,
  Select,
  styled,
  MenuItem,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Home = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const [firstToken, setFirstToken] = useState("ETH");
  const [secondToken, setSecondToken] = useState("ETH");
  const [firstTokenAmount, setFirstTokenAmount] = useState(0);
  const [secondTokenAmount, setSecondTokenAmount] = useState(0);
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#fff",
      },
    },
  }));
  const handleChangeToken = (event, flag) => {
    if (flag === "first") {
      setFirstToken(event.target.value);
    } else {
      setSecondToken(event.target.value);
    }
  };

  const handleSwapToken = () => {
    let firstTokenPrice = currencyList.find(
      (item) => item.currency === firstToken
    )?.price;

    let secondTokenPrice = currencyList.find(
      (item) => item.currency === secondToken
    )?.price;

    let swapTokenValue =
      (firstTokenAmount * firstTokenPrice) / secondTokenPrice;
    setSecondTokenAmount(swapTokenValue);
  };
  function getData() {
    axios.get("https://interview.switcheo.com/prices.json").then((data) => {
      setCurrencyList(data.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Box bgcolor="#0a1929" height="100vh" paddingY="4rem">
        <Container maxwidth="lg">
          <Box
            display="flex"
            fontWeight="600"
            justifyContent="center"
            padding="1rem"
            color="#fff"
            margin="auto"
          >
            Fancy Form
          </Box>
          <Grid container spacing={2}>
            <Grid item md={5} margin="auto">
              <Box bgcolor="#17293d" padding="2rem" borderRadius="12px">
                {/* First Chosen Token  */}
                <Box>
                  <Box marginBottom="10px">
                    <Typography color="#fff">From</Typography>
                  </Box>
                  <Box flexDirection="row" display="flex" alignItems="center">
                    <Box paddingX="1rem">
                      <Select
                        sx={{ width: "10rem" }}
                        label="Token"
                        onChange={(event) => handleChangeToken(event, "first")}
                        defaultValue={"ETH"}
                        value={firstToken}
                        input={<BootstrapInput />}
                      >
                        {currencyList
                          ? currencyList.map((data, index) => (
                              <MenuItem
                                key={index}
                                value={data.currency}
                                backgroundColor="#000"
                              >
                                <Box display="flex" alignItems="center">
                                  <img
                                    src={
                                      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/" +
                                        `${data.currency}` +
                                        ".svg" ||
                                      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/" +
                                        `${data.currency}` +
                                        ".png"
                                    }
                                    alt=""
                                    width="35px"
                                    height="35px"
                                  />
                                  <Typography paddingX="10px">
                                    {data.currency}
                                  </Typography>
                                </Box>
                              </MenuItem>
                            ))
                          : ""}
                      </Select>
                    </Box>
                    <Box color="#fff" width="100%">
                      <InputBase
                        onChange={(event) => {
                          setFirstTokenAmount(event.target.value);
                        }}
                        value={firstTokenAmount}
                        sx={{ color: "#fff" }}
                        placeholder="0"
                        padding="10px"
                      />
                    </Box>
                  </Box>
                </Box>
                {/* Swap icon */}
                <Box marginY="2rem">
                  <Box textAlign="center">
                    <SwapVertIcon sx={{ color: "#fff" }} />
                  </Box>
                </Box>
                {/* Second Chosen Token  */}
                <Box>
                  <Box marginBottom="10px">
                    <Typography color="#fff">To</Typography>
                  </Box>
                  <Box flexDirection="row" display="flex" alignItems="center">
                    <Box paddingX="1rem">
                      <Select
                        sx={{ width: "10rem" }}
                        label="Token"
                        defaultValue={"ETH"}
                        value={secondToken}
                        onChange={(event) => handleChangeToken(event, "second")}
                        input={<BootstrapInput />}
                      >
                        {currencyList
                          ? currencyList.map((data, index) => (
                              <MenuItem key={index} value={data.currency}>
                                <Box display="flex" alignItems="center">
                                  <img
                                    src={
                                      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/" +
                                      `${data.currency}` +
                                      ".svg"
                                    }
                                    alt=""
                                    width="35px"
                                    height="35px"
                                  />
                                  <Typography paddingX="10px">
                                    {data.currency}
                                  </Typography>
                                </Box>
                              </MenuItem>
                            ))
                          : ""}
                      </Select>
                    </Box>
                    <Box color="#fff" width="100%">
                      <InputBase
                        onChange={(event) => {
                          setSecondTokenAmount(event.target.value);
                        }}
                        value={secondTokenAmount}
                        sx={{ color: "#fff" }}
                        placeholder="0"
                        padding="10px"
                      />
                    </Box>
                  </Box>
                </Box>

                <Box marginTop="2rem" textAlign="center" width="100%">
                  <Button
                    onClick={handleSwapToken}
                    sx={{ width: "100%" }}
                    variant="contained"
                  >
                    swap
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
