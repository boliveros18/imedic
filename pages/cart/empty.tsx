
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Grid, Box, Typography } from "@mui/material";
import { Layout } from "../../components/layouts";
import { SideBar } from "../../components/ui";

const EmptyPage = () => {
  return (
    <Layout>
      <Grid container spacing={0} rowSpacing={2}>
        <Grid
          item
          xs={8}
          sm={4}
          md={3}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          justifyContent="flex-start"
        >
          <SideBar keepOpen={true} />
        </Grid>
        <Grid item xs={12} sm={6} md={5} justifyContent="center">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="calc(100vh - 200px)"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <RemoveShoppingCartOutlined sx={{ fontSize: 25 }} />
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography>Your cart is empty</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default EmptyPage;
