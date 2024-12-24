const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral;
  const average = (good * 1 + bad * -1) / total;
  const positive = (good / total) * 100;

  return total == 0 ? (
    <p>No feedback given</p>
  ) : (
    <div>
      <table>
        <tbody>
          <StatLine text="good" value={good} />
          <StatLine text="neutral" value={neutral} />
          <StatLine text="bad" value={bad} />
          <StatLine text="all" value={total} />
          <StatLine text="average" value={average} />
          <StatLine text="positive %" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const Unicafe = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
      <h1>Anectdotes</h1>
      <Anectdotes />
    </div>
  );
};

export default Unicafe;
