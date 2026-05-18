"use client";

import styled from "styled-components";
import { FilterByType } from "./filter-by";
import { FilterByPriority } from "./filter-by-priority";

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px 40px;
  justify-content: space-between;

  @media (min-width: ${(props) => props.theme.tableBreakpoint}) {
    padding: 20px 60px;
  }

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    padding: 20px 130px;
  }
`;

export function FilterBar() {
  return (
    <FilterContainer>
      <FilterByType />

      <FilterByPriority />
    </FilterContainer>
  );
}
