import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import useBillings from "../../hooks/useBillings";

const BillingTable = () => {
  const { billingList } = useBillings();

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "_id",
        headerName: "Billing ID",
        flex: 1.1,
        headerAlign: "center",
      },
      {
        field: "fullName",
        headerName: "Full Name",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1.2,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "phone",
        headerName: "Phone",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "paidAmount",
        headerName: "Paid Amount",
        flex: 0.7,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        headerAlign: "center",
        align: "right",
        minWidth: 180,
        renderCell: (params) => (
          <>
            <Button variant="contained">Edit</Button>
            <Button color="error" variant="contained" sx={{ ml: 2 }}>
              Delete
            </Button>
          </>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ width: "100%", marginTop: 20, marginBottom: 10 }}>
      <DataGrid
        rows={billingList!}
        columns={columns}
        autoHeight
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableSelectionOnClick
        rowsPerPageOptions={[]}
        hideFooter
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default BillingTable;
