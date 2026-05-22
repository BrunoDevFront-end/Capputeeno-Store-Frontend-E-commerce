import { Suspense } from "react";
import { DefaultPageLayout } from "@/components/defaultPageLayout";
import ProductContent from "./ProductContent";
import { ProductSkeletonCard } from "@/components/ProductSkeletonCard";

export const fetchCache = "force-no-store";

export default function ProductPage() {
  return (
    <DefaultPageLayout>
      <Suspense fallback={<ProductSkeletonCard />}>
        <ProductContent />
      </Suspense>
    </DefaultPageLayout>
  );
}
