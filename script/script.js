let money = 15000,
    income = 30000,
    addExpenses = 'Интернет 1000, коммуналка 5000, развлечения 10000, плюшки 10000',
    deposit = true,
    mission = 2000000,
    period = 12,
    budgetDay = 45000 / 30;

console.log(money);
console.log(income);
console.log(deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель зарабоать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);