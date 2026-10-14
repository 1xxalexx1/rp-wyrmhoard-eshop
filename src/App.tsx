import Header from "./Header";
import ItemCard from "./ItemCard";
import Footer from "./Footer";
import { useState, useEffect } from "react";

// TODO: only render the correct amount of cards
// TODO: pass the correct info to the cards


type Products = {
  title: string,
  price: number,
  stock: number,
}


function App() {
  const [pets, setPets] = useState(0);
  const [products, setProducts] = useState<Products[]>([]);

  function handleClick() {
    setPets(pets + 1);
  }

  useEffect(() => {
    let url = "http://127.0.0.1:8000/products";
    async function startFetching(){
      let response = await fetch(url);

      if (response.ok) {
        let json = await response.json()
        setProducts(json);
      } else {
        alert("Somethings gone wrong :(" + response.status);
      }
  };

  startFetching();
  }, []);

  console.log(products);

  return (
    <div>
      <Header />
      <div className="m-4 grid grid-cols-4 gap-8">

      </div>
      <div className="text-cream-muted font-vt flex flex-col items-center justify-center gap-2 text-sm">
        {" "}
        <div className="">Pet the wyrm, receive a prize</div>
        <button
          onClick={handleClick}
          className="border-yellow-dim cursor-pointer border px-2">
          Pet button
        </button>
        <div className="mb-2">The wyrm has been pet {pets} times</div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
