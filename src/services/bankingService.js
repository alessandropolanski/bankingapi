let accounts = {};

function getBalance(accountId) {
    return accounts[accountId] || null;
}

// I've implemented an Event Handler to manage the limited types of operations available for bank accounts
function handleEvent(type, destination, origin, amount) {
    switch (type) {
        case 'deposit':
            return handleDeposit(destination, amount);
        case 'withdraw':
            return handleWithdraw(origin, amount);
        case 'transfer':
            return handleTransfer(origin, destination, amount);
        default:
            throw new Error('Event type is not supported');
    }
}

function handleDeposit(accountId, amount) {
    try {
        if (!accounts[accountId]) {
            accounts[accountId] = 0;
        }
        accounts[accountId] += amount;
        return { destination: { id: accountId, balance: accounts[accountId] } };
    } catch (error) {
        throw new Error('Deposit failed: ' + error.message);
    }
}

function handleWithdraw(accountId, amount) {
    try {
        if (!accounts[accountId] || accounts[accountId] < amount) {
            throw new Error('Insufficient funds');
        }
        accounts[accountId] -= amount;
        return { origin: { id: accountId, balance: accounts[accountId] } };
    } catch (error){
        throw new Error('Withdraw failed: ' + error.message);
    }
}

function handleTransfer(origin, destination, amount) {
    try {
        const withdrawResult = handleWithdraw(origin, amount);
        const depositResult = handleDeposit(destination, amount);
        return { origin: withdrawResult.origin, destination: depositResult.destination };
    } catch (error){
        throw new Error('Transfer failed: ' + error.message);
    }
}

function resetAccounts() {
    accounts = {}; 
}

module.exports = {
    getBalance,
    handleEvent,
    resetAccounts
};
