import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -600px 0; }
  100% { background-position: 600px 0; }
`;

const SkeletonBox = styled.div<{ width?: string; height?: string }>`
  width: ${(p) => p.width || "100%"};
  height: ${(p) => p.height || "16px"};
  border-radius: 4px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 0 60px;

  section {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-top: 24px;
    width: 100%;

    @media (min-width: 648px) {
      flex-direction: row;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  padding: 10px;
`;

export function ProductSkeletonCard() {
  return (
    <Container>
      {/* Botão voltar */}
      <SkeletonBox width="80px" height="24px" />

      <section>
        {/* Imagem */}
        <SkeletonBox width="100%" height="400px" style={{ maxWidth: 640 }} />

        {/* Infos */}
        <InfoContainer>
          <SkeletonBox width="80px" height="16px" /> {/* categoria */}
          <SkeletonBox width="60%" height="32px" /> {/* nome */}
          <SkeletonBox width="100px" height="20px" /> {/* preço */}
          <SkeletonBox width="90%" height="14px" /> {/* frete */}
          <SkeletonBox
            width="100px"
            height="18px"
            style={{ marginTop: 30 }}
          />{" "}
          {/* descrição titulo */}
          <SkeletonBox height="14px" />
          <SkeletonBox height="14px" />
          <SkeletonBox width="70%" height="14px" />
          <SkeletonBox
            width="100%"
            height="44px"
            style={{ marginTop: 16 }}
          />{" "}
          {/* botão */}
        </InfoContainer>
      </section>
    </Container>
  );
}
