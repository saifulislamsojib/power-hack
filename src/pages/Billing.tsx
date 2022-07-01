import { Box, Pagination } from "@mui/material";
import { useMemo, useState } from "react";
import { useSWRConfig } from "swr";
import BillingModal from "../components/Billing/BillingModal";
import BillingTable from "../components/Billing/BillingTable";
import TopBar from "../components/Billing/TopBar";
import Modal from "../components/Modal";
import useBillings from "../hooks/useBillings";
import Layout from "../layout/Layout";
import { addBilling } from "../services/billingServices";
import { Billing as IBilling, BillingInfo } from "../types/Billing";

const Billing = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [search, setSearch] = useState("");
  const { mutate: RootMutate } = useSWRConfig();

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };
  const bigPage = useMemo(
    () => pages.reduce((pre, current) => (current > pre ? current : pre), 1),
    [pages]
  );

  const { mutate, billingList } = useBillings(page, undefined, search);

  const { billingList: bigList, mutate: bigMutate } = useBillings(bigPage);

  const onSubmit = (info: BillingInfo) => {
    handleModalClose();
    RootMutate(
      "/billing-list?select=paidAmount",
      (preAmounts: IBilling[]) => [
        ...preAmounts,
        { _id: "Generating Id...", paidAmount: info.paidAmount },
      ],
      false
    );
    mutate((preBillings = []) => {
      if (preBillings.length === 10) {
        if (bigList?.length !== 10) {
          bigMutate(
            (preBigList = []) => [
              ...preBigList,
              { ...info, _id: "Generating Id..." },
            ],
            false
          );
          setPage(bigPage);
          return preBillings;
        }
        setPage((preV) => {
          setPages((pre) => [...pre, preV + 1]);
          return preV + 1;
        });
        return preBillings;
      }
      return [...preBillings, { ...info, _id: "Generating Id..." }];
    });
    mutate((preBillings = []) =>
      addBilling(info, (resBilling) => {
        if (!resBilling) {
          RootMutate(
            "/billing-list?select=paidAmount",
            (preAmounts: IBilling[]) =>
              preAmounts.filter(({ _id }) => _id !== "Generating Id..."),
            false
          );
          return preBillings.filter(({ _id }) => _id !== "Generating Id...");
        }
        RootMutate(
          "/billing-list?select=paidAmount",
          (preAmounts: IBilling[]) => {
            const oldBillings = preAmounts.filter(
              ({ _id }) => _id !== "Generating Id..."
            );
            return [
              ...oldBillings,
              { _id: resBilling._id, paidAmount: resBilling.paidAmount },
            ];
          },
          false
        );
        if (preBillings.length === 10) {
          bigMutate((preBigList = []) => {
            const oldBillings = preBigList.filter(
              ({ _id }) => _id !== "Generating Id..." && _id !== resBilling._id
            );
            return [...oldBillings, resBilling];
          });
          return preBillings;
        }
        const oldBillings = preBillings.filter(
          ({ _id }) => _id !== "Generating Id..."
        );
        return [...oldBillings, resBilling];
      })
    );
  };

  const handleChange = (_: any, value: number) => {
    setPage(value);
    setPages((pre) => (pre.includes(value) ? pre : [...pre, value]));
  };

  return (
    <Layout>
      <TopBar setSearch={setSearch} handleModalOpen={handleModalOpen} />
      <BillingTable page={page} search={search} />
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <Pagination
          page={page}
          count={billingList?.length === 10 ? page + 1 : page}
          color="primary"
          onChange={handleChange}
        />
      </Box>
      <Modal open={open} onClose={handleModalClose} title="Billing">
        <BillingModal onSubmit={onSubmit} />
      </Modal>
    </Layout>
  );
};

export default Billing;
