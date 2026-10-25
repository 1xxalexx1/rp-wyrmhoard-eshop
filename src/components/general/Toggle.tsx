interface ToggleProps {
  name: string;
  checked: boolean;
  stateFunc: (state: string[]) => void;
  state: string[];
}
function Toggle({ name, checked, stateFunc, state }: ToggleProps) {
  return (
    <div>
      <label className="font-vt text-cream flex items-center gap-4 text-sm hover:cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          className="border-yellow-dim checked:border-yellow checked:bg-yellow text-ink grid size-5 appearance-none place-content-center place-items-center border checked:before:content-['x']"
          onChange={() => {
            if (state.includes(name)) {
              stateFunc(state.filter((n) => n !== name));
            } else {
              stateFunc([...state, name]);
            }
          }}
        />
        <div>{name}</div>
      </label>
    </div>
  );
}

export default Toggle;
