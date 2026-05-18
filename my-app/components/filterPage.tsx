import styled from "styled-components";
import { useProducts } from "@/hooks/useProducts";
import { ArrowIcon } from "./icons/ArrowIcon";

const FilterPageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 10px;

  button:last-child {
    margin-right: 40px;
  }

  @media (min-width: ${(props) => props.theme.tableBreakpoint}) {
    button:last-child {
      margin-right: 50px;
    }
  }

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    button:last-child {
      margin-right: 125px;
    }
  }
`;

interface FilterPageProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface PageButtonProps {
  selected: boolean;
}

const PageButton = styled.button<PageButtonProps>`
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 13px;

  background: ${(props) => (props.selected ? "var(--orange-low)" : "white")};

  color: ${(props) => (props.selected ? "white" : "var(--text-dark)")};

  font-weight: 600;
`;

export function FilterPage({ page, setPage }: FilterPageProps) {
  const perPage = 16;

  const { data } = useProducts(page, perPage);

  const isLastPage = data && data.length < perPage;

  const totalPages = isLastPage ? page + 1 : page + 2;

  return (
    <FilterPageContainer>
      <button
        disabled={page === 0}
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
      >
        <ArrowIcon style={{ transform: "rotate(90deg)", cursor: "pointer" }} />
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <PageButton
          key={index}
          selected={page === index}
          onClick={() => setPage(index)}
        >
          {index + 1}
        </PageButton>
      ))}

      <button disabled={isLastPage} onClick={() => setPage((prev) => prev + 1)}>
        <ArrowIcon style={{ transform: "rotate(-90deg)", cursor: "pointer" }} />
      </button>
    </FilterPageContainer>
  );
}
