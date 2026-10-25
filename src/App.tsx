import Header from "./components/general/Header";
import ItemCard from "./components/products/ItemCard";
import Footer from "./components/general/Footer";
import FilterSidebar from "./components/sidebar/FilterSidebar";
import { useState, useEffect } from "react";
import type { Product, Category } from "./types";
import { fetchProducts, fetchCategories } from "./fetch";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function wait() {
      setAllCategories(await fetchCategories());
    }
    wait();
  }, []);

  useEffect(() => {
    async function wait() {
      setProducts(await fetchProducts(filters));
    }
    wait();
  }, [filters]);

  const renderedCards = products.map((product) => (
    <ItemCard
      key={product.id}
      name={product.name}
      price={product.price}
      stock={product.stock}
      category={product.category}
    />
  ));

  return (
    <div>
      <Header />
      <div className="flex gap-8">
        <FilterSidebar
          categories={allCategories}
          filterStateFunc={setFilters}
          filterState={filters}
        />
        <div className="m-4 grid grow grid-cols-3 gap-8">{renderedCards}</div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
