import { useState } from 'react'

const Button = (props) =>  (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = props => <tr>{props.text} {props.stat}</tr>

const Statistics = (props) => {
  const all = props.stats[0] + props.stats[1] + props.stats[2]
  const average = (props.stats[0] - props.stats[2]) / all
  const positive = props.stats[0] / all * 100
  if (all != 0) {
    return (
      <>
      <table><thead><th align='left'><b>Statistics</b>
</th></thead><td>
      <StatisticLine text={"good"} stat={props.stats[0]} />
      <StatisticLine text={"neutral"} stat={props.stats[1]} />
      <StatisticLine text={"bad"} stat={props.stats[2]} />
      <StatisticLine text={"all"} stat={all} />
      <StatisticLine text={"average"} stat={average} />
      <StatisticLine text={"positive"} stat={`${positive}%`} />
      </td>
      </table>
      </>
  )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
  
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
      <p><b>Give feedback</b></p>
      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
      <Statistics stats={[good, neutral, bad]}/>
    </div>
  )
}

export default App
