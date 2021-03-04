'use strict'

let start = document.getElementById('start'),
    cancel = document.querySelector('#cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelectorAll('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    incomeItem = document.querySelectorAll('.income-items'),
    names = document.querySelectorAll('[placeholder="Наименование"]'),
    amount = document.querySelectorAll('[placeholder="Сумма"]'),
    possibleCosts = document.querySelector('[placeholder="название"]');


let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(n) {
    return n === '' || n === null || !isNaN(n);
};
    
start.setAttribute('disabled', 'disabled');
start.style.opacity = '0.2';
let disable = function(){
    if(salaryAmount.value.length >= 1) {
        start.removeAttribute('disabled');
        start.style.opacity = '1';
    } else {
            start.setAttribute('disabled', 'disabled');
            start.style.opacity = '0.2';
    }
};
salaryAmount.addEventListener('keyup', disable);

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,

    start: function() {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getTargetMonth();
        this.getBudget();
        this.showResult();
    },

    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = periodSelect.value * appData.budgetMonth;
        });
    },

    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 2) {
            expensesItems[1].querySelector('.expenses-title').value = '';
            expensesItems[1].querySelector('.expenses-amount').value = '';
        } else if (expensesItems.length === 3) {
            expensesItems[2].querySelector('.expenses-title').value = '';
            expensesItems[2].querySelector('.expenses-amount').value = '';
        }
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },

    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
            if (appData.blocked === true) {
                item.setAttribute('disabled', 'disabled');
                item.style.opacity = '0.3';
            }
        });
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item =item.trim();
            if(item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    addIncomeBlock: function() {
        let cloneIncomItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 2) {
            incomeItem[1].querySelector('.income-title').value = '';
            incomeItem[1].querySelector('.income-amount').value = '';
        } else if (incomeItem.length === 3) {
            incomeItem[2].querySelector('.income-title').value = '';
            incomeItem[2].querySelector('.income-amount').value = '';
        }
        if(incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    },

    getIncome: function() {
        incomeItem.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = +cashIncome;
                }
        });
    },

    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (item !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function () {  
        let sum = 0;
        for (let key in this.expenses){
            sum += this.expenses[key];
        }
        this.expensesMonth = sum;
        return sum;
    },

    getBudget: function () { 
        this.budgetMonth = +this.budget + this.incomeMonth - +this.getExpensesMonth();
        this.budgetDay = +this.budgetMonth / 30;
    },

    getTargetMonth: function(){
        return +targetAmount.value / +this.budgetMonth;
    },

    vievPeriod: function() {
        periodAmount.innerHTML = `${periodSelect.value}`;
    },

    calcPeriod: function () {   
        return this.budgetMonth * periodSelect.value;
    },
    
    blocked: function() {
        names = document.querySelectorAll('[placeholder="Наименование"]');
        amount = document.querySelectorAll('[placeholder="Сумма"]');
        possibleCosts.setAttribute('disabled', 'disabled');
        possibleCosts.style.opacity = '0.3';
        incomePlus.setAttribute('disabled', 'disabled');
        expensesPlus.setAttribute('disabled', 'disabled');
        names.forEach(function(item) {
            item.setAttribute('disabled', 'disabled');
            item.style.opacity = '0.3';
        });
        amount.forEach(function(item) {
            item.setAttribute('disabled', 'disabled');
            item.style.opacity = '0.3';
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    },

    reset: function() {
        names = document.querySelectorAll('[placeholder="Наименование"]');
        amount = document.querySelectorAll('[placeholder="Сумма"]');
        possibleCosts.removeAttribute('disabled', 'disabled');
        possibleCosts.style.opacity = '1';
        incomePlus.removeAttribute('disabled', 'disabled');
        expensesPlus.removeAttribute('disabled', 'disabled');
        names.forEach(function(item) {
            item.removeAttribute('disabled', 'disabled');
            item.style.opacity = '1';
        });
        amount.forEach(function(item) {
            item.removeAttribute('disabled', 'disabled');
            item.style.opacity = '1';
        });
        start.style.display = 'block';
        cancel.style.display = 'none';
        let inputText = document.querySelectorAll('[type="text"]');
        inputText.forEach(function(item) {
            item.value = '';
        });
        periodSelect.value = '1';
        periodAmount.innerHTML = '1';
        disable();
    }

};

start.addEventListener('click', appData.start.bind(appData));
start.addEventListener('click', appData.blocked.bind(appData));

cancel.addEventListener('click', appData.reset);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.vievPeriod);

document.addEventListener('input', function() {
        for(let i = 0; i < names.length; i++) {
            names[i].value = names[i].value.replace(/[^А-Яа-яЁё .,]/g, '');
            possibleCosts.value = possibleCosts.value.replace(/[^А-Яа-яЁё .,]/g, '');
        }
        for(let i = 0; i < amount.length; i++) {
            amount[i].value = amount[i].value.replace(/[^+\d]/g, '');
        }
});
