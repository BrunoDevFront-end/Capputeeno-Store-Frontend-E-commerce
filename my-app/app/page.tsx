"use client";

import styled from "styled-components";
import { FilterBar } from "../components/filter-bar";
import { ProductsList } from "@/components/products-List";
import { DefaultPageLayout } from "@/components/defaultPageLayout";
import { useEffect, useState } from "react";
import { FilterPage } from "@/components/filterPage";
import { useFilter } from "@/hooks/useFilter";

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Home() {
  const [page, setPage] = useState(0);

  const { type, priority, search } = useFilter();

  useEffect(() => {
    setPage(0);
  }, [type, priority, search]);

  return (
    <DefaultPageLayout>
      <PageWrapper>
        <FilterBar />

        <FilterPage page={page} setPage={setPage} />

        <ProductsList page={page} />
      </PageWrapper>
    </DefaultPageLayout>
  );
}
