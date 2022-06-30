import toast from "react-hot-toast";
import { addBillingResponse, Billing, BillingInfo } from "../types/Billing";
import requests from "./httpService";

export const addBilling = async (info: BillingInfo, preBillings: Billing[]) => {
  const loadingId = toast.loading("Generating Id...");
  try {
    const res = await requests.post<addBillingResponse>("/add-billing", info);
    toast.dismiss(loadingId);
    if (res.errors) {
      Object.values(res.errors).map((value) => toast.error(value as string));
      return preBillings.filter(({ _id }) => _id !== "Generating Id...");
    } else {
      toast.success(res.message!);
      const oldBillings = preBillings.filter(
        ({ _id }) => _id !== "Generating Id..."
      );
      return [...oldBillings, res.billing!];
    }
  } catch (error: any) {
    toast.dismiss(loadingId);
    toast.error(error.message);
    return preBillings.filter(({ _id }) => _id !== "Generating Id...");
  }
};
