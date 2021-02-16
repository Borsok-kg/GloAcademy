'use strict'

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(n) {
    return n === '' || n === null || !isNaN(n);
};

// Проверяем корректность ввода месячной суммы
let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 20000); 
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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,

    asking: function() {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncom,
                cashIncom;

            do {
                itemIncom = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            } while (isString(itemIncom));

            do {
                cashIncom = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            } while (!isNumber(cashIncom));
            
            appData.income[itemIncom] = cashIncom;
        }

        let addExpenses;
        
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, такси, коммунальные расходы');
            
        } while (isString(addExpenses));

        appData.addExpenses = addExpenses.toLowerCase().split(', ');

        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let a,
                b;

                do {
                    a = prompt('Введите обязательную статью расходов?', 'На что?');
                } while (isString(a));

                do {
                    b = prompt('Во сколько это обойдется?', 2000);
                } while (!isNumber(b));
            appData.expenses[a] = Number(b);
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
    },

    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
                appData.percentDeposit = +prompt('Какой годовой процент?', 10);
            } while (!isNumber(appData.percentDeposit));

            do {
                appData.moneyDeposit = +prompt('Какая сумма заложена', 10000);
            } while (!isNumber(appData.moneyDeposit));
        }
    },

    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
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

let keyArr = appData.addExpenses.map(item => {
    let newKey = item.charAt(0).toUpperCase() + item.substr(1).toLowerCase();
    return newKey;
});

console.log(keyArr.join(', '));

for (let key in appData) {
    console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
}