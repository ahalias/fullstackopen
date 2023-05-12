const Header = (props) => {
    return (
        <h1>
          {props.course}
        </h1>
    )
    }
    
    const Content = ({parts}) => {
      return (
        <div>
          {parts.map((part, index) => (
            <Part key={index} part={part.name} exercise={part.exercises} />
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
    
    const Total = ({parts}) => {
      return (
        <p><b>Total of {parts.reduce((acc, obj) => acc + obj.exercises, 0)} exercises </b></p>
      )
    }
  
  
    const Course = ({course}) => {
      return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
    }

export default Course
