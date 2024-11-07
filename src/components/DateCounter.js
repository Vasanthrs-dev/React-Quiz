import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "reset":
      return { count: 0, step: 1 };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };

    default:
      throw new Error("Wrong action");
  }
}

function DateCounter() {
  const initial = { count: 0, step: 1 };
  const [state, despatch] = useReducer(reducer, initial);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    despatch({ type: "dec" });
  };

  const inc = function () {
    despatch({ type: "inc" });
  };

  const defineCount = function (e) {
    despatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    despatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    despatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
