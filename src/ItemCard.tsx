// TODO: pass in title, price and stock as a prop (figure out the type stuff)

interface CardProps {
  title: string,
  price: number,
  stock: number,
}

const ItemCard = ({title, price, stock}: CardProps) => {
let cond = (stock > 0) ? `In Stock: ${stock}` : `Out of stock!`

  return (
    <div>
      <div className="border-yellow-dim relative flex grow flex-col justify-between gap-4 border px-2 py-4">
        <span className="text-yellow-dim font-vt bg-ink absolute top-0 left-3 -translate-y-1/2 px-1 text-sm">
          label
        </span>
        <div className="border-yellow-dim text-test font-vt border px-6 py-10 text-center">
          PLACEHOLDER
        </div>
        <div className="text-cream font-vt text-lg">{title}</div>
        <div className="font-vt flex items-baseline justify-between">
          <div className="text-yellow text-lg">{price}</div>
          <div className="text-cream-muted text-base">{cond}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
