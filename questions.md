Q1. What is the difference between Component and PureComponent? Give an example where it might break my app.

Ans.
Component: It doesn't automatically optimize how it renders when its props or state change. So, even if the data hasn't changed, it still re-renders.

PureComponent: A special kind of component in React. It automatically checks if its props or state have changed before re-rendering. If they haven't changed, it won't re-render, which can make your app faster.

Example where it might break the app:
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Regular Component
const RegularComponent = ({ name }) => {
console.log("Regular Component rendered");
return <div>{name}</div>;
};

// PureComponent
const Pure = React.memo(({ name }) => {
console.log("PureComponent rendered");
return <div>{name}</div>;
});

const App = () => {
const [name, setName] = useState("John");

useEffect(() => {
const interval = setInterval(() => {
// Changing state every second
setName("John");
}, 1000);

    return () => clearInterval(interval);

}, []);

console.log("App rendered");

return (

<div>
<RegularComponent name={name} />
<Pure name={name} />
</div>
);
};

ReactDOM.render(<App />, document.getElementById("root"));

// Where it might break:

// Let's introduce a breaking scenario by directly mutating the state object
// instead of creating a new object

// useEffect(() => {
// const interval = setInterval(() => {
// // Mutating state directly - BAD PRACTICE
// const newPerson = person;
// newPerson.name = "Jane"; // Mutating the object
// setPerson(newPerson);
// }, 1000);

// return () => clearInterval(interval);
// }, []);

// Uncommenting and adding the above code inside the useEffect would lead to unexpected behavior
// because React won't detect the change properly and PureComponent won't re-render as expected.

Q2. Context + ShouldComponentUpdate might be dangerous. Why is that?
Ans. This will happen because Context provides a way to pass data through the component tree without having to pass props down manually at every level. However, when the context value changes, all components that are consuming that context will re-render, regardless of whether they actually need the new context data. This can lead to unnecessary re-renders and performance issues, especially in large applications.

Q3. Describe 3 ways to pass information from a component to its PARENT.
Ans. 1st way React Hooks: In functional components, you can use React hooks such as useState and useEffect to manage state within the child component and then pass the updated state back to the parent component.

Here's an example:

parentComponent:
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
const [dataFromChild, setDataFromChild] = useState('');

return (

<div>
<ChildComponent setDataToParent={setDataFromChild} />
<p>Data from child: {dataFromChild}</p>
</div>
);
};

export default ParentComponent;

childComponent:
import React, { useState } from 'react';

const ChildComponent = ({ setDataToParent }) => {
const [data, setData] = useState('');

const sendData = () => {
setData('Hello from child!');
setDataToParent(data);
};

return (

<div>
<button onClick={sendData}>Send Data to Parent</button>
</div>
);
};

export default ChildComponent;

2nd way is Redux or other State Management Libraries: If your application uses Redux or another state management library, you can dispatch actions from the child component to update the global state.

3rd way is Context API: React's Context API allows you to create a global state that can be accessed by any component in the component tree, regardless of their hierarchy.

Q3. Give 2 ways to prevent components from re-rendering.
Ans. Use React.memo with Functional Components: Wrap your functional component with React.memo to memoize the component based on its props. This prevents re-renders if the props haven't changed.

Using UseRef: By using useRef to store data that doesn't affect the component's rendering, we avoid unnecessary re-renders while still being able to track changes or perform side effects.

Example:
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const ExpensiveComponent = React.memo(({ onClick }) => {
const renderCount = useRef(0); // Using useRef to store render count without causing re-renders
renderCount.current++; // Incrementing render count on each render

return (

<div>
<p>Render count: {renderCount.current}</p>
<button onClick={onClick}>Click me</button>
</div>
);
});

const App = () => {
const [count, setCount] = useState(0);

const handleClick = () => {
setCount(count + 1);
};

return (

<div>
<p>Parent Component</p>
<p>Count: {count}</p>
<ExpensiveComponent onClick={handleClick} />
</div>
);
};

ReactDOM.render(<App />, document.getElementById('root'));

Q4. What is a fragment and why do we need it? Give an example where it might break my app.
Ans. Fragment is a special type of component in React that allows you to group multiple children elements without adding extra nodes to the DOM.
import React from 'react';

const App = () => {
return (
<>

<h1>Hello</h1>
<p>World</p>
</>
);
};

export default App;
In this example, we're using fragments to wrap the <h1> and <p> elements and if we forget to import React at the top of the file, this code will break the app. This is because JSX fragments (<>...</>) are transformed into React.Fragment components, and without the React import, the code won't compile.

Q5. Give 3 examples of the HOC pattern.
Ans. Higher-Order Component (HOC) pattern is a design pattern in React where a component is wrapped with another component to provide additional functionality.
Examples of the HOC pattern:
a) withAuthentication: An HOC that adds authentication functionality to a component by checking if the user is authenticated before rendering the wrapped component.
const withAuthentication = (WrappedComponent) => {
const WithAuthentication = (props) => {
const isAuthenticated = /_ Logic to check if user is authenticated _/;

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to="/login" />;
    }

};

return WithAuthentication;
};

export default withAuthentication;

Usage:
import React from 'react';
import withAuthentication from './withAuthentication';

const Dashboard = () => {
return <div>Dashboard Content</div>;
};

export default withAuthentication(Dashboard);

Similarly we use below two as well
b) withLogger: An HOC that logs lifecycle events of a component, such as when it mounts, updates, or unmounts. This can be useful for debugging or monitoring purposes.
c) withLoading: An HOC that adds loading state to a component while data is being fetched asynchronously. It displays a loading spinner or message until the data is available.

Q7. What's the difference in handling exceptions in promises, callbacks and async...await?
Ans. Promises: Promise chains typically use .then() and .catch() methods to handle both resolved and rejected states. The .catch() method is used to handle errors in the promise chain.
Callbacks: Error handling in callbacks involves passing an additional error parameter as the first argument in the callback function.
fetchData((error, data) => {
if (error) {
// handle error
} else {
// handle data
}
});
Async/Await: Error handling in async/await is done using try...catch blocks, making the code look more like synchronous code.

Key differences:
Promises and async/await provide a more readable and concise syntax compared to callbacks, which can lead to cleaner and easier-to-understand code.
Async/await is built on top of promises and provides a more synchronous-like coding style
Callbacks are more error-prone and can lead to callback hell (nested callbacks) when dealing with multiple asynchronous operations.

Q8. How many arguments does setState take and why is it async.
Ans. setState function typically takes two arguments: Partial State Object or State-Updating Function and Callback Function (Optional).

Q9. List the steps needed to migrate a Class to Function Component.
Ans.
a) Rewrite the component as a function component. Remove the class keyword and replace it with a function keyword or use an arrow function.
b) Move any state management logic and lifecycle methods from the class component to the function component using React hooks.
c) Convert any class methods to regular functions within the function component.
d) Remove the render() method from the class component since function components don't have a render method.
e) Replace references to this.props with direct access to props in the function component's argument list.
f) Review any component lifecycle methods (e.g., componentDidMount, componentDidUpdate, componentWillUnmount) and replace them with appropriate hooks in the function component.

Q10. List a few ways styles can be used with components.
Ans. Inline Styles, CSS Modules, Styled Components, Global Stylesheets, SCSS, External CSS

Q11. How to render an HTML string coming from the server.
Ans. To render an HTML string coming from the server in a React component, you can use the dangerouslySetInnerHTML attribute.
const MyComponent = ({ htmlString }) => {
return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};
