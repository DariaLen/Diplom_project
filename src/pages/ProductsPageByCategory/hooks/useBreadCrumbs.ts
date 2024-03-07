import { useMemo } from "react";

export function useBreadcrumbs(category) {
  const { id, title } = category;

  return useMemo(
    () =>
      [
        { label: "Main page", path: "/" },
        { label: "Categories", path: "/categories", active: true },
        category && {
          label: title,
          path: `/products/categories/${id}`,
          active: true,
        },
        // {
        //   label: `${list.length && list[0].title}`,
        //   path: `/product/${id}`,
        //   active: true,
        // },

        // ...filteredProducts.map((product) => ({
        //   label: product.title,
        //   path: `/product/${product.id}`,
        //   active: true,
        // }))

        // {
        //   label: category.title,
        //   path: `/product/${product.id}`,
        //   active: true,
        // },
      ].filter((crumb) => crumb && crumb.path),
    [category]
  );
}
