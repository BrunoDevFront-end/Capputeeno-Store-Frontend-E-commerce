import { FilterType } from "@/types/filterTypes";
import { PriorityTypes } from "@/types/priority-types";
export function getCategoryByType(type: FilterType) {
  if (type === FilterType.MUG) return "mugs";
  if (type === FilterType.SHIRT) return "t-shirts";
  return null;
}

export function getFieldByPriority(priority: PriorityTypes) {
  if (priority === PriorityTypes.NEWS)
    return { field: "created_at", order: "ASC" };
  if (priority === PriorityTypes.BIGGET_PRICE)
    return { field: "price_in_cents", order: "ASC" };
  if (priority === PriorityTypes.MINOR_PRICE)
    return { field: "price_in_cents", order: "DESC" };
  return { field: "sales", order: "DESC" };
}

export const mountQuery = (
  type: FilterType,
  priority: PriorityTypes,
  page: number,
  perPage: number,
) => {
  const category = getCategoryByType(type);

  if (!category && priority === PriorityTypes.POPULARITY) {
    return `
    query {
      allProducts (sortField: "sales", sortOrder: "DESC", page:${page}, perPage: ${perPage}){
        id
        name
        price_in_cents
        image_url
      }
    }
  `;
  }
  const sortSettings = getFieldByPriority(priority);
  const categoryFilter = getCategoryByType(type);

  return `
query {
  allProducts(
    sortField: "${sortSettings.field}",
    sortOrder: "${sortSettings.order}",
    page: ${page},
    perPage: ${perPage}
    ${categoryFilter ? `, filter: {category: "${categoryFilter}"}` : ""}
  ) {
    id
    name
    price_in_cents
    image_url
    category
  }

 
}
`;
};
