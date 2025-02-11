console.log('hi ia man');
console.log(5468);
console.log('kuku');
console.log('nyani');
console.log('mbuzi');
console.log('ngamia');
console.log('paka');
console.log('wanyama');

//1. Check if a String is a Palindrome
function isPalindrome(str) {
    const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
}
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("racecar"));
console.log(isPalindrome("hello"));

//2. Reverse a String
function reverseString(str) {
    return str.split('').reverse().join('');
}

console.log(reverseString("hello"));
console.log(reverseString("JavaScript"));
console.log(reverseString("12345"));

// 3. Find the Longest Palindromic Substring
function longestPalindrome(s) {
    if (!s || s.length < 1) return "";
    let start = 0, maxLength = 0;
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(i, i);
        let len2 = expandAroundCenter(i, i + 1);
        let len = Math.max(len1, len2);

        if (len > maxLength) {
            maxLength = len;
            start = i - Math.floor((len - 1) / 2);
        }
    }

    return s.substring(start, start + maxLength);
}
console.log(longestPalindrome("makupa"));
console.log(longestPalindrome("bandari"));
console.log(longestPalindrome("pembetatu"));
console.log(longestPalindrome("skuta"));
console.log(longestPalindrome("airbnb"));

//4. Check if Two Strings are Anagrams
function isAnagram(str1, str2) {
    str1 = str1.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    str2 = str2.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    if (str1.length !== str2.length) return false
    return str1.split('').sort().join('') === str2.split('').sort().join('');
}
console.log(isAnagram("listen", "silent"));
console.log(isAnagram("hello", "world"));
console.log(isAnagram("anagram", "nagaram"));
console.log(isAnagram("rat", "car"));
console.log(isAnagram("Debit Card", "Bad Credit"));

//5. Remove Duplicates from a String
function removeDuplicates(str) {
    let seen = new Set();
    let result = "";
    for (let char of str) {
        if (!seen.has(char)) {
            seen.add(char);
            result += char;
        }
    }
    return result;
}
console.log(removeDuplicates("banana"));
console.log(removeDuplicates("hello world"));
console.log(removeDuplicates("aabbccddeeff"));
console.log(removeDuplicates("abcabcabc"));

//6. Count Palindromes in a String
function countDistinctPalindromes(s) {
    let palindromes = new Set();

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            palindromes.add(s.substring(left, right + 1)); // Store the palindrome substring
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);
        expandAroundCenter(i, i + 1);
    }
     return palindromes.size;
}
console.log(countDistinctPalindromes("abba"));
console.log(countDistinctPalindromes("aaa"));
console.log(countDistinctPalindromes("abc"));
console.log(countDistinctPalindromes("racecar"));

//7. Longest Common Prefix
function longestCommonPrefix(strs) {
    if (!strs.length) return "";

    let prefix = strs[0]; // Assume the first string is the prefix

    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1); // Reduce the prefix until it matches
            if (!prefix) return ""; // No common prefix
        }
    }
    return prefix;
}
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));
console.log(longestCommonPrefix(["interspecies", "interstellar", "interstate"]));
console.log(longestCommonPrefix(["apple", "ape", "april"]));
console.log(longestCommonPrefix([]));

//8. Case Insensitive Palindrome
function isPalindrome(str) {
    const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
}
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("RaceCar"));
console.log(isPalindrome("No 'x' in Nixon"));
console.log(isPalindrome("hello"));
console.log(isPalindrome("Was it a car or a cat I saw"));
