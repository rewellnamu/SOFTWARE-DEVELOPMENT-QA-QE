//1. Variables//
// declare a variable age using let and assign the value 25//
let age = 25;
console.log(age);
// declare a variable schoolName using const and assign the value "Greenwood High"//
const schoolName = "Greenwood High";
// declare an empty array studentList using//
const studentList =[]
console.log(studentList);
// let is accessible just within the function it is put in//
// const cannot be reassigned after its initial value is set but if the value is an object the contents is modifiable. //
// var can be accessible in the entire program.//
//2.Naming conventions//
// which of the following variable names are invalid?//
// let 1stPlace = "John";// invalid
//Why is the following variable name incorrect?//
//const #taxRate = 0.16;// only letters, numbers, $ and _ are allowed in variable names//
//Rewrite this variable name to follow best practices let MyvariableNAME = "JavaScript"; //
let myVariableName = "JavaScript";
//3.Identifying the data types//
//What will be the output of the following? //
console.log(typeof "Hello");// string

console.log(typeof 99);// number
console.log(typeof true);// boolean
console.log(typeof undefined);// undefined
//Identify the data types in this array//
// let data = ["Kenya", 34, false, { country: "USA" }, null];// string, number, boolean, object, null//
//How do you define a BigInt in JavaScript? Provide an example//
let salary = 10000000000000000n;
console.log(salary);
//4. Objects and Arrays//
//Create an object person with properties name, age, and city//
let person = {
    name: "Namu",
    age: 29,
    city: "Nyeri"
}
console.log(person);
//Add a new property email to the person object//
let Person = {
     name: "Namu", 
     age: 29, 
     city: "Nyeri",
      email: "riwenamu@gmail.com"};
      console.log(Person);
  //Declare an array fruits with three fruit names//
  let fruits = ["oranges", "apples", "watrmelons"];    
  //Access the second item in the fruits array//
    console.log(fruits[1]);
//5. Type coersion//
//What will be the output of the following?//
console.log("5" + 2);
console.log("5" - 2);
//Convert the string "100" into a number//
let num = "100";
console.log(parseInt(num));
//Convert the number 50 into a string.//
let number = "50";
console.log(number);
//What will be the result of this operation?//
console.log(5 + true);

