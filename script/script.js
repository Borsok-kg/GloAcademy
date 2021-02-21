'use strict'

let start = document.getElementById('start'),
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
    incomeItem = document.querySelectorAll('.income-items');


let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(n) {
    return n === '' || n === null || !isNaN(n);
};
    
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
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getTargetMonth();
        // appData.getStatusIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();

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
        for (let key in appData.expenses){
            sum += appData.expenses[key];
        }
        appData.expensesMonth = sum;
        return sum;
    },
    getBudget: function () { 
        appData.budgetMonth = +appData.budget + appData.incomeMonth - +appData.getExpensesMonth();
        appData.budgetDay = +appData.budgetMonth / 30;
    },
    getTargetMonth: function(){
        return +targetAmount.value / +appData.budgetMonth;
    },
    // getStatusIncome: function() {
    //     if (appData.budgetDay >= 1200) {
    //         console.log('У вас высокий уровень дохода');
    //     } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
    //         console.log('У вас средний уровень дохода');
    //     } else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
    //         console.log('К сожалению у вас уровень дохода ниже среднего');
    //     } else {
    //         console.log('Что то пошло не так');
    //     }
    // },
    // getInfoDeposit: function() {
    //     if (appData.deposit) {
    //         do {
    //             appData.percentDeposit = +prompt('Какой годовой процент?', 10);
    //         } while (!isNumber(appData.percentDeposit));
    //         do {
    //             appData.moneyDeposit = +prompt('Какая сумма заложена', 10000);
    //         } while (!isNumber(appData.moneyDeposit));
    //     }
    // },
    vievPeriod: function() {
        periodAmount.innerHTML = `${periodSelect.value}`;
    },
    calcPeriod: function () {   
        return appData.budgetMonth * periodSelect.value;
    },

};

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.vievPeriod);


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

document.addEventListener('input', function() {
    let names = document.querySelectorAll('[placeholder="Наименование"]'),
        amount = document.querySelectorAll('[placeholder="Сумма"]');
        for(let i = 0; i < names.length; i++) {
            names[i].value = names[i].value.replace(/[^А-Яа-яЁё .,]/g, '');
        }
        for(let i = 0; i < amount.length; i++) {
            amount[i].value = amount[i].value.replace(/[^+\d]/g, '');
        }
});

// if (appData.getTargetMonth() > 0) {
//     console.log(`Цель будет достигнута за ${appData.getTargetMonth()} месяцев(-а)`);
// } else if (appData.getTargetMonth() < 0) {
//     console.log('Цель не будет достигнута');  
// }

// let keyArr = appData.addExpenses.map(item => {
//     let newKey = item.charAt(0).toUpperCase() + item.substr(1).toLowerCase();
//     return newKey;
// });

// console.log(keyArr.join(', '));
