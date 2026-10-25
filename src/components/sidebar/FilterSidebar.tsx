import { useState } from "react";
import Toggle from "../general/Toggle";
import type { Category } from "../../types";

interface FilterProps {
  categories: Category[];
  filterStateFunc: (state: string[]) => void;
  filterState: string[];
}

function FilterSidebar({
  categories,
  filterStateFunc,
  filterState,
}: FilterProps) {
  {
    /* 
        - expanding file-like button ✅
        - toggle (for categories)
        - expanding file-like button
        - slider (for price)
        - divider
        - toggle (for stock)
     */
  }

  const renderedCatToggles = categories.map((cat) => (
    <Toggle
      key={cat.id}
      name={cat.name}
      checked={filterState.includes(cat.name)}
      stateFunc={filterStateFunc}
      state={filterState}
    />
  ));

  const [open, setOpen] = useState(true);

  let opened = open ? "v" : ">";
  return (
    <div>
      <div className="border-yellow-dim relative border px-6 py-4">
        <span className="text-cream-muted font-vt bg-ink absolute top-0 left-3 -translate-y-1/2 px-1 text-sm">
          filter
        </span>
        <div className="font-vt text-yellow text-sm">
          <button
            aria-expanded={open}
            aria-controls="panel-inside"
            className="font-vt text-yellow text-sm"
            onClick={() => setOpen(!open)}
          >
            {opened} Category
          </button>
          <div id="panel-inside" hidden={!open}>
            {renderedCatToggles}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
