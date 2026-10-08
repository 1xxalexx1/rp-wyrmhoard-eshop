import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.tsx";
import ItemCard from "./ItemCard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ItemCard />
  </StrictMode>,
);
