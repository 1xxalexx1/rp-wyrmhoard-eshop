import type { Category, Product } from "./types";

export async function fetchCategories(): Promise<Category[]> {
  const url = new URL("/api/categories", window.location.origin);

  const response = await fetch(url);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    alert(
      "Somethings gone wrong. Filtering might not work. " + response.status,
    );
    return [];
  }
}

export async function fetchProducts(filters: string[]): Promise<Product[]> {
  const url = new URL("/api/products", window.location.origin);
  // fun fact: an empty array != null
  if (filters.length > 0) {
    filters.map((cat) => url.searchParams.append("category", cat));
  }
  const response = await fetch(url);

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    alert("Somethings gone wrong :( " + response.status);
    return [];
  }
}
