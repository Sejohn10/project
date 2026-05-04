const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


//start from storage or empty
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];


form.addEventListener('submit', function(e) {
e.preventDefault();   //stop refresh
alert("sucessfully added")

const transaction = {
id: Date.now(),
text: text.value,
amount: +amount.value
};

transactions.push(transaction);
updateLocalStorage();
addTransactionDOM(transaction);
updateValues();

text.value = '';
amount.value = '';
});

// Add to DOM
function addTransactionDOM(transaction) {
const sign = transaction.amount < 0 ? '-' : '+';

const item = document.createElement('li');
item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

item.innerHTML = `
${transaction.text}
<span>${sign}Rs.${Math.abs(transaction.amount)}</span>
<button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
`;

list.appendChild(item);
}

// Update balance
function updateValues() {
const amounts = transactions.map(t => t.amount);

const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
const inc = amounts.filter(a => a > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
const exp = amounts.filter(a => a < 0).reduce((acc, item) => acc + item, 0).toFixed(2);

balance.innerText = `Rs. ${total}`;
income.innerText = `+Rs. ${inc}`;
expense.innerText = `Rs. ${exp}`;
}

// Remove transaction
function removeTransaction(id) {
transactions = transactions.filter(t => t.id !== id);
updateLocalStorage();
init();
alert("Are you sure you want to delete?")
}

// Save to localStorage
function updateLocalStorage() {
localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
list.innerHTML = '';
transactions.forEach(addTransactionDOM);
updateValues();
}

init();

