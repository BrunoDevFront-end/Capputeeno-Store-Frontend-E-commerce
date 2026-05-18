"use client";

import { ProductsCard } from "./products-card";
import styled from "styled-components";
import { useProducts } from "@/hooks/useProducts";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 256px);
  grid-gap: 32px;
  justify-content: center;
  max-width: 95%;
  margin-top: 32px;
`;

interface ProductsListProps {
  page: number;
}

export function ProductsList({ page }: ProductsListProps) {
  const { data } = useProducts(page, 16);

  return (
    <ListContainer>
      {data?.map((product) => (
        <ProductsCard
          key={product.id}
          title={product.name}
          price={product.price_in_cents}
          image={product.image_url}
          id={product.id}
        />
      ))}
    </ListContainer>
  );
}
