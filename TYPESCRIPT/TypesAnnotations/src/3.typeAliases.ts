

// In TypeScript, there are multiple ways to define types. Here’s a comprehensive list of all the different ways you can define a type:

// Object type
type Animal1 = { species: string; legs: number };

// Primitive types
type Name = string;
type Age = number;
type IsAlive = boolean;

// Union type
type Status = "active" | "inactive" | "pending";

// Tuple type
type Coordinates = [number, number];

// Function type
type Add = (x: number, y: number) => number;

//2️⃣ Using interface (For Objects and Classes)
interface Person {
    name: string;
    age: number;
}

// Extending an interface
interface Employee extends Person {
    role: string;
}

//3️⃣ Using class (With Type Annotations)
class Car {
    make: string;
    model: string;
    year: number;

    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
}



//4️⃣ Using enum (For Constants & Named Values)
enum Color {
    Red = "red",
    Green = "green",
    Blue = "blue"
}

let bgColor: Color = Color.Red;


//5️⃣ Using typeof (For Inferring Types from Existing Variables)
const user = { name: "Alice", age: 30 };
type UserType = typeof user; // { name: string; age: number }

//6️⃣ Using keyof (For Extracting Keys from Objects)
type UserKeys = keyof UserType; // "name" | "age"

//7️⃣ Using Mapped Types (For Dynamic Object Transformations)
type ReadOnly<T> = { readonly [K in keyof T]: T[K] };
type ReadOnlyUser = ReadOnly<UserType>;


//8️⃣ Using Conditional Types
type IsString<T> = T extends string ? "Yes" : "No";
type Check = IsString<number>; // "No"


//🔟 Using Intersection (&) and Union (|) Types
type Cat = { meow: () => void };
type Dog = { bark: () => void };
type Pet = Cat | Dog; // Union: either Cat or Dog
type Hybrid = Cat & Dog; // Intersection: must have both properties


//1️⃣1️⃣ Using Record<K, V> (For Dynamic Object Types)
//✅ Record<K, V> is useful for defining object types with dynamic keys.
type UserRoles = Record<string, "admin" | "user" | "guest">;
const roles: UserRoles = { alice: "admin", bob: "user" };


//1️⃣2️⃣ Using Partial<T> & Required<T>
type PartialUser = Partial<UserType>; // All properties optional
type RequiredUser = Required<UserType>; // All properties required

//1️⃣3️⃣ Using Readonly<T>
type ImmutableUser = Readonly<UserType>;

///1️⃣4️⃣ Using Pick<T, K> & Omit<T, K>
type PickedUser = Pick<UserType, "name">; // Only 'name'
type OmittedUser = Omit<UserType, "age">; // Removes 'age'


//1️⃣5️⃣ Using Exclude<T, U> & Extract<T, U>
type StatusType = "active" | "inactive" | "banned";
type ActiveStatus = Exclude<StatusType, "banned">; // Removes "banned"
type SpecificStatus = Extract<StatusType, "active" | "banned">; // Only "active" or "banned"



// in real world apps, resusing types is preferred rater than inline
// We don't want to have to repeat the same type definition in every file that needs it.
//type keyword comes in. It allows us to define a type once 
//and use it in multiple places.

import { student } from "./1.basicTypes";

//defining types aliases as object and reusable 
type Animal = {
    name: string;
    type: string;
    age?: number;
}

//we can add it as a type annotation to a new variable 
let cow: Animal = {
    name: 'cow',
    type: 'mammal',
    age: 12
}

//lets reuse it 
let cat: Animal = {
    name: 'Cat',
    type: 'Amphibian',
    age: 12
}

//we can also use the type aliases in functons 
const getAnimalDescription = (animal: Animal) => {

}
getAnimalDescription(cat)


//types aliases as basic types
type id = string | number //Id can be either a string or a number
let userID: id = 34567
userID = 'bjvjkx hidfbjldsf' //bjvjkx hidfbjldsf
console.log(userID)


//how do you share types acrross modules
// export type student = {
//     name: string;
//     age: number;
// }

//to immport in the file needed

const Jabal: student = {
    name: 'Jabali',
    age: 23
}
console.log(Jabal)  //{ name: 'Jabali', age: 23 }


export type RectangleType = {
    width: number; 
    height: number
}

const getRectangleArea = (rectangle: RectangleType) => {
    return rectangle.width * rectangle.height;
};

const getRectanglePerimeter = (rectangle: RectangleType) => {
    return 2 * (rectangle.width + rectangle.height);
};
const rectangle1 = {
    width: 12,
    height: 23
}
console.log(getRectangleArea(rectangle1)) //276