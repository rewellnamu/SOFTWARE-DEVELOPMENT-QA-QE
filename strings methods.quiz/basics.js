//1.
function is_string(input) {
  return typeof input === 'string';
}
console.log(is_string('w3resource'));
console.log(is_string([1, 2, 4, 0]));
//2.
function is_Blank(input) {
  if (input.length === 0) {
    return true;
  } else {
    return false;
  }
}
console.log(is_Blank(''));
console.log(is_Blank('abc'));
//3.
function string_to_array(input) {
  return input.split(' ');
}
console.log(string_to_array('Robin Singh'));
//4.
function truncate_string(input, n) {
  return input.slice(0, n);
}
console.log(truncate_string('Robin Singh', 4));
//5.
function abbrev_name(input) {
  return input.split(' ').map((name) => name[0]).join('.');
}
console.log(abbrev_name('Robin Singh'));
//6.
function protect_email(input) {
  const email = input.split('@');
  const username = email[0];
  const domain = email[1];
  return `${username.slice(0, 4)}...@${domain}`;
}
console.log(protect_email('robin_singh@example.com')); 
//7.
function string_parameterize(input) {
  return input.toLowerCase().replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s/g, '-');
}
console.log(string_parameterize('Robin Singh from USA.'));
//8. capitalize first letter//
function capitalize(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
console.log(capitalize('js string exercises'));    
//9. capitalize each word//
function capitalize_Words(input) {
  return input.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}   
console.log(capitalize_Words('js string exercises')); 
//10. swap case//
function swapcase(input) {
  return input.split('').map((char) => {
    if (char === char.toUpperCase()) {
      return char.toLowerCase();
    } else {
      return char.toUpperCase();
    }
  }).join('');
}
console.log(swapcase('AaBbc'));
//11.camelize string//
function camelize(input) {
  return input.replace(/\W+(.)/g, function(match, chr) {
    return chr.toUpperCase();
  });
}
console.log(camelize('JavaScript Exercises'));
//12. uncamelize string//
function uncamelize(input, separator) {
  separator = separator || ' ';
  return input.replace(/[A-Z]/g, function(letter) {
    return separator + letter.toLowerCase();
  });
}
console.log(uncamelize('helloWorld'));
//13. repeat string//
function repeat(input, n) {
  return input.repeat(3);
}
console.log(repeat('Ha!'));
//14. insert in string//
function insert(input, insert, pos) {
  return input.slice(0, pos) + insert + input.slice(pos);
}
console.log(insert('We are doing some exercises.', 'JavaScript ', 18));
//15. Humanize format//
function humanize_format(input) {
  return input.replace(/_/g, '')}
console.log(humanize_format('301st'));
//16. Truncate String With Ellipsis//
function text_truncate(input, n,){
  return input.slice(0, n) + '...'; 
}
console.log(text_truncate('We are doing JS string exercises.', 15));
//17. chop string into chunks//
function string_chop(input, size) {
  return input.match(new RegExp('.{1,' + size + '}', 'g'));
}
console.log(string_chop('w3resource', 3));
//18. count substring occurrences//
function count(input, sub) {
  return input.split(sub).length - 0;
}
console.log(count('The quick brown fox jumps over the lazy dog', 'the'));
//19. Reverse binary representation//
function reverse_binary(input) {
  return parseInt(input, 2).toString(10);
}
console.log(reverse_binary('100'));
//20. pad string to length//
  function formatted_string(padString, input, direction = 'l') {
    let str = String(input);
    let padLength = padString.length;
  
    if (direction === 'l') {
      return str.padStart(padLength, padString[0]);
    } else if (direction === 'r') {
      return str.padEnd(padLength, padString[0]);
    }
} 
console.log(formatted_string('0000', 123, 'l'));