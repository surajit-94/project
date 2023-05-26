
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];


function renderExpenses() {
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';

  expenses.forEach(function (expense) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.amount}</td>
      <td><button class="btn btn-danger btn-sm deleteBtn" data-id="${expense.id}">Delete</button></td>
    `;
    expenseList.appendChild(row);
  });
}

function addExpense(name, amount) {
  const expense = {
    id: Date.now(),
    name: name,
    amount: amount
  };

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

function deleteExpense(id) {
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}


document.getElementById('expenseForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const expenseName = document.getElementById('expenseName').value;
  const expenseAmount = document.getElementById('expenseAmount').value;

  addExpense(expenseName, expenseAmount);

  document.getElementById('expenseName').value = '';
  document.getElementById('expenseAmount').value = '';
});

document.getElementById('expenseList').addEventListener('click', function (e) {
  if (e.target.classList.contains('deleteBtn')) {
    const expenseId = parseInt(e.target.getAttribute('data-id'));
    deleteExpense(expenseId);
  }
});

renderExpenses();

function editExpense(id) {
  const expense = expenses.find(function (expense) {
    return expense.id === id;
  });

  if (expense) {
    const expenseName = prompt('Enter the updated expense name:', expense.name);
    const expenseAmount = prompt('Enter the updated expense amount:', expense.amount);

    expense.name = expenseName;
    expense.amount = expenseAmount;

    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  }
}

function renderExpenses() {
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';

  expenses.forEach(function (expense) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.amount}</td>
      <td>
        <button class="btn btn-primary btn-sm editBtn" data-id="${expense.id}">Edit</button>
        <button class="btn btn-danger btn-sm deleteBtn" data-id="${expense.id}">Delete</button>
      </td>
    `;
    expenseList.appendChild(row);
  });
}

document.getElementById('expenseList').addEventListener('click', function (e) {
  if (e.target.classList.contains('editBtn')) {
    const expenseId = parseInt(e.target.getAttribute('data-id'));
    editExpense(expenseId);
  }
});




