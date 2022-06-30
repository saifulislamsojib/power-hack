import { useState } from "react";
import BillingModal from "../components/Billing/BillingModal";
import BillingTable from "../components/Billing/BillingTable";
import TopBar from "../components/Billing/TopBar";
import Modal from "../components/Modal";
import useBillings from "../hooks/useBillings";
import Layout from "../layout/Layout";
import { addBilling } from "../services/billingServices";
import { BillingInfo } from "../types/Billing";

const Billing = () => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const { mutate } = useBillings();

  const onSubmit = (info: BillingInfo) => {
    mutate((preBillings = []) => [
      ...preBillings,
      { ...info, _id: "Generating Id..." },
    ]);
    handleModalClose();
    mutate((preBillings = []) => addBilling(info, preBillings));
  };

  return (
    <Layout>
      <TopBar handleModalOpen={handleModalOpen} />
      <BillingTable />
      <Modal open={open} onClose={handleModalClose} title="Billing">
        <BillingModal onSubmit={onSubmit} />
      </Modal>
    </Layout>
  );
};

export default Billing;
