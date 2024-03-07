import { useMemo } from "react";

export function useBreadcrumbs(category) {
  return useMemo(() => {
    if (!category) {
      return [];
    }

    const { id, title } = category;

    return [
      { label: "Main page", path: "/" },
      { label: "Categories", path: "/categories", active: true },
      category && {
        label: title,
        path: `/products/categories/${id}`,
        active: true,
      },
    ];
  }, [category]);
}
