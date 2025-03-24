//Annotation is gibving something its own type 
//use : to annotate 

//basic variable annotation 
let name1 = "Julia"
//hovering over name  let name1: string
//lets annotate it
let name2: string = 'Julia'
console.log(name2) //Julia


//1: function parameter annotations 
const logAlbumInfo = (title: string, trackCount: number, isReleased: boolean) => {
    //info
}

//logAlbumInfo("Black Gold", 12, {})
//Argument of type '{}' is not assignable to parameter of type 'boolean'.ts(2345)

//const logAlbumInfo: (title: string, trackCount: number, isReleased: boolean) => void
//we can change the retun typeof a function by adding a type like 
function add(x: number, y: number): number {
    return x + y;
}
//function add(x: number, y: number): number
//add("Julia", 78) //Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)



//how do you annotate variable  
let car:string = "Ferari"
let carTyres:number = 4
let carIsGerman: boolean = true

//types we learnt 
// all basic types
//strings
//numbers
//booleans
//symbol
//big integer
// null
//undefined
let example1: string = "Hello World!";
let example2: number = 42;
let example3: boolean = true;
let example4: symbol = Symbol();
// let example5: bigint = 123n;
let example6: null = null;
let example7: undefined = undefined;



//typescript inference 
let marks = [1,34,56,67]
marks.push(89)
//marks.push("Cow") - error  // the number value infered the type 
//let marks: number[] - we did nt need to annotate array of number
//ts automatically inferered it 
let myNmae: string[] = ["Jonathan", "Ndambuki"]
//myNmae.push(2) - error


//function parameters must be passed with their annotation 
// function myInfo(name, age) {

// }
//not adding types on function will result an error 
//Parameter 'age' implicitly has an 'any' type.ts(7006)
function myInfo(name:string, age:number) {

}
// But TypeScript can't tell from a function parameter alone what type it's supposed to be

// When TypeScript doesn't know what type something is, it assigns it the any type
let a:any;
a = "Lion"
console.log(a) //Lion
a = 56
console.log(a) //56
// console.log(a.g.h) //typescript did not warn on IDE
//but gave an error on run time 

//avoid type any 

//exercise 
export const add1 = (a: number, b: number) => {
    return a + b;
}

export const add2 = (a: string, b: string) => {
    return a + b;
}

const concatTwoStrings = (a:string, b:string) => {
    return [a,b].join("")
}
concatTwoStrings("Hello", "World")


const concatTwoStrings1 = (a:string[], b:string) => {
    return [a.join(" "),b].join("")
}
concatTwoStrings1(["Ali", "Green"], "Kenya")


const handleFormData = (e: any) => {
    e.preventDefault();
  
    const data = new FormData(e.target);
  
    const value = Object.fromEntries(data.entries());
  
    return value;
  };

  

  //reusable and sharable type
  export type student = {
    name: string;
    age: number;
}