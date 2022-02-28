import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatDisplay = (props) => (
  <p>{props.text} {props.number}</p>
)

const Heading = ({ text }) => <h2>{text}</h2>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getTotal = () => good + neutral + bad;
  const getTotalScore = () => good - bad;

  const getMeanScore = () => {
    return getTotal() ? getTotalScore() / getTotal() : "";
  }

  const getPositivePercent = () => {
    return getTotal() ? (good / getTotal()) * 100 + " %" : "";
  }

  return (
    <div>
      <Heading text="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Heading text="statistics" />
      <StatDisplay text="good" number={good} />
      <StatDisplay text="neutral" number={neutral} />
      <StatDisplay text="bad" number={bad} />
      <StatDisplay text="all" number={getTotal()} />
      <StatDisplay text="average" number={getMeanScore()} />
      <StatDisplay text="positive" number={getPositivePercent()} />
    </div>
  )
}

export default App