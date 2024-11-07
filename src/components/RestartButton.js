function RestartButton({ despatch }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => despatch({ type: "restart" })}
    >
      Restart Quiz
    </button>
  );
}

export default RestartButton;
