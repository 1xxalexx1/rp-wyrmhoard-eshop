import svg from "./assets/wyrmhoard-mark-currentcolor.svg?raw";

const Footer = () => {
  return (
    <div>
      <div className="border-t-yellow-dim flex flex-col items-center gap-8 border-t py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center">
            <div className="flex flex-col justify-baseline gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="text-yellow size-10 [&>SVG]:size-full"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
                <div className="font-jac text-cream text-2xl">Wyrmhoard</div>
              </div>
              <div className="font-vt text-yellow-dim w-150 text-sm">
                Dice, books, miniatures and tools for the table. Packed with
                care, dispatched promptly and not enchanted without consent.
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-vt text-yellow-dim border-yellow-dim relative justify-start border py-2 pr-30 pl-4 text-start">
                <span className="bg-ink absolute top-0 left-1 -translate-y-1/2 px-2">
                  label
                </span>
                <div>item 1</div>
                <div>item 2</div>
                <div>item 3</div>
                <div>item 4</div>
                <div>item 5</div>
              </div>
              <div className="font-vt text-yellow-dim border-yellow-dim relative justify-start border py-2 pr-30 pl-4 text-start">
                <span className="bg-ink absolute top-0 left-1 -translate-y-1/2 px-2">
                  label
                </span>
                <div>item 1</div>
                <div>item 2</div>
                <div>item 3</div>
                <div>item 4</div>
                <div>item 5</div>
              </div>
            </div>
          </div>
          <div>
            <div className="font-vt text-yellow-dim border-yellow-dim relative justify-start border px-4 py-4 text-start">
              <span className="bg-ink absolute top-0 left-1 -translate-y-1/2 px-2">
                Mailing list
              </span>
              Description Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Et repellat modi dignissimos! Quas soluta.
              <div className="border-yellow-dim bg-surface border px-2">
                Add your email
              </div>
            </div>
          </div>
          <div className="font-vt text-yellow-dim border-yellow-dim border-t">
            &copy; 2026 WYRMHOARD
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
