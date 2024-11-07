import Options from "./Options";

function Question({ question, despatch, answer }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} despatch={despatch} answer={answer} />
    </div>
  );
}

export default Question;
