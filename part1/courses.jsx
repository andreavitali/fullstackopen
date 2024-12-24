const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part: { name, exercises } }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return parts.map(p => <Part key={p.id} part={p} />);
};

const Total = ({ parts }) => {
  return <b>Number of exercises {parts.reduce((acc, p) => (acc += p.exercises), 0)}</b>;
};

const Courses = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      {courses.map(c => (
        <div key={c.id}>
          <Header course={c.name} />
          <Content parts={c.parts} />
          <Total parts={c.parts} />
        </div>
      ))}
    </div>
  );
};

export default Courses;
