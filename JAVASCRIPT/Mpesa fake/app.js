let balance = 12000000;

function withdrawMoney() {
    const amountInput = document.getElementById("amount");
    const message = document.getElementById("message");
    const balanceSpan = document.getElementById("balance");
    const withdrawnList = document.getElementById("withdrawn-list");
    
    let amount = parseFloat(amountInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        message.textContent = "Please enter a valid amount.";
        message.style.color = "red";
        return;
    }

    if (amount > balance) {
        message.textContent = "Insufficient funds!";
        message.style.color = "red";
    } else {
        balance -= amount;
        balanceSpan.textContent = `$${balance}`;
        message.textContent = `Successfully withdrawn $${amount}`;
        message.style.color = "green";
        
        // Add withdrawn amount to the list
        const listItem = document.createElement("li");
        listItem.textContent = `$${amount}`;
        withdrawnList.appendChild(listItem);
    }
    amountInput.value = "";
}
