'use strict'

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Проверяем корректность ввода месячной суммы
let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', '20000'); 
        } while (!isNumber(money));
    };

start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,

    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кварплата');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < 2; i++) {
                let a = prompt('Введите обязательную статью расходов?', 'На что?'),
                    b;
                    do {
                        b = +prompt('Во сколько это обойдется?', '2000');
                    } while (!isNumber(b));
                appData.expenses[a] = b;
            }

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
        appData.budgetMonth = appData.budget - appData.getExpensesMonth();
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function(){
        return  Math.ceil(appData.mission / appData.budgetMonth);
    },

    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log('Что то пошло не так');
        }
    }
};



appData.asking();

console.log('Расходы за месяц ', appData.getExpensesMonth());

appData.getBudget();

appData.getTargetMonth();

if (appData.getTargetMonth() > 0) {
    console.log(`Цель будет достигнута за ${appData.getTargetMonth()} месяцев(-а)`);
} else if (appData.getTargetMonth() < 0) {
    console.log('Цель не будет достигнута');  
}

appData.getStatusIncome();

for (let key in appData) {
    console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
}