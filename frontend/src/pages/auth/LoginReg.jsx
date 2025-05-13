import { Grid, Card, Tabs, Typography, Tab, Box, Paper } from "@mui/material";
import { useState } from "react";
import Registration from "./Registration";
import UserLogin from "./UserLogin";
import { ShoppingBag } from "@mui/icons-material";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box
          sx={{
            p: 3,
            minHeight: "300px", // ✅ Maintain equal height
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

const LoginReg = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", backgroundColor: "#f4f6f8" }}
    >
      <Grid item xs={11} sm={8} md={5} lg={4}>
        <Paper elevation={6} sx={{ p: 4 }}>
          <Box textAlign="center" sx={{ mb: 4 }}>
            <ShoppingBag sx={{ color: "primary.main", fontSize: 50, mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              GamePlanR
            </Typography>
          </Box>

          <Card sx={{ p: 3 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
              sx={{ mb: 3 }}
            >
              <Tab label="Login" sx={{ fontWeight: "bold" }} />
              <Tab label="Register" sx={{ fontWeight: "bold" }} />
            </Tabs>

            <TabPanel value={value} index={0}>
              <UserLogin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Registration />
            </TabPanel>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginReg;
