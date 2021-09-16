import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import makeHttp from "../utils/http";
import { SWRConfiguration } from "swr/dist/types";
//swr => stale while revalidate
 const fetcher = (url: string) =>{
  makeHttp()
    .get(url)
    .then((res) =>{console.log('ola=>',res.data);return res.data} )};

export function useAuthSwr(url: string, config?: SWRConfiguration) {
  const { data, error } = useSWR<any, AxiosError>(url, fetcher, config);
  const { push } = useRouter();

  useEffect(() => {
    if (error?.response?.status === 401) {
      push("/login");
    }
    if (error) {
      console.error(error);
    }
    console.log('use',data)
  }, [data, error, push]);
 

  return { data, error };
}