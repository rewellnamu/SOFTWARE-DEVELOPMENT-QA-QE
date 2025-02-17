

//1.Create a function called verifyPassword
import bcrypt from "bcrypt";
const password = "rrrwwwll$mu";
const hashedpassword = bcrypt.hashSync(password, 10);

function verifyPassword(enteredPassword, hashedPassword) {
  return bcrypt.compareSync(enteredPassword, hashedPassword);
}
console.log(verifyPassword("rrrwwwll$mu", hashedpassword));

//2.Create a function called verifyMFA

function verifyMFA(inputMfaCode, correctMfaCode) {
  return inputMfaCode === correctMfaCode;
}

console.log(verifyMFA("100100100", "100100100"));

//3.Create a function called checkBalance

function checkBalance(balance, withdrawalAmount) {
  return balance >= withdrawalAmount;
}
console.log(checkBalance(8100, 1500));
console.log(checkBalance(500, 200));

//4. Create a function called checkDailyLimit

const dailyLimit = 10000;
const withdrawalAmount = 4000;

function checkDailyLimit(withdrawalAmount, dailyLimit) {
  if (withdrawalAmount <= dailyLimit) {
    return true;
  } else {
    return false;
  }
}

//5. Create A function called ProcessWithdrawal

function processWithdrawal(
  enteredPassword,
  inputMfaCode,
  withdrawalAmount,
  actualMfaCode,
  balance,
  dailyLimit,
  hashedPassword
) {
  //Verify password
  if (!verifyPassword(enteredPassword, hashedPassword)) {
    return "Transaction Failed: Incorrect password.";
  }

  // Verify MFA
  if (!verifyMFA(inputMfaCode, actualMfaCode)) {
    return "Transaction Failed: MFA failed.";
  }

  //Check balance
  if (!checkBalance(balance, withdrawalAmount)) {
    return "Transaction Failed: Insufficient balance.";
  }

  //Check daily limit
  if (!checkDailyLimit(withdrawalAmount, dailyLimit)) {
    return "Transaction Failed: Amount exceeds daily limit.";
  }

  //deducting the withdrawal amount
  balance -= withdrawalAmount;

  //return success message
  return "Transaction Successful.";
}


// 1.  Password Authentication:
//Importance - ensures that only authorized users can access a system.
// security advantage  - online services rely on password authentication to protect transactions.

//2.  Multi-Factor Authentication (MFA):
//How does implementing MFA enhance the security of the transaction process? 
//      -MFA adds an extra layer of security beyond just passwords, making transactions more secure.
//What types of attacks does it help prevent? 
//      -brute force, credential stuffing, phishing.

//3.  Balance Verification:
//Why is it necessary to check the account balance before allowing a withdrawal?
//            -Prevents Overdrafts & Negative Balances 
//            -Avoids Fraud & Unauthorized Transactions
//risks involved if this step is skipped? 
//            -Banking System Errors & Financial Losses
//            -Customer Disputes & Loss of Trust

//4.  Daily Transaction Limit: 
//purpose of daily transaction limit
//            -Prevents Money Laundering
//            -Prevents fraudulent transactions
//            -Enhances customer & system security
//How does it help in preventing fraudulent or excessive withdrawals? 
//            -Protects users from financial ruin due to scams
//            -Limits money that can be stolen in case of fraud
//            -Triggers fraud detection systems if unusual transactions exceed normal limits

//5.  Improvement:
//additional data that I would track to detect fraud
//            -Geolocation and IP address tracking
//            -User transaction patterns
//            - Transaction timing and frequency
//
 