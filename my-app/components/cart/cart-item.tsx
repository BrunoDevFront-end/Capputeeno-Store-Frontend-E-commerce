import { ProductInCart } from "@/types/product";
import styled from "styled-components";
import { formatValue } from "@/utils/format-price";
import { Delete } from "../icons/delete-icon";
import { ChangeEvent } from "react";

interface CartItemProps {
  product: ProductInCart;
  handleUpdateQuantity(id: string, quantity: number): void;
  handleDelete(id: string): void;
}

const Item = styled.li`
  display: flex;
  align-items: center;
  height: 150px;
  justify-content: center;
  border-radius: 8px;
  background-color: white;
  position: relative;

  button {
    position: absolute;
    top: 16px;
    right: 24px;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  img {
    width: 40%;
    height: 100%;
    object-fit: cover;
  }

  > div {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding: 16px 10px;
    line-height: 150%;
    color: var(--text-dark-2);
    min-width: 0;

    h4 {
      font-weight: 300;6
      font-size: 15px;
    }

    p {
      font-weight: 400;
      font-size: 10px;
      max-height: 40%;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      max-width: 600px;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      span {
        font-weight: 600;
        font-size: 13px;
        color: var(--shapes-dark);
      }
    }
  }

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    > div {
      padding: 16px 24px;
    }
  }

  @media (min-width: ${(props) => props.theme.MobileBreakpoint}) {
    height: 210px;
    > div {
      padding: 16px 15px;

      h4 {
        font-size: 20px;
      }

      p {
        font-size: 12px;
      }
      span {
        font-size: 16px;
      }
    }
  }
  @media (min-width: ${(props) => props.theme.smallMobileBreakpoint}) {
    img {
      border-radius: 8px 0 0 8px;
    }
  }
`;

const TrashIcon = styled(Delete)`
  width: 19px;
  height: 19px;

  @media (min-width: ${(props) => props.theme.MobileBreakpoint}) {
    width: 24px;
    height: 24px;
  }
`;

const SelectQuantity = styled.select`
  padding: 5px;
  display: flex;
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-secondary);
  color: var(--text-dark);
  font-weight: 400;
  font-size: 11px;

  @media (min-width: ${(props) => props.theme.MobileBreakpoint}) {
    padding-right: 13px;
    font-size: 16px;
  }
`;

export function CartItem({
  product,
  handleUpdateQuantity,
  handleDelete,
}: CartItemProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleUpdateQuantity(product.id, Number(e.target.value));
  };
  return (
    <Item>
      <button onClick={() => handleDelete(product.id)} aria-label="Deletar">
        <TrashIcon />
      </button>
      <img src={product.image_url} />
      <div>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <div>
          <SelectQuantity value={product.quantity} onChange={handleChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </SelectQuantity>
          <span>{formatValue(product.price_in_cents)}</span>
        </div>
      </div>
    </Item>
  );
}
