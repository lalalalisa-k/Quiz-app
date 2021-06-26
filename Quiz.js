'use strict';
const url = 'https://opentdb.com/api.php?amount=10';
const quizNumber = document.getElementById('question-number');
const quizGenre = document.getElementById('quiz-genre');
const quizDifficulty = document.getElementById('quiz-difficulty');
const quizQuestion = document.getElementById('quiz-list');
const table = document.createElement('table');
const quizOptionsContainer = document.getElementById('answers-container');
const loader = document.getElementById('loader-message');
const title = document.getElementById('title-message');
const answersContainer = document.getElementById('answers-container');
const start = document.getElementById('start-button');
const acceptingAnswers = true;

let countNum = 0;
let questionCounter = 0;
//let quizCount = count + 1;
let score = 0;

class Quiz {
  constructor(quizData) {
    this.quizzes = quizData.results;
  }

  getQuestion(index) {
    return this.quizzes[index - 1].question;
  }

  getNumOfQuiz(index) {
    return this.quizzes[index - 1];
  }

  getQuizCategory(index) {
    return this.quizzes[index - 1].category;
  }

  getQuizDifficulty(index) {
    return this.quizzes[index - 1].difficulty;
  }

  getCorrectanswer(index) {
    return this.quizzes[index - 1].correct_answer;
  }

  getIncorrectanswers(index) {
    return this.quizzes[index - 1].incorrect_answers;
  }
}

start.addEventListener('click', (index) => {
  //upload();

  displayLoading();
  start.style.display = "none";

  fetch(url)
    .then(response => {
      removeLoading();
      return response.json();
    })
    .then((data) => {
      const quizInstance = new Quiz(data);
      getNewQuestion(quizInstance, index);
      setQuiz(quizInstance, index);
    })
    .catch((e) => {
      console.log(e) //エラー
    })
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

const getNewQuestion = (quizInstance, index) => {
  setQuiz(quizInstance, index);

};

const setQuiz = (quizInstance, index) => {
  const quizzListContainer = document.getElementById('quiz-list');
  const fragment = document.createDocumentFragment();
  const answerLabel = document.getElementById('answers-container');

  const quizArray = quizInstance.quizzes;

  quizNumber.innerHTML = `問題${index}`;
  quizGenre.innerHTML = `[ジャンル]${quizInstance.getQuizCategory(1)}`;
  quizDifficulty.innerHTML = `[難易度]${quizInstance.getQuizDifficulty(1)}`;
  quizQuestion.innerHTML = `【クイズ】${quizInstance.getQuestion(1)}`;
  quizOptionsContainer.innerHTML = '';

  const quizOptions = [];
  quizOptions.push(quizInstance.getCorrectanswer(1));
  quizOptions.push(...quizInstance.getIncorrectanswers(1));



  Object.keys(quizOptions).forEach(function (key) {
    const btnContainer = document.createElement("p");
    answerLabel.appendChild(btnContainer);

    const optionBtn = document.createElement("button");
    btnContainer.appendChild(optionBtn);
    optionBtn.innerHTML = quizOptions[key];
    btnContainer.appendChild(optionBtn);
    answerLabel.appendChild(btnContainer);

    optionBtn.addEventListener('click', () => {
      if (optionBtn.innerHTML = quizInstance.getCorrectanswer(1))
      {
        console.log('correct!!! your score is ' + score);
        console.log(quizInstance.getCorrectanswer(1));
        console.log(optionBtn.innerHTML);
        score++;
      } else
      {
        console.log('wrong!!!');
      }
    })
  })


  console.log(quizInstance);
  console.log(quizInstance.quizzes);
  console.log("[問題]" + quizInstance.getNumOfQuiz(1));
  console.log(quizInstance.getCorrectanswer(1));
  console.log(quizInstance.getIncorrectanswers(1));
  console.log(quizArray);
  console.log(quizOptions);

}

const upload = () => {
  //displayLoading();
  loader.innerHTML = "少々お待ちください";
  title.innerHTML = "取得中";

  removeLoading();
}

const finishQuiz = () => {
  title.innerText = 'あなたの正解数は${}です！！';
  loader.innerText = '再度チャレンジしたい場合は以下をクリック！';

  const returnBtn = document.createElement('button');
  returnBtn.innerText = 'ホームに戻る';
  answersContainer.appendChild(returnBtn);
  returnBtn.addEventListener('click', () => {

  })
}



