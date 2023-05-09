
const Header = (props) => {
return (
    <h1>
      {props.course}
    </h1>
)
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part part={part} exercise={props.exercises[index]} />
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3} </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={[parts[0].name, parts[1].name, parts[2].name]} exercises={[parts[0].exercises, parts[1].exercises, parts[2].exercises]} />
      <Total ex1={parts[0].exercises} ex2={parts[1].exercises} ex3={parts[2].exercises} />
    </div>
  )
}

export default App
