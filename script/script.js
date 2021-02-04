'use strict'

let money = +prompt('Ваш месячный доход?'),
    income = 'Freelance',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 200000,
    period = 12,
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?');

// Считаем расходы
function getExpensesMonth(a, b) {
    return a + b;
}

// Минусуем расходы от месячного дохода
function getAccumulatedMonth(a, b) {
    return a - b;
}

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));


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

console.log(`Расходы за месяц ${getExpensesMonth(amount1, amount2)}`);
console.log(addExpenses.split(','));
console.log(`Цель будет достигнута за ${Math.ceil(getTargetMonth(mission, accumulatedMonth))} месяцев(-а)`);
console.log(`Бюджет на день ${Math.floor(budgetDay)}`);

// Функция с видео
let getStatusIncome = function() {
    if (budgetDay > 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay > 600 && budgetDay < 1200) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay > 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что то пошло не так');
    }
};

getStatusIncome();