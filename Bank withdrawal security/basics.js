// Create a function called verifyPassword
function verifyPassword(inputPassword, storedHashedPassword) {
    if (bcrypt.compare(inputPassword, storedHashedPassword) === true) {
        return true;
    } else {
        return false;
    }
}

// Create a function called verifyMFA
function verifyMFA(inputMfaCode, correctMfaCode) {
    if (inputMfaCode === correctMfaCode) {
        return true;
    } else {
        return false;
    }
}

// Create a function called checkBalance
function checkBalance(balance, withdrawalAmount) {
    if (balance >= withdrawalAmount) {
        return true;
    } else {
        return false;
    }
}

// Create a function called checkDailyLimit
function checkDailyLimit(withdrawalAmount, dailyLimit) {
    if (withdrawalAmount <= dailyLimit) {
        return true;
    } else {
        return false;
    }
}

// Create a function called processWithdrawal		
function processWithdrawal(user, inputPassword, inputMfaCode, withdrawalAmount, dailyLimit) {
    if (verifyPassword(inputPassword, user.hashedPassword) === false) {
        return "Transaction Failed: Incorrect Password.";
    }

    if (verifyMFA(inputMfaCode, user.correctMfaCode) === false) {
        return "Transaction Failed: MFA failed.";
    }

    if (checkBalance(user.balance, withdrawalAmount) === false) {
        return "Transaction Failed: Insufficient Balance.";
    }

    if (checkDailyLimit(withdrawalAmount, dailyLimit) === false) {
        return "Transaction Failed: Amount exceeds daily limit.";
    }

    user.balance -= withdrawalAmount;
    return "Transaction Successful! New balance: " + user.balance;
}
// 1. Password Authentication
//		*Importance of hashed passwords
//With hashed passwords attackers cannot obtain the original txt of your password.
//passwords hashed using strong algorithms are hard to crack
//It prevents potential misuse or leaks by insiders.
//
//2. Multi-Factor Authentication (MFA)
//It acts as an extra 'gate' of verification beyond just a password or username.
//MFA helps protect weak passwords, phishing attaks.
//Prevents man in the middle attacks and attacks such as stuffing credentials.

//3. Balance Verification
//		*Importance of Balance Verification
// A customer can't withdraw more money than they have, Protects customers from unnecessary charges due to insufficient funds.
//Ensures that users cannot withdrawi non-existent funds.
//helps to keep accurate records and ensures funds are available for all transactions.
//		*Consequences of skipping this process
//accounts may go into overdraft if this process is skipped.
//malicious users can exploit the system to withdraw more money than they should be allowed.
//If a customers experinces faulty system failures, they may lose confidence with a company.


//4. Daily Transaction Limit
//		*Purposes of Daily Transaction Limit
//It restricts the amount that can be stolen in an account incase of unauthorized access.
//helps prevent large-scale financial fraud.
//		*How Daily Transaction Limit prevent fraudulent transactions
//users are able to review large transactions and verify before proceeding.
//If a hacker gains access to an account, they can only withdraw a limited amount per day, reducing potential losses.
//Ensures that even if a card or account is compromised, the damage is minimized.
//Multiple failed attempts to exceed the limit may trigger fraud detection systems.

//5. Improvemenst I would emphasize on
//I would point on Past withdrawals to detect unusual amounts.
//transactions made at odd hours are a red flag.
//Tracking where withdrawals occur to detect foreign involvment.
//checking on spending Patterns and habits of a user.