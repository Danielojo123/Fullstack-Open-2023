import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const averageScore = (good * 1 + neutral * 0 + bad * -1) / totalFeedback;
  const positivePercentage = (good / totalFeedback) * 100;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total feedback" value={totalFeedback} />
          <StatisticLine text="Average" value={isNaN(averageScore) ? 0 : averageScore} />
          <StatisticLine text="Positive" value={isNaN(positivePercentage) ? 0 : positivePercentage + '%'} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const totalFeedback = good + neutral + bad;
  const hasFeedback = totalFeedback > 0;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />

      {hasFeedback && <Statistics good={good} neutral={neutral} bad={bad} />}
    </div>
  );
};

export default App;
