import axios, { AxiosPromise } from "axios";
import { ProductsFetchResponse } from "@/types/products-response";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "./useFilter";

import { mountQuery } from "@/utils/graphql-filters";
import { useDeferredValue } from "react";

//conectando no link do server
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);
// criando uma função fetcher que retorna uma requisição post para o link do server: tipado no formato de Products dentro de um array.
const fetcher = (query: string): AxiosPromise<ProductsFetchResponse> => {
  return axios.post(API_URL, { query });
};

export function useProducts(page = 0, perPage = 16) {
  //recebe os filtros vindo do provedor de FilterContext
  const { type, priority, search } = useFilter();
  const searchDeferred = useDeferredValue(search);

  // monta uma query baseada em filtros
  const query = mountQuery(type, priority, page, perPage);

  // chama a função fetcher dando como parametro para alteração o queryKey(filtros): sempre que mudar ele reexecuta
  const { data, isFetching } = useQuery({
    queryFn: () => fetcher(query),
    queryKey: ["products", type, priority, page],
    staleTime: 1000 * 60 * 1,
  });

  //aqui atribuo tudo que esta chegando na requisição a variavel products
  const products = data?.data?.data?.allProducts;

  const filteredProducts = products?.filter((products) =>
    products.name.toLowerCase().includes(searchDeferred.toLowerCase()),
  );

  return {
    data: filteredProducts,
    isLoading: isFetching,
  };
}
