function NextButton({ despatch, answer, numQuestions, index }) {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => despatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => despatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
