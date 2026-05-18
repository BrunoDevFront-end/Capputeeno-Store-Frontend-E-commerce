"use client";

import { BackBtn } from "@/components/back-button";
import { CartItem } from "@/components/cart/cart-item";
import { DefaultPageLayout } from "@/components/defaultPageLayout";
import { Divider } from "@/components/divider";
import { BackIcon } from "@/components/icons/BackIcon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product, ProductInCart } from "@/types/product";
import { formatValue } from "@/utils/format-price";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 1580px;
  margin: 0 auto;

  gap: 32px;

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    flex-direction: row;
  }
`;

const CartListContainer = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 500;
    line-height: 150%;
    text-transform: uppercase;
    color: var(--text-dark-2);
    margin-top: 24px;
    margin-left: 16px;
  }

  p {
    font-weight: 300;
    font-size: 14px;
    line-height: 150%;
    color: var(--text-dark-2);
    margin-left: 16px;

    span {
      font-weight: 600;
    }
  }

  @media (min-width: ${(props) => props.theme.smallMobileBreakpoint}) {
    h3 {
      font-size: 24px;
      margin-left: 0;
    }
    p {
      font-size: 16px;
      margin-left: 0;
    }
  }
`;

const CartList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const NotItems = styled.div`
  padding: 20px 50px;
  font-size: 20px;

  @media (min-width: ${(props) => props.theme.smallMobileBreakpoint}) {
    font-size: 24px;
    padding: 40px 100px;
  }
  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    font-size: 30px;
  }
`;

const CartResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 352px;
  padding: 16px 24px;
  margin-top: 24px;
  background: white;

  h3 {
    font-weight: 600;
    font-size: 18px;
    color: var(--text-dark-2);
    text-transform: uppercase;
    margin-bottom: 30px;
  }

  @media (min-width: ${(props) => props.theme.smallMobileBreakpoint}) {
    h3 {
      font-size: 20px;
      
    }
   
`;

const TotalItem = styled.div<{ isBold: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  font-weight: ${(props) => (props.isBold ? "600" : "400")};
  font-size: 16px;
  line-height: 150%;

  margin-bottom: 12px;
`;

const ShopBtn = styled.button`
  color: white;
  border-radius: 4px;
  background: var(--success-color);
  padding: 12px 12px;
  width: 100%;
  border: none;
  margin-top: 40px;
  cursor: pointer;
`;

export default function CartPage() {
  const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>(
    "cart-items",
    [],
  );
  const calculateTotal = (value: ProductInCart[]) => {
    return value.reduce(
      (sum, item) => (sum += item.price_in_cents * item.quantity),
      0,
    );
  };

  const cartTotal = formatValue(calculateTotal(value));
  const deliveryFee = 4000;

  const cartTotalWithDelivery = formatValue(calculateTotal(value) + 4000);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const newValue = value.map((item) => {
      if (item.id !== id) return item;

      return {
        ...item,
        quantity,
      };
    });

    updateLocalStorage(newValue);
  };

  const handleDeleteItem = (id: string) => {
    const newValue = value.filter((item) => {
      if (item.id !== id) return item;
    });
    updateLocalStorage(newValue);
  };

  return (
    <DefaultPageLayout>
      <Container>
        <CartListContainer>
          <BackBtn navigate="/" />
          <h3>Seu Carrinho</h3>
          <p>
            Total {value.length} produtos <span>{cartTotal}</span>
          </p>
          <CartList>
            {value.map((item) => (
              <CartItem
                product={item}
                key={item.id}
                handleUpdateQuantity={handleUpdateQuantity}
                handleDelete={handleDeleteItem}
              />
            ))}

            {value.length === 0 && (
              <NotItems>Não tem itens no seu carrinho!</NotItems>
            )}
          </CartList>
        </CartListContainer>
        <CartResultContainer>
          <h3>Resumo do Pedido</h3>
          <TotalItem isBold={false}>
            <p>SubTotal de Produtos</p>
            <p>{cartTotal}</p>
          </TotalItem>
          <TotalItem isBold={false}>
            <p>Entrega</p>
            <p>{formatValue(deliveryFee)}</p>
          </TotalItem>
          <Divider />
          <TotalItem isBold>
            <p>Total</p>
            <p>{cartTotalWithDelivery}</p>
          </TotalItem>
          <ShopBtn>Finalizar Compra</ShopBtn>
        </CartResultContainer>
      </Container>
    </DefaultPageLayout>
  );
}
