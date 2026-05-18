import { styled } from "styled-components";
import { ArrowIcon } from "./icons/ArrowIcon";
import { useState } from "react";
import { PriorityTypes } from "@/types/priority-types";
import { useFilter } from "@/hooks/useFilter";

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  margin-left: 25px;
  button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: var(--text-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
      margin-left: 16px;
    }

    @media (max-width: ${(props) => props.theme.MobileBreakpoint}) {
      svg {
        margin-left: 5px;
      }
    }
  }
`;

const PrioriryFilter = styled.ul`
  position: absolute;
  width: 250px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px 16px;

  list-style: none;
  top: 100%;
  z-index: 5;

  right: 8px;

  li {
    color: var(--text-dark);
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
  }

  li + li {
    margin-top: 4px;
  }

  @media (max-width: ${(props) => props.theme.tableBreakpoint}) {
    width: 200px;
  }
`;

const Overlay = styled.div<{ open: boolean }>`
  display: none;

  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

export function FilterByPriority() {
  const [isOpen, setIsOpen] = useState(false);
  const { setPriority } = useFilter();
  const handleOpen = () => setIsOpen((prev) => !prev);

  const handleUpdatePriority = (value: PriorityTypes) => {
    setPriority(value);
    setIsOpen(false);
  };

  return (
    <FilterContainer>
      <Overlay open={isOpen} onClick={() => setIsOpen(false)} />
      <button onClick={handleOpen}>
        Organizar por
        <ArrowIcon />
      </button>
      {isOpen && (
        <PrioriryFilter>
          <li onClick={() => handleUpdatePriority(PriorityTypes.NEWS)}>
            Novidades
          </li>
          <li onClick={() => handleUpdatePriority(PriorityTypes.MINOR_PRICE)}>
            Preço: maior - menor
          </li>
          <li onClick={() => handleUpdatePriority(PriorityTypes.BIGGET_PRICE)}>
            Preço: menor - maior
          </li>
          <li onClick={() => handleUpdatePriority(PriorityTypes.POPULARITY)}>
            Mais vendidos
          </li>
          <li></li>
        </PrioriryFilter>
      )}
    </FilterContainer>
  );
}
