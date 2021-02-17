'use strict'

const books = document.querySelector('.books'),
      book = document.querySelectorAll('.book'),
      book2 = book[0].querySelectorAll('li'),
      book5 = book[5].querySelectorAll('li'),
      book6 = book[2].querySelectorAll('li'),
      title = books.querySelectorAll('h2 a'),
      advertising = document.querySelector('.adv'),
      background = document.body;

books.prepend(book[1]);
book[2].before(book[4]);
book[5].after(book[2]);

background.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

title[4].textContent = 'Книга 3. this и Прототипы Объектов';

advertising.remove();

book2[9].after(book2[2]);
book2[3].after(book2[8]);
book2[3].after(book2[6]);

book5[3].before(book5[9]);
book5[4].after(book5[2]);
book5[8].before(book5[5]);

const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
book6[8].append(newElem);