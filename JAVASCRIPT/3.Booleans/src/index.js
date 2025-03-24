// a boolean is a true or false value  
const isAdmin  =  true 
const isStudent  = false  

//logically how can we apply  booleans 
function showPaymentsModule(args) {
    
    if(args === true) {
        //show payment details
        console.log("You have the access rights to payments page")
    } else {
        //show PageNotAuthorized
        console.log("You dont have the access rights to payments page")
    }
}

// {isAdmin && <PaymentsPage />}
showPaymentsModule(isAdmin) //You have the access rights to payments page
showPaymentsModule(isStudent) //You dont have the access rights to payments page

// If you wrap true or false in quotes, they become strings:
console.log(typeof 'true') //string 


//Booelean Context 
//Booleans are often used in the context of comparison and logical operators:
//Equality Operator (==): Returns true if the operands are equal.
// use == or === 
//== - checks if the values are equal only 
// === - checks if the value are equal and the type are equal 

console.log(5 == '5') // true - didnt check the type but only the value 
console.log(5 === '5') //false - checking both values and types number!= string


//booleans can also be used to chck inequality 
// we use != or !== 
console.log(6 != 6) // flase
console.log(6 !== 6) //false 
console.log(6 != '6') // false - checks only the value 
console.log(6 !== '6') //true - checks the type and value


//real world example of != comparison using passwords
import  bcrypt from 'bcrypt'
const password = 'QWEiop5991'
const hashedPassword = bcrypt.hashSync(password, 10)
console.log(hashedPassword) //$2b$10$eFO2yvRrtaD7OoBgcJ.sVOOqla4hyRRINrMbO3MV4o9EXX2jQb/AO

//assuming that u need to login to your app 
//we need to compare the user password with the hashedpassword
const comparedPasswords = bcrypt.compareSync(password, hashedPassword)
// const comparedPasswords = bcrypt.compareSync("password", hashedPassword) // false

console.log(comparedPasswords) //true
function authLogin() {
    //this can be an angular/react component
    if(comparedPasswords) {
        //show payment details
        console.log("Loggin successfull")
    } else {
        //show PageNotAuthorized
        console.log("Login failed")
    }
}
authLogin()



//&& keyword 
//its alogical operator that checks if the left and the right side are true 
//both sides should be true to evaluate to true  
console.log(true && true) //true
console.log(false && true) //false 
console.log(true && false) //false 
console.log(false && false) //false 