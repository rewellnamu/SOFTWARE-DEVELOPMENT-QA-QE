export function validateUsername(username: string): boolean {
    const validUsernamePattern = /^[a-zA-Z0-9]{6,}$/;
    return validUsernamePattern.test(username);
  }
  
  // Example usage
  const user1 = validateUsername('Matt1234');
  const user2 = validateUsername('Alice');
  
  console.log(user1); // Output: true
  console.log(user2); // Output: false

import { Expect, Equal } from '@type-challenges/utils'

// Union types
function getUsername(username: string | null) {
  if (username !== null) {
    return `User: ${username}`
  } else {
    return 'Guest'
  }
}
getUsername('Alice') // User: alice


 // Literal types
const result = getUsername('Alice')

type test = Expect<Equal<typeof result, string>>

const result2 = getUsername(null)

type test2 = Expect<Equal<typeof result2, string>>


// Union + Literal types
function move(direction: 'up' | 'down' | 'left' | 'right', distance: number) {
  // Move the specified distance in the given direction
}
move('up', 10)

move('left', 5)

// move('up-right', 10) // Error: "up-right" is not a valid direction

// move('down-left', 20) // Error: "down-left" is not a valid direction