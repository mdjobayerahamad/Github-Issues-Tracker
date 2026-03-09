1️. What is the difference between var, let, and const?
Ans:
var: Old way to declare variables, function-scoped and can be redeclared.

let: Block-scoped and can be updated but not redeclared in the same scope.

const: Block-scoped and cannot be updated or redeclared.

2️. What is the spread operator (...)?
Ans:
The spread operator (...) is used to expand elements of an array or object. It helps copy or merge arrays/objects easily.

Example:
let arr2 = [...arr1];

3️. What is the difference between map(), filter(), and forEach()?
Ans:

map(): Creates a new array by changing each element.

filter(): Creates a new array with elements that pass a condition.

forEach(): Runs a function for each element but does not return a new array.

4️. What is an arrow function?
Ans:
An arrow function is a shorter way to write a function in JavaScript using =>.

Example:
const add = (a, b) => a + b;

5️. What are template literals?
Ans:
Template literals allow us to write strings with variables easily using backticks ( ).

Example:
`Hello ${name}`