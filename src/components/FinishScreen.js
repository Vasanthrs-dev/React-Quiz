function FinishScreen({ points, maxPoints, highscore }) {
  const average = (points / maxPoints) * 100;
  let emoji;
  if (average === 100) emoji = "🎖";
  if (average > 80 && average < 100) emoji = "🎉";
  if (average > 50 && average < 80) emoji = "🙂";
  if (average > 0 && average < 50) emoji = "🤔";
  if (average === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji} You scored {points} out of {maxPoints} ({Math.ceil(average)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}

export default FinishScreen;
