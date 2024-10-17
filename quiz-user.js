const quizzes = JSON.parse(localStorage.getItem('quizzes'));

function displayQuiz() {
    quizzes.forEach((quiz) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="quiz-container">
                <p>${quiz.name}</p>
                <button class="quiz-btn">Take Quiz</button>
            </div>
        `;
        
  
        document.querySelector('.quiz').appendChild(div);


        div.querySelector('.quiz-btn').addEventListener('click', () => {
            saveQuiz(quiz);  
            window.location.href = "quiz-content.html";  
        });
    });
}

function saveQuiz(quiz){
    localStorage.setItem('currentQuiz',JSON.stringify(quiz));
}


const currentQuiz = JSON.parse(localStorage.getItem('currentQuiz'));
let currentQuestionIndex = 0;
let score = 0;

function displayQuizContent() {
    const quizContainer = document.querySelector('.quiz-question');
    const answersContainer = document.querySelector('.answers');

    const currentQuestion = currentQuiz.chapters[currentQuestionIndex];


    quizContainer.innerHTML = '';
    answersContainer.innerHTML = '';

   
    quizContainer.innerHTML = `<h2>${currentQuestion.question}</h2>`;

   
    if (currentQuestion.type === 'image') {
        const img = document.createElement('img');
        img.src = currentQuestion.url; 
        img.alt = 'Question image';
        img.style.width = '300px'; 
        quizContainer.appendChild(img);
    } else if (currentQuestion.type === 'audio') {
        const audio = document.createElement('audio');
        audio.src = currentQuestion.url;  
        audio.controls = true;  
        quizContainer.appendChild(audio);
    } else if (currentQuestion.type === 'video') {
        const video = document.createElement('video');
        video.src = currentQuestion.url;  
        video.controls = true; 
        video.style.width = '300px';  
        quizContainer.appendChild(video);
    }

    currentQuestion.options.forEach((option) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.innerText = option;

        optionBtn.addEventListener('click', () => checkAnswer(option, optionBtn, currentQuestion.correctOption));
        answersContainer.appendChild(optionBtn);
    });
}


function checkAnswer(selectedOption, optionBtn, correctOption) {
    const answerButtons = document.querySelectorAll('.option-btn');

   
    answerButtons.forEach(btn => {
        btn.disabled = true;
       
        if (btn.innerText === correctOption) {
            btn.style.backgroundColor = 'green';
        }
    });

  
    if (selectedOption === correctOption) {
        optionBtn.style.backgroundColor = 'green';
        score++;
    } else {
       
        optionBtn.style.backgroundColor = 'red';
    }

 
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.className = 'next-btn';
    nextButton.addEventListener('click', goToNextQuestion);
    document.querySelector('.quiz-content').appendChild(nextButton);
}

function goToNextQuestion() {
    currentQuestionIndex++;

   
    const nextButton = document.querySelector('.next-btn');
    if (nextButton) nextButton.remove();


    if (currentQuestionIndex < currentQuiz.chapters.length) {
        displayQuizContent(); 
    } else {
      
        showFinalScore();
    }
}

function showFinalScore() {
    const quizContainer = document.querySelector('.quiz-question');
    const answersContainer = document.querySelector('.answers');


    quizContainer.innerHTML = '';
    answersContainer.innerHTML = '';


    quizContainer.innerHTML = `<h2>Your Score: ${score} / ${currentQuiz.chapters.length}</h2>`;

  
    const retryButton = document.createElement('button');
    retryButton.innerText = 'Retry Quiz';
    retryButton.className = 'retry-btn';
    retryButton.addEventListener('click', retryQuiz);
    document.querySelector('.quiz-content').appendChild(retryButton);
}

function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;


    const retryButton = document.querySelector('.retry-btn');
    if (retryButton) retryButton.remove();

    displayQuizContent(); 
}




if (window.location.pathname.includes("quiz-content.html")) {
    console.log("this s page");
   displayQuizContent();

} else if (window.location.pathname.includes("quiz.html")) {
    console.log("this is event page");
    displayQuiz(quizzes);
}

