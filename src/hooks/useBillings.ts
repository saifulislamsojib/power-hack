import useSWR from "swr";
import requests from "../services/httpService";
import { Billing } from "../types/Billing";

const fetcher = (url: string) =>
  requests
    .get<{ billingList: Billing[] }>(url)
    .then(({ billingList }) => billingList);

const useBillings = () => {
  const { data: billingList, mutate } = useSWR("/billing-list", fetcher, {
    suspense: true,
  });

  return {
    billingList,
    mutate,
  };
};

export default useBillings;
