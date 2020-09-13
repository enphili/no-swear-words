'use strict';

const textInput = document.getElementById('inp'), // поле для ввода теста
      textOut = document.getElementById('out'), // поле для вывода результата
      checkBtn = document.querySelector('.button-primary.button-round'), // кнопка по нажатию которой буде проведена проверка
      swearWords = document.getElementById('matslov'), // поле для показа списка матерных слов
      addWordInput = document.getElementById('maretslovo'), // инпут вывода добавляемого слова
      addWordBtn = document.querySelector('.addtobase-btm'); // кнопка добавления слова в базу

let words = {"mat":[]}; // временная

// получение слов из базы
const fetchApp = () => {
  fetch('/app.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(words)
  })
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.mat.length; i++) {
        if (!words.mat.includes(data.mat[i])) {
          words.mat.push(data.mat[i]); //запись слов из базы в переменную
        }
      }
      swearWords.value = words.mat.join(', '); // вывод слов
    })
    .catch(err => {throw err;});
};

// проверка слов на мат
const checkWords = () => {
	let text = textInput.value; // введеный в textarea текст в переменную
  // переберем все матерные слова и найдем их в тексте
  for (let i = 0; i < words.mat.length; i++) {
    while (text.indexOf(words.mat[i]) != -1) {
      text = text.replace(words.mat[i], start(words.mat[i].length));
    }
  }
  textOut.value = text; // вывод результата
};

// подстановка n-количиства звездочек в зависимости от количества букв в матерном слове
const start = n => {
  let out = '';
  for (let i=0; i<n; i++) {
    out += '*';
  }
  return out;
};

// сброс выделения
const clearSelection = () => {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else { // старый IE
    document.selection.empty();
  }
};

// вывод выделенного слова в специальный инпут
const prepareWordToAdd = () => {
	// addWordImput.value = document.getSelection().toString(); // работает не во всех браузерах
	addWordInput.value = textOut.value.substring(textOut.selectionStart, textOut.selectionEnd).trim();
};

// добавление слова в базу
const addWordToBD = () => {
	if (addWordInput.value != '' && addWordInput.value != ' ' && addWordInput.value != '*') {
    if (!words.mat.includes(addWordInput.value)) {
      words.mat.push(addWordInput.value);
      fetchApp();
    }
  }
    clearSelection();
    addWordInput.value = '';
};

const init = () => {
	fetchApp();
	checkBtn.addEventListener('click', checkWords);
	addWordBtn.addEventListener('click', addWordToBD);
	textOut.addEventListener('select', prepareWordToAdd);
};

init();
