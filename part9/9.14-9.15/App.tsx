const App = () => {
  const courseName = "Half Stack application development";


  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBaseDescription extends CoursePartBase  {
    description: string;
  }

  interface CoursePartBackground extends CoursePartBaseDescription {
    backgroundMaterial: string;
    kind: "background"
  }
  
  interface CoursePartBasic extends CoursePartBaseDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  interface CoursePartSpecial extends CoursePartBaseDescription {
    requirements: string[];
      kind: "special"
  }
  

  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];


  interface Head {
    name: string;
  }



  interface Body {
    courseParts: Array<CoursePart>;
  }


  const Header = ({name}: Head) => {
return (
<h1>{name}</h1>
)
  }


  const Part = ({ part }: { part: CoursePart }) => {
       switch(part.kind) {
        case "basic":
return (
  <p><b>{part.name} {part.exerciseCount}</b><br />{part.description}</p>
);
case "group":
  return (
    <p><b>{part.name} {part.exerciseCount}</b><br />{part.groupProjectCount}</p>
  );
  case "background":
    return (
      <p><b>{part.name} {part.exerciseCount}</b><br />{part.description}<br />{part.backgroundMaterial}</p>
    );
    case "special":
      return (
        <p><b>{part.name} {part.exerciseCount}</b><br />{part.description}<br />{part.requirements.join(", ")}</p>
      );
default:
      return assertNever(part);
      }
  }

  const Content = ({ courseParts }: Body) => {
    return (
    <div>
      { courseParts.map((part) => (
        <Part key={part.name} part={part} />
      )) }
            </div>
    );
  };

  const Total = ({courseParts}: Body) => {
    return (
      <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
    )
  }

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default App;