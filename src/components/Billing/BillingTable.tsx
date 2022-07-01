import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useCallback, useMemo, useState } from "react";
import { useSWRConfig } from "swr";
import useBillings from "../../hooks/useBillings";
import { deleteBilling, updateBilling } from "../../services/billingServices";
import { Billing, BillingInfo } from "../../types/Billing";
import Modal from "../Modal";
import BillingModal from "./BillingModal";

interface IProps {
  page: number;
  search: string;
}

const BillingTable: FC<IProps> = ({ page, search }) => {
  const { billingList, mutate } = useBillings(page, undefined, search);

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState({} as Billing);
  const [previousBilling, setPreviousBilling] = useState<Billing[]>([]);
  const [previousAmounts, setPreviousAmounts] = useState<Billing[]>([]);

  const { mutate: RootMutate } = useSWRConfig();

  const handleModalOpen = (data: Billing) => {
    setUpdateData(data);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleDelete = useCallback(
    (id: string) => {
      mutate((preBillings = []) => {
        setPreviousBilling(preBillings);
        return preBillings.filter((it) => it._id !== id);
      });
      mutate((preBillings = []) => {
        RootMutate(
          "/billing-list?select=paidAmount",
          (preAmounts: Billing[]) => {
            setPreviousAmounts(preAmounts);
            return preAmounts.filter((it) => it._id !== id);
          },
          false
        );
        return deleteBilling(id, preBillings, previousBilling, (error) => {
          if (error) {
            RootMutate(
              "/billing-list?select=paidAmount",
              () => previousAmounts,
              false
            );
          }
        });
      });
    },
    [mutate, previousBilling, RootMutate, previousAmounts]
  );

  const onSubmit = (info: BillingInfo) => {
    RootMutate(
      "/billing-list?select=paidAmount",
      (preAmounts: Billing[]) => {
        const index = preAmounts.findIndex((it) => it._id === updateData._id);
        const newBillings = [...preAmounts];
        newBillings[index] = {
          ...newBillings[index],
          paidAmount: info.paidAmount,
        };
        return newBillings;
      },
      false
    );
    mutate((preBillings = []) => {
      const index = preBillings.findIndex((it) => it._id === updateData._id);
      if (index !== -1) {
        const newBillings = [...preBillings];
        newBillings[index] = { ...newBillings[index], ...info };
        return newBillings;
      }
      return preBillings;
    });
    handleModalClose();
    mutate((preBillings = []) =>
      updateBilling(info, preBillings, updateData, (error) => {
        if (error) {
          RootMutate(
            "/billing-list?select=paidAmount",
            (preAmounts: Billing[]) => {
              const index = preAmounts.findIndex(
                (it) => it._id === updateData._id
              );
              const newBillings = [...preAmounts];
              newBillings[index] = {
                ...newBillings[index],
                paidAmount: updateData.paidAmount,
              };
              return newBillings;
            },
            false
          );
        }
        setUpdateData({} as Billing);
      })
    );
  };

  const columns: GridColDef<Billing>[] = useMemo(
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
            <Button
              onClick={() => handleModalOpen(params.row)}
              variant="contained"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(params.row._id)}
              color="error"
              variant="contained"
              sx={{ ml: 2 }}
            >
              Delete
            </Button>
          </>
        ),
      },
    ],
    [handleDelete]
  );

  return (
    <>
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
      <Modal open={open} onClose={handleModalClose} title="Update Billing">
        <BillingModal onSubmit={onSubmit} updateData={updateData} />
      </Modal>
    </>
  );
};

export default BillingTable;
