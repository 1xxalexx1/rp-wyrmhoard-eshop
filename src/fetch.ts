import type { Category, Product } from "./types";

export async function fetchCategories(): Promise<Category[]> {
  let url = "http://127.0.0.1:8000/categories";

  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    alert(
      "Somethings gone wrong. Filtering might not work. " + response.status,
    );
    return [];
  }
}

export async function fetchProducts(filters: string[]): Promise<Product[]> {
  let url = new URL("http://127.0.0.1:8000/products");
  // fun fact: an empty array != null
  if (filters.length == 0) {
  } else {
    filters.map((cat) => url.searchParams.append("category", cat));
  }
  let response = await fetch(url);

  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    alert("Somethings gone wrong :( " + response.status);
    return [];
  }
}
