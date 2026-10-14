import mark from "./assets/wyrmhoard-mark-currentcolor.svg?raw";

const Header = () => {
  return (
    <div>
      <div className="border-b-yellow-dim flex justify-between border-b px-12 py-2">
        <div className="flex items-center gap-3">
          <div
            className="text-yellow size-8 [&>svg]:size-full"
            dangerouslySetInnerHTML={{ __html: mark }}
          />
          <div className="text-cream font-jac text-xl">Wyrmhoard</div>
        </div>
        <div className="text-cream-muted font-vt flex items-center gap-5">
          <div>dice</div>
          <div>books</div>
          <div>minis</div>
          <div>accessories</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-surface border-yellow-dim text-test font-vt flex border px-4 py-2">
            PLACEHOLDER
          </div>
          <div className="border-yellow-dim relative border px-4 py-2">
            <span className="border-yellow-dim text-test font-vt bg-ink absolute top-0 left-1 flex -translate-y-1/2 px-2">
              haul
            </span>
            <div className="text-cream font-vt">stuff</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
