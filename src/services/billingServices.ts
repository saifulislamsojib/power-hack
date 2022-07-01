import toast from "react-hot-toast";
import { addBillingResponse, Billing, BillingInfo } from "../types/Billing";
import requests from "./httpService";

export const addBilling = async (
  info: BillingInfo,
  cb: (resBilling?: Billing) => Billing[]
) => {
  const loadingId = toast.loading("Generating Id...");
  try {
    const res = await requests.post<addBillingResponse>("/add-billing", info);
    toast.dismiss(loadingId);
    if (res.errors) {
      Object.values(res.errors).map((value) => toast.error(value as string));
      return cb();
    } else {
      toast.success(res.message!);
      return cb(res.billing!);
    }
  } catch (error: any) {
    toast.dismiss(loadingId);
    toast.error(error.message);
    return cb();
  }
};

export const updateBilling = async (
  info: BillingInfo,
  preBillings: Billing[],
  defaultValue: Billing,
  cb: (error?: boolean) => void
) => {
  const loadingId = toast.loading("Updating...");
  try {
    const res = await requests.patch<{
      message: string;
    }>(`/update-billing/${defaultValue._id}`, info);
    toast.dismiss(loadingId);
    toast.success(res.message);
    cb();
    return preBillings;
  } catch (error: any) {
    toast.dismiss(loadingId);
    toast.error(error.message);
    const index = preBillings.findIndex((it) => it._id === defaultValue._id);
    if (index !== -1) {
      const { _id, ...otherInfo } = defaultValue;
      const newBillings = [...preBillings];
      newBillings[index] = { ...newBillings[index], ...otherInfo };
      cb(true);
      return newBillings;
    }
    cb(true);
    return preBillings;
  }
};

export const deleteBilling = async (
  id: string,
  preBillings: Billing[],
  previousBilling: Billing[],
  cb: (error?: boolean) => void
) => {
  const loadingId = toast.loading("Deleting...");
  try {
    const res = await requests.delete<{
      message: string;
    }>(`/delete-billing/${id}`);
    toast.dismiss(loadingId);
    toast.success(res.message);
    cb();
    return preBillings;
  } catch (error: any) {
    toast.dismiss(loadingId);
    toast.error(error.message);
    cb(true);
    return previousBilling;
  }
};
