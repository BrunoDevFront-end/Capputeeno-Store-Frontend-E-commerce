import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -256px 0; }
  100% { background-position: 256px 0; }
`;

const SkeletonBox = styled.div<{ width?: string; height?: string }>`
  width: ${(p) => p.width || "100%"};
  height: ${(p) => p.height || "16px"};
  border-radius: 4px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 512px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

const Card = styled.div`
  width: 256px;
  border-radius: 0px 0px 4px 4px;
  overflow: hidden;
`;

const Content = styled.div`
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export function SkeletonCard() {
  return (
    <Card>
      <SkeletonBox height="300px" />
      <Content>
        <SkeletonBox height="18px" width="70%" />
        <SkeletonBox height="14px" width="40%" />
      </Content>
    </Card>
  );
}
