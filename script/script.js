'use strict'

const start = document.getElementById('start'),
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
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    depositLabel = document.querySelector('.deposit-label'),
    possibleCosts = document.querySelector('[placeholder="название"]');


let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    names = document.querySelectorAll('[placeholder="Наименование"]'),
    depositPercent = document.querySelector('.deposit-percent'),
    a,
    amount = document.querySelectorAll('[placeholder="Сумма"]');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(n) {
    return n === '' || n === null || !isNaN(n);
};
    
start.setAttribute('disabled', 'true');
start.style.opacity = '0.2';
const disable = function(){
    if(salaryAmount.value.length >= 1) {
        start.removeAttribute('disabled');
        start.style.opacity = '1';
    } else {
            start.setAttribute('disabled', 'true');
            start.style.opacity = '0.2';
    }
};
salaryAmount.addEventListener('keyup', disable);

class AppData {
    constructor() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0; 
    }

    start() {
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getAddExpInc(additionalIncomeItem, this.addIncome);
        this.getAddExpInc(additionalExpensesItem.value.split(','), this.addExpenses);
        this.getTargetMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();
    }

    showResult() {
        let _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = periodSelect.value * _this.budgetMonth;
        });
    }  

    getExpInc() {
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
        for (let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    }

    addExpInc(btn, wrapper, wrapperClass) {
        let cloneItem = wrapper[0].cloneNode(true);
        wrapper[0].parentNode.insertBefore(cloneItem, btn);
        wrapper = document.querySelectorAll(`${wrapperClass}`);
        let wrapperClassName = wrapper[0].className.split('-')[0];
        if(wrapper.length === 2) {
            wrapper[1].querySelector(`.${wrapperClassName}-title`).value = '';
            wrapper[1].querySelector(`.${wrapperClassName}-amount`).value = '';
        } else if (wrapper.length === 3) {
            wrapper[2].querySelector(`.${wrapperClassName}-title`).value = '';
            wrapper[2].querySelector(`.${wrapperClassName}-amount`).value = '';
        }
        if(wrapper.length === 3) {
            btn.style.display = 'none';
        }
    }

    getAddExpInc(elem, arr) {
        const count = (item) => {
            if (typeof item === 'object' && item.value) {
                
                arr.push(item.value.trim());
            }
            if (typeof item === 'string' && item) {
                arr.push(item.trim());
            }
        };
        elem.forEach(count);
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = +this.budgetMonth / 30;
    }

    getTargetMonth() {
        return +targetAmount.value / +this.budgetMonth;
    }

    vievPeriod() {
        periodAmount.innerHTML = `${periodSelect.value}`;
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    blocked() {
        names = document.querySelectorAll('[placeholder="Наименование"]');
        amount = document.querySelectorAll('[placeholder="Сумма"]');
        possibleCosts.setAttribute('disabled', 'true');
        possibleCosts.style.opacity = '0.3';
        incomePlus.style.display = 'none';
        expensesPlus.style.display = 'none';
        names.forEach(function(item) {
            item.setAttribute('disabled', 'true');
            item.style.opacity = '0.3';
        });
        amount.forEach(function(item) {
            item.setAttribute('disabled', 'true');
            item.style.opacity = '0.3';
        });
        depositPercent.setAttribute('disabled', 'true');
        depositPercent.style.opacity = '0.3';
        depositCheck.setAttribute('disabled', 'true');
        depositCheck.style.opacity = '0.3';
        depositBank.setAttribute('disabled', 'true');
        depositLabel.style.opacity = '0.3';
        start.style.display = 'none';
        cancel.style.display = 'block';
    }

    reset() {
        names = document.querySelectorAll('[placeholder="Наименование"]');
        amount = document.querySelectorAll('[placeholder="Сумма"]');
        possibleCosts.removeAttribute('disabled');
        possibleCosts.style.opacity = '1';
        incomePlus.style.display = 'block';
        expensesPlus.style.display = 'block';
        names.forEach(function(item) {
            item.removeAttribute('disabled');
            item.style.opacity = '1';
        });
        amount.forEach(function(item) {
            item.removeAttribute('disabled');
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
        incomeItems.forEach(function() {
            if (incomeItems.length === 2) {
                incomeItems[1].remove();
            } else if (incomeItems.length === 3) {
                incomeItems[1].remove();
                incomeItems[2].remove();
            }
        });
        expensesItems.forEach(function() {
            if (expensesItems.length === 2) {
                expensesItems[1].remove();
            } else if (expensesItems.length === 3) {
                expensesItems[1].remove();
                expensesItems[2].remove();
            }
        });
        depositPercent.removeAttribute('disabled');
        depositPercent.style.opacity = '1';
        depositCheck.removeAttribute('disabled');
        depositCheck.style.opacity = '1';
        depositCheck.checked = false;
        depositBank.removeAttribute('disabled');
        depositLabel.style.opacity = '1';
        depositPercent.style.display = 'none';
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
        disable();
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }

    corectPercent() {
        if (depositPercent.value <= 0 || depositPercent.value >= 101) {
            depositPercent.focus();
            alert('Введите корректное значение в поле проценты');
            start.setAttribute('disabled', 'true');
            start.style.opacity = '0.2';
        } else {
            this.percentDeposit = depositPercent.value;
            disable();
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositPercent.style.display = 'none';
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventListener() {
        start.addEventListener('click', this.start.bind(this));
        start.addEventListener('click', this.blocked.bind(this));
        
        cancel.addEventListener('click', this.reset);
        
        expensesPlus.addEventListener('click', this.addExpInc.bind(null, expensesPlus, expensesItems, '.expenses-items'));
        incomePlus.addEventListener('click', this.addExpInc.bind(null, incomePlus, incomeItems, '.income-items'));
        periodSelect.addEventListener('input', this.vievPeriod);
        
        document.addEventListener('input', function() {
                for(let i = 0; i < names.length; i++) {
                    names[i].value = names[i].value.replace(/[^А-Яа-яЁё .,]/g, '');
                    possibleCosts.value = possibleCosts.value.replace(/[^А-Яа-яЁё .,]/g, '');
                }
                for(let i = 0; i < amount.length; i++) {
                    amount[i].value = amount[i].value.replace(/[^+\d]/g, '');
                }
        });

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositPercent.addEventListener('change', this.corectPercent.bind(this));
    }
}

const appData = new AppData();

appData.eventListener();

