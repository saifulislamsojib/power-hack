import useSWR from "swr";
import requests from "../services/httpService";
import { Billing } from "../types/Billing";

const fetcher = (url: string) =>
  requests
    .get<{ billingList: Billing[] }>(url)
    .then(({ billingList }) => billingList);

const useBillings = (page?: number, select?: string, search?: string) => {
  const { data: billingList, mutate } = useSWR(
    `/billing-list?${page ? `page=${page}` : ""}${page && select ? "&" : ""}${
      select ? `select=${select}` : ""
    }${(page && search) || (select && search) ? "&" : ""}${
      search ? `search=${search}` : ""
    }`,
    fetcher,
    {
      suspense: true,
    }
  );

  return {
    billingList,
    mutate,
  };
};

export default useBillings;
