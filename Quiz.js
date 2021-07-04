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
//const answersContainer = document.getElementById('answers-container');
const start = document.getElementById('start-button');
const acceptingAnswers = true;

let currentNum = 0;
let isAnswered;
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
    return this.quizzes.length[index - 1];
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
    .then((data, index) => {
      const quizInstance = new Quiz(data);
      //getNewQuestion(quizInstance, index);
      setQuiz(quizInstance, index);
    })
    .catch((e) => {
      console.log(e)
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
/*
const checkAnswer = (quizInstance,optionBtn) => {
  if (optionBtn.innerHTML = quizInstance.getCorrectanswer(1)){
    optionBtn.classList.add('correct');
  } else{
    optionBtn.classList.add('wrong');
  }

//  if (isAnswered) {
//    return;
//  }
//  isAnswered = true;
} */

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

const setQuiz = (quizInstance, index, currentNum) => {
  const answerLabel = document.getElementById('answers-container');
  //quizNumber.innerHTML = `問題${quizInstance.getNumOfQuiz(1)}`;
  quizNumber.innerHTML = `問題${index}`;
  quizGenre.innerHTML = `[ジャンル]${quizInstance.getQuizCategory(1)}`;
  quizDifficulty.innerHTML = `[難易度]${quizInstance.getQuizDifficulty(1)}`;
  quizQuestion.innerHTML = `【クイズ】${quizInstance.getQuestion(1)}`;
  quizOptionsContainer.innerHTML = '';

  const quizOptions = [];
  quizOptions.push(quizInstance.getCorrectanswer(1));
  quizOptions.push(...quizInstance.getIncorrectanswers(1));

  isAnswered = false;
  const shuffledChoices = shuffle(quizOptions);

  Object.keys(shuffledChoices).forEach(function (key, i) {
    const btnContainer = document.createElement("p");
    answerLabel.appendChild(btnContainer);
    const optionBtn = document.createElement("button");
    btnContainer.appendChild(optionBtn);
    optionBtn.innerHTML = quizOptions[key];
    optionBtn.addEventListener('click', (quizInstance,index) => {
      //answerLabel.removeChild(btnContainer);
      //btnContainer.removeChild(optionBtn);
      //quizOptionsContainer.innerHTML = ''; 
 
      getNewQuestion(quizInstance,index);
      //checkAnswer(optionBtn);
      /*
      if (optionBtn.innerHTML = quizInstance.getCorrectanswer(i))
      {
        optionBtn.classList.add('correct');
      } else
      {
        optionBtn.classList.add('wrong');
      }*/
      index++;
    });
    btnContainer.appendChild(optionBtn);
    answerLabel.appendChild(btnContainer);
  })

  console.log(quizInstance);
  console.log(quizInstance.quizzes);
  //console.log("ジャンル"+quizInstance.getQuizCategory(1));
  console.log("[問題]" + index);
  
  console.log("正解"+quizInstance.getCorrectanswer(1));
  console.log(quizInstance.getIncorrectanswers(1));
  //console.log(quizzess.getNumOfQuiz(1));

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
  quizOptionsContainer.appendChild(returnBtn);
  returnBtn.addEventListener('click', () => {

  })
}



