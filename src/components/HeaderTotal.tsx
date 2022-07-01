import { Typography } from "@mui/material";
import { useMemo } from "react";
import useBillings from "../hooks/useBillings";

const HeaderTotal = () => {
  const { billingList } = useBillings(undefined, "paidAmount");

  const total = useMemo(
    () =>
      billingList?.reduce((pre, { paidAmount }) => {
        const amount = +paidAmount;
        return pre + (isNaN(amount) ? 0 : amount);
      }, 0),
    [billingList]
  );

  return (
    <Typography variant="h6" component="h6">
      Total Paid: {total || 0}
    </Typography>
  );
};

export default HeaderTotal;
