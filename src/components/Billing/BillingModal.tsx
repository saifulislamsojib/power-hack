import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Billing, BillingInfo } from "../../types/Billing";

const inputs = [
  {
    title: "Full Name",
    name: "fullName",
    type: "text",
    autoComplete: "name",
    rules: { required: true },
    error: "Full name is Required",
  },
  {
    title: "Email",
    name: "email",
    type: "email",
    autoComplete: "email",
    rules: { required: true, pattern: /\S+@\S+\.\S+/ },
    error: "Valid email is Required",
  },
  {
    title: "Phone",
    name: "phone",
    type: "number",
    autoComplete: "phone",
    rules: { required: true, minLength: 11, maxLength: 11 },
    error: "Phone number should be 11 digits",
  },
  {
    title: "Paid Amount",
    name: "paidAmount",
    type: "number",
    autoComplete: "paidAmount",
    rules: { required: true },
    error: "Paid amount is Required",
  },
] as const;

interface IProps {
  onSubmit: (info: BillingInfo) => void;
  updateData?: Billing;
}

const BillingModal = ({ onSubmit, updateData }: IProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BillingInfo>();

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      {inputs.map(({ name, title, type, autoComplete, rules, error }) => (
        <Grid sx={{ mb: 2 }} key={name} item xs={12}>
          <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={updateData?.[name]}
            render={({ field }) => (
              <TextField
                fullWidth
                label={title}
                autoFocus={name === inputs[0].name}
                {...field}
                type={type || "text"}
                error={!!errors[name]}
                autoComplete={autoComplete}
              />
            )}
          />
          {errors[name] && (
            <Typography sx={{ color: "red", mt: 1 }}>{error}</Typography>
          )}
        </Grid>
      ))}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
        {updateData ? "Update The Billing" : "Add The Billing"}
      </Button>
    </Box>
  );
};

export default BillingModal;
