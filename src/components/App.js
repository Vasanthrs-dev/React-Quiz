import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import RestartButton from "./RestartButton";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUES = 20;

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaning: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaning: state.questions.length * SECS_PER_QUES,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "timer":
      return {
        ...state,
        secondsRemaning: state.secondsRemaning - 1,
        status: state.secondsRemaning === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action doesn't exist");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaning },
    despatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(function () {
    async function getData() {
      try {
        // Used direct JSON path instead of API
        const res = await fetch("/questions.json");
        const data = await res.json();
        console.log(data);
        despatch({ type: "dataReceived", payload: data.questions });
      } catch (err) {
        despatch({ type: "dataFailed" });
      }
    }

    getData();
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} despatch={despatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              despatch={despatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaning={secondsRemaning} despatch={despatch} />
              <NextButton
                despatch={despatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              maxPoints={maxPoints}
              points={points}
              highscore={highscore}
            />
            <RestartButton despatch={despatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
