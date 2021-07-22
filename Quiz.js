'use strict';
const URL = 'https://opentdb.com/api.php?amount=10';
const quizNumber = document.getElementById('question-number');
const quizGenre = document.getElementById('quiz-genre');
const quizDifficulty = document.getElementById('quiz-difficulty');
const quizQuestion = document.getElementById('quiz-list');
const table = document.createElement('table');
const quizOptionsContainer = document.getElementById('answers-container');
const loader = document.getElementById('loader-message');
const title = document.getElementById('title-message');
const start = document.getElementById('start-button');
let score = 0;

class Quiz {
  constructor(quizData) {
    this.quizzes = quizData.results;
  }

  getQuestion(index) {
    return this.quizzes[index - 1].question;
  }

  getQuizCategory(index) {
    return this.quizzes[index - 1].category;
  }

  getQuizDifficulty(index) {
    return this.quizzes[index - 1].difficulty;
  }

  getCorrectAnswers(index) {
    return this.quizzes[index - 1].correct_answer;
  }

  getIncorrectAnswers(index) {
    return this.quizzes[index - 1].incorrect_answers;
  }
}

const getQuizData = async () => {
  try
  {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }
  catch (err)
  {
    console.log(err)
  }
}
getQuizData()
  .then(quizData => {
    const quizInstance = new Quiz(quizData);
    setQuiz(quizInstance, 1);
})

start.addEventListener('click', () => {

  displayLoading();
  start.style.display = "none";

});

const displayLoading = () => {
  loader.innerHTML = "少々お待ちください";
  title.innerHTML = "取得中";
}

const removeLoading = () => {
  const loader = document.getElementById('loader-message');
  loader.innerHTML = "";

  const title = document.getElementById('title-message');
  title.innerHTML = "";
}

const doReload = () => {
  window.location.reload();
}

const getNewQuestion = (quizInstance, index) => {
  if (index - 1 === quizInstance.quizzes.length)
  {
    finishQuiz();
  } else
  {
    setQuiz(quizInstance, index);
  }
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

const setQuiz = (quizInstance, index) => {
  const answerLabel = document.getElementById('answers-container');
  quizNumber.innerHTML = `問題${index}`;
  quizGenre.innerHTML = `[ジャンル]${quizInstance.getQuizCategory(index)}`;
  quizDifficulty.innerHTML = `[難易度]${quizInstance.getQuizDifficulty(index)}`;
  quizQuestion.innerHTML = `【クイズ】${quizInstance.getQuestion(index)}`;
  quizOptionsContainer.innerHTML = '';

  const quizOptions = [];
  quizOptions.push(quizInstance.getCorrectAnswers(index));
  quizOptions.push(...quizInstance.getIncorrectAnswers(index));

  const shuffledChoices = shuffle(quizOptions);

  Object.keys(shuffledChoices).forEach(function (key) {
    const btnContainer = document.createElement("p");
    answerLabel.appendChild(btnContainer);
    const optionBtn = document.createElement("button");
    btnContainer.appendChild(optionBtn);
    optionBtn.innerHTML = quizOptions[key];
    optionBtn.addEventListener('click', () => {
      answerLabel.removeChild(btnContainer);
      btnContainer.removeChild(optionBtn);
      quizOptionsContainer.innerHTML = '';

      if (optionBtn.innerHTML === quizInstance.getCorrectAnswers(index))
      {
        score = score + 1;
      }
      index = index + 1;
      getNewQuestion(quizInstance,index);

    });
    btnContainer.appendChild(optionBtn);
    answerLabel.appendChild(btnContainer);
  })
}

const finishQuiz = () => {
  quizNumber.innerHTML = '';
  quizGenre.innerHTML = '';
  quizDifficulty.innerHTML = '';
  quizQuestion.innerHTML = '再度チャレンジしたい場合は以下をクリック！';
  title.innerText = `あなたの正解数は${score}です！！`;

  const returnBtn = document.createElement('button');
  returnBtn.innerText = 'ホームに戻る';
  quizOptionsContainer.appendChild(returnBtn);
  returnBtn.addEventListener('click', () => {
    doReload();
  })
}



