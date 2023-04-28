import { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { CartContext } from "../../context/cart";
import { CartList, EmptyCart, OrderSummary } from "../../components/cart";

export const Cart = ({}) => {
  const { isLoaded, cart } = useContext(CartContext);

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      <EmptyCart/>
    }
  }, [isLoaded, cart]);

  if (!isLoaded || cart.length === 0) {
    return <>Cart</>;
  }

  return (
    <div>
      <Typography variant="h1" component="h1">
        Cart
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  href="/checkout/address"
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
