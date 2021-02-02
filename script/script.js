let money = +prompt('Ваш месячный доход?'),
    income = 'Freelance',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 200000,
    period = 12,
    expenses1 = prompt('Введите обязательную статью расходов?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    amount2 = +prompt('Во сколько это обойдется?'),
    budgetMonth = money - amount1 - amount2;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses);
console.log(addExpenses.toLowerCase().split(', '));
console.log(`Бюджет на месяц: ${budgetMonth}`);

let howMonths = mission / budgetMonth;

console.log(`Цель будет достигнута за ${Math.ceil(howMonths)} месяцев(-а)`);

let budgetDay = budgetMonth / 30;

console.log(`Бюджет на день ${Math.floor(budgetDay)}`);

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}