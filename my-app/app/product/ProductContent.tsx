"use client";

import { BackBtn } from "@/components/back-button";
import { DefaultPageLayout } from "@/components/defaultPageLayout";
import styled from "styled-components";
import { useProduct } from "@/hooks/useProduct";
import { useSearchParams } from "next/navigation";
import { formatValue } from "@/utils/format-price";
import ShoppingBagIcon from "@/components/icons/shopping-bag-icon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ProductInCart } from "@/types/product";
import { toast } from "sonner";
import { ProductSkeletonCard } from "@/components/ProductSkeletonCard";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: 32px;
    margin-top: 24px;

    img {
      max-width: 640px;
      width: 100%;
    }

    div {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      button {
        background: #115d8c;
        mix-blend-mode: multiply;
        color: white;
        border: none;
        cursor: pointer;
        padding: 10px 0;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin: 16px 0;
      }
    }
  }

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    margin: 0 60px 0 60px;
  }

  @media (min-width: 648px) {
    section {
      flex-direction: row;

      img {
        width: 50%;
      }
    }
  }

  @media (min-width: ${(props) => props.theme.smallMobileBreakpoint}) {
    section {
      div {
        button {
          margin: 0;
          border-radius: 4px;
        }
      }
    }
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px;

  span:nth-of-type(1) {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: var(--text-dark-2);
    align-self: flex-start;
  }

  h2 {
    font-weight: 300;
    font-size: 25px;
    line-height: 150%;
    color: var(--text-dark-2);
    margin-top: 12px;
  }

  span:nth-of-type(2) {
    font-weight: 600;
    font-size: 16px;
    color: var(--shapes-dark);
    margin-bottom: 24px;
  }

  p {
    font-weight: 400;
    font-size: 12px;
    color: var(--text-dark);
  }

  div {
    margin-top: 30px;

    h3 {
      text-transform: uppercase;
      color: var(--text-dark);
      font-weight: 500;
      font-size: 16px;
    }

    p {
      font-size: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 15px;
    }
  }

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    h2 {
      font-size: 32px;
    }

    span:nth-of-type(2) {
      font-size: 20px;
    }

    div p {
      font-size: 16px;
    }
  }

  @media (min-width: 648px) {
    align-items: flex-start;
  }

  @media (min-width: ${(props) => props.theme.smallMobileBreakpoint}) {
    margin: 0;
  }
`;

export default function ProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>(
    "cart-items",
    [],
  );

  const { data } = useProduct(id ?? "");

  const handleAddToCart = () => {
    if (!id || !data) return;

    const updatedCart = value.some((item) => item.id === id)
      ? value.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [...value, { ...data, quantity: 1, id }];

    updateLocalStorage(updatedCart);
    toast.success("Item adicionado ao carrinho!");
  };

  if (!id) {
    return <p style={{ padding: 20 }}>Produto inválido</p>;
  }

  if (!data) {
    return <ProductSkeletonCard />;
  }

  return (
    <Container>
      <BackBtn navigate="/" />
      <section>
        <img src={data.image_url} alt={data.name} />
        <div>
          <ProductInfo>
            <span>{data.category}</span>
            <h2>{data.name}</h2>
            <span>{formatValue(data.price_in_cents ?? 0)}</span>
            <p>
              Frete de R$40,00 para todo o Brasil. Grátis para compras acima de
              R$200,00
            </p>
            <div>
              <h3>Descrição</h3>
              <p>{data.description}</p>
            </div>
          </ProductInfo>
          <button onClick={handleAddToCart}>
            <ShoppingBagIcon />
            Adicionar ao carrinho
          </button>
        </div>
      </section>
    </Container>
  );
}
