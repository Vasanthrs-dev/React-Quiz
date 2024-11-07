import { useEffect } from "react";

function Timer({ despatch, secondsRemaning }) {
  const min = Math.floor(secondsRemaning / 60);
  const sec = secondsRemaning % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        despatch({ type: "timer" });
      }, 1000);
      return () => clearInterval(id);
    },
    [despatch]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
