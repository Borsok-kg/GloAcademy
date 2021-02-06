'use strict'

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'Freelance',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 200000,
    period = 12;

// Проверяем корректность ввода месячной суммы
let start = function() {
    do {
        money = prompt('Ваш месячный доход?'); 
    } while (!isNumber(money));
};

start();

// Считаем расходы
let expenses = [];

function getExpensesMonth() {
    let sum = [];
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', 'На что?');

        do {
            sum[i] = +prompt('Во сколько это обойдется?');
        } while (!isNumber(sum[i]));
        
    
    }

    console.log(expenses);
    return sum[0] + sum[1];
}

let expensesAmount = getExpensesMonth();

// Минусуем расходы от месячного дохода
function getAccumulatedMonth(a, b) {
    return a - b;
}

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);


// Высчитываем сколько нужно недель что бы набрать сумму 200000
function getTargetMonth(a, b) {
    return a / b;
}

// Делим остаток дохода на дни месяца
let budgetDay = accumulatedMonth / 30;

// Функция с видео
let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(`Расходы за месяц ${expensesAmount}`);
console.log(addExpenses.split(','));

if (Math.ceil(getTargetMonth(mission, accumulatedMonth)) > 0) {
    console.log(`Цель будет достигнута за ${Math.ceil(getTargetMonth(mission, accumulatedMonth))} месяцев(-а)`);
} else if (Math.ceil(getTargetMonth(mission, accumulatedMonth)) < 0) {
    console.log('Цель не будет достигнута');  
}

console.log(`Бюджет на день ${Math.floor(budgetDay)}`);

// Функция с видео
let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay <= 600 && budgetDay > 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что то пошло не так');
    }
};

getStatusIncome();