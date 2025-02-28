//while comparing values the || and && operators come in handy 
//we also use the == or === for equality 
let result = '2' || '3' || 'Alamin'
if(result == '5' || result == '56' || result == 'Juma' || result == '2') {
    console.log('available')
} else {
    console.log('unavailable')
}

//Logical && 
//returns true only if both operands are true
//if one side is false, it will result to false
console.log(true && true) //true
console.log(false && true) //false 
console.log(true && false) //false 
console.log(false && false) //false 

let a = 5, b = 10;
console.log(a < b && b > a) //true
console.log(a > b && b > a) //false 

let user = {isLoggedIn: true, hasPermission: true}
//to view bankBalance, one needs to be loggedin and has permissions
if(user.isLoggedIn && user.hasPermission) {
    console.log('View your bank balace')
}

//The Logical operator returns true if one side is true 
//only when all sides are false, it will result into false 
console.log(a < b || b < a); // true: one condition is true
console.log(a > b || b < a); // false: both conditions are false
let userName = ''
let displayName = userName || 'Guest'
console.log(displayName) //print either empty or Guest 


///The Logical not ! checks the opposite of the equation 
console.log(!true) //false
console.log(!false) //true
let isActive = false
if(!isActive) {
    console.log("The system is not active")
} else {
    console.log("The system is active")
}


// Order of Operations: In JavaScript, logical NOT (!) has higher precedence than logical AND (&&), which in turn has higher precedence than logical OR (||). Understanding this precedence is crucial for writing complex conditional statements
let _a = true;
let _b = false;
let _result = !_a && (_b || true); // !a evaluates first, then &&, then ||
console.log(_result) ///false


//in react , we use logical rendering using logical opertaos 
// Conditional rendering in React
return (
    <div>
      {isUserLoggedIn && <WelcomeMessage />}
    </div>
  );
  //The WelcomeMessage component will be rendered only if isUserLoggedIn is truthy.