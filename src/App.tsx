import Header from "./Header";
import ItemCard from "./ItemCard";
import Footer from "./Footer";
import { useState, useEffect } from "react";

type Products = {
  name: string;
  price: number;
  stock: number;
  label: string;
};

function App() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    let url = "http://127.0.0.1:8000/products";
    async function startFetching() {
      let response = await fetch(url);

      if (response.ok) {
        let json = await response.json();
        setProducts(json);
      } else {
        alert("Somethings gone wrong :(" + response.status);
      }
    }

    startFetching();
  }, []);

  console.log(products);

  const renderedCards = products.map((product) => (
    <ItemCard
      name={product.name}
      price={product.price}
      stock={product.stock}
      label={product.label}
    />
  ));

  return (
    <div>
      <Header />
      <div className="m-4 grid grid-cols-3 gap-8"> {renderedCards}</div>

      <Footer />
    </div>
  );
}

export default App;
