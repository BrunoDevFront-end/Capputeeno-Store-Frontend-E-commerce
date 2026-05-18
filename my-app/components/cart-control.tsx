"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CartIcon } from "./icons/cart-icon";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ProductInCart } from "@/types/product";

const CartCount = styled.span`
  width: 17px;
  height: 17px;

  background-color: var(--delete-color);
  color: white;
  position: absolute;
  right: -5px;
  top: 60%;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border-radius: 50%;
`;

const Container = styled.button`
  position: relative;
  cursor: pointer;
  border: none;
  background: transparent;
`;

export function CartControl() {
  const router = useRouter();

  const { value } = useLocalStorage<ProductInCart[]>("cart-items", []);

  const handleNavigateToCart = () => {
    router.push("/cart");
  };

  return (
    <Container onClick={handleNavigateToCart}>
      <CartIcon />

      {value.length > 0 && <CartCount>{value.length}</CartCount>}
    </Container>
  );
}
