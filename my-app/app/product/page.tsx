import { Suspense } from "react";
import { DefaultPageLayout } from "@/components/defaultPageLayout";
import ProductContent from "./ProductContent";

export const fetchCache = "force-no-store";

export default function ProductPage() {
  return (
    <DefaultPageLayout>
      <Suspense fallback={<p style={{ padding: 20 }}>Carregando produto...</p>}>
        <ProductContent />
      </Suspense>
    </DefaultPageLayout>
  );
}
