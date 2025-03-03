// 1 creating a class 
//To create a class in TypeScript, you use the class keyword followed by the class name. The convention is to use PascalCase for class names
/**
 class StudentMarks {
    name: string;
    marks: number[];
}
 */
//at this poin ttypescript will throw errors, because name and maeks are not initilaized. To fix this issue we wneed to add a constructor  


//2:Adding a constuctor 
//The constructor is a special method that runs when a new instance of the class is created. It’s used to initialize the object’s properties

class StudentMarks {
    name: string;
    marks: number[];

    //add a constructor 
    constructor() {
        //initilaize the properties
        this.name = "Loop Diop"
        this.marks = [12, 34, 56]
    }
}

//now when we create an instance of StudentMarks, the properties will be initialized\
const LoopMarks = new StudentMarks()
console.log(LoopMarks) //StudentMarks { name: 'Loop Diop', marks: [ 12, 34, 56 ] }


//3: Adding arguments to  aconstructor 
//You can make the constructor more flexible by allowing it to accept arguments:
class Album {
    title: string;
    artist: string;
    releaseYear: number;

    constructor(opts: { title: string; artist: string; releaseYear: number }) {
        this.title = opts.title;
        this.artist = opts.artist;
        this.releaseYear = opts.releaseYear;
    }
}

//the second option is to create an interface for your properties 
interface AlbumOptions {
    title: string; artist:
    string;
    releaseYear: number
}
class Album1 {
    title: string;
    artist: string;
    releaseYear: number;

    constructor(opts: AlbumOptions) {
        this.title = opts.title;
        this.artist = opts.artist;
        this.releaseYear = opts.releaseYear;
    }
}

//Now, you can create instances with custom values:
const plasticOnonBand = new Album(
    {
        title: "Plastic Ono Band",
        artist: "John Lennon",
        releaseYear: 1970,
    }
)


//4: class properties
//Default values(property Initilializer)
//You can set default values for properties directly in the class body:
class Album3 {
    title = "Unknown Album";
    artist = "Unknown Artist";
    releaseYear = 0;
}
//these properties can be overridden in the constructor

//readonly properties 
//The readonly keyword makes a property immutable after it’s set
class Album4 {
    readonly title: string;
    readonly artist: string;
    readonly releaseYear: number;

    constructor(opts: AlbumOptions) {
        this.title = opts.title;
        this.artist = opts.artist;
        this.releaseYear = opts.releaseYear;
    }
}

//optional properties 
//You can mark properties as optional using ?:
class Album5 {
    title?: string;
    artist?: string;
    releaseYear?: number;
}


//visibility modifieers
// TypeScript provides three visibility modifiers to control access to class members:
// public: The default. Accessible from anywhere.
// private: Accessible only within the class.
// protected: Accessible within the class and its subclasses.
class Album6 {
    public title?: string;
    private rating?: number;
    protected artist?: string;
}

//6: methods are functions defined within a class. They can interact with the class properties
interface AlbumOptions {
    title: string; artist:
    string;
    releaseYear: number
}
class Album7 {
    //1:create your properties
    title: string;
    artist: string;
    releaseYear: number;

    //2:create a constructor for it
    constructor(opts: AlbumOptions) {
        this.title = opts.title;
        this.artist = opts.artist;
        this.releaseYear = opts.releaseYear;
    }

    //3: create methods
    public printInfo() {
        console.log(`${this.title} by ${this.artist}, released in ${this.releaseYear}.`);
    }
}

//You can call the method on an instance:
const album = new Album7({
    title: "Abbey Road",
    artist: "The Beatles",
    releaseYear: 1969,
});

album.printInfo()//Abbey Road by The Beatles, released in 1969.



//7: Inheritace
//Classes can inherit properties and methods from other classes using the extends keyword.
class SpecialEditionAlbum extends Album7 {
    bonusTracks: string[]
    constructor(opts: { title: string; artist: string; releaseYear: number; bonusTracks: string[] }) {
        super(opts) //Call the parent class constructor 
        this.bonusTracks = opts.bonusTracks
    }
}
//The super() method is used to call the parent class’s constructor.


//8:Abstract classes
//Abstract classes cannot be instantiated directly. They are meant to be extended by other classes.
//all properties in abstract must be abstract properties
abstract class AlbumBase {
    abstract title: string;
    abstract artist: string;

    printInfo() {
        console.log(`${this.title} by ${this.artist}`);
    }
}

class Album8 extends AlbumBase {
    title: string;
    artist: string;

    constructor(opts: { title: string; artist: string }) {
        super();
        this.title = opts.title;
        this.artist = opts.artist;
    }
}



//9: Getters and setters 
// Why Use Getters and Setters?
// Encapsulation: They protect the internal state of an object by controlling access to its properties.
// Validation: You can add validation logic before setting a value.
// Read-only or Write-only Access: You can make a property read-only or write-only by defining either a getter or a setter but not both.
// Computed Properties: Getters can calculate and return a value dynamically.
// Consistency and Control: They ensure consistent access to properties and help avoid unintended modifications.

class Album9 {
    // Private properties with type annotations
    private _title: string;
    private _artist: string;
    private _releaseYear: number;

    // Constructor with parameter type annotations
    constructor(title: string, artist: string, releaseYear: number) {
        this._title = title;
        this._artist = artist;
        this._releaseYear = releaseYear;
    }

    // Getter for title
    public get title(): string {
        return this._title;
    }

    // Setter for title with validation
    public set title(newTitle: string) {
        if (newTitle.length > 0) {
            this._title = newTitle;
        } else {
            console.log("Title cannot be empty.");
        }
    }

    // Getter for artist
    public get artist(): string {
        return this._artist;
    }

    // Setter for artist
    public set artist(newArtist: string) {
        this._artist = newArtist;
    }

    // Getter for releaseYear
    public get releaseYear(): number {
        return this._releaseYear;
    }

    // Setter for releaseYear with validation
    public set releaseYear(newYear: number) {
        if (newYear > 1900 && newYear <= new Date().getFullYear()) {
            this._releaseYear = newYear;
        } else {
            console.log("Invalid release year.");
        }
    }
}

// Usage example
const album2 = new Album9("Unknown Album", "Unknown Artist", 0);

// Using the getter to access the title
console.log(album2.title); // Output: Unknown Album

// Using the setter to update the title
album2.title = "Plastic Ono Band";
console.log(album2.title); // Output: Plastic Ono Band

// Attempting to set an invalid title
album2.title = ""; // Output: Title cannot be empty.

// Using the setter to update the release year
album2.releaseYear = 1970;
console.log(album2.releaseYear); // Output: 1970

// Attempting to set an invalid release year
album2.releaseYear = 1899; // Output: Invalid release year.



//implements keywords 
//What is implements in TypeScript?
// In TypeScript, the implements keyword is used to enforce that a class follows a specific structure defined by an interface. It ensures that the class provides concrete implementations for all properties and methods declared in the interface.
// This is a great way to achieve consistency and type safety, especially in large applications where multiple classes should have a similar structure.
//Polymorphism: Allows different classes to implement the same interface, making them interchangeable.
// Defining an interface
interface Album {
    title: string;
    artist: string;
    releaseYear: number;
    getAlbumDetails(): string;
}

// Implementing the interface in a class
class Album10 implements Album {
    title: string;
    artist: string;
    releaseYear: number;

    constructor(title: string, artist: string, releaseYear: number) {
        this.title = title;
        this.artist = artist;
        this.releaseYear = releaseYear;
    }

    // Implementing the method from the interface
    getAlbumDetails(): string {
        return `${this.title} by ${this.artist}, released in ${this.releaseYear}`;
    }
}

// Creating an instance of the class
const album3 = new Album10("Plastic Ono Band", "John Lennon", 1970);

console.log(album3.getAlbumDetails());
// Output: Plastic Ono Band by John Lennon, released in 1970


//the point is we enforced the structure of the class to look like the way we wanted


//10: the override keyword
//When overriding a method in a subclass, use the override keyword to ensure you’re intentionally overriding a parent method.

class Album11 {
    printInfo() {
        console.log("Album info");
    }
}

class SpecialEditionAlbum2 extends Album11 {
    override printInfo() {
        console.log("Special edition album info");
    }
}