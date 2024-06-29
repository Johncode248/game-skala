const quizData = [
    {
      question: 'What is the average daily social media usage per person worldwide in 2023?',
      options: ['1 hour', '2 hours', '2 hours and 24 minutes', '3 hours and 15 minutes'],
      answer: '2 hours and 24 minutes',
    },
    {
      question: 'How many hours per day does an average teenager spend on social media?',
      options: ['1-2 hours', '3-4 hours', '5-6 hours', '7-8 hours'],
      answer: '3-4 hours',
    },
    {
      question: 'How many Facebook accounts were fake according to the 2021 report?',
      options: ['1-2%', '5-6%', '8-9%', '10-11%'],
      answer: '5-6%',
    },
    {
      question: 'What percentage of the global population uses social media?',
      options: ['45%', '57%', '67%', '72%'],
      answer: '67%',
    },
    {
      question: 'Which social media platform has the most monthly active users worldwide?',
      options: [
        'Facebook',
        'YouTube',
        'WhatsApp',
        'Instagram',
      ],
      answer: 'Facebook',
    },
    {
      question: 'What was the total number of active social media users worldwide in 2023?',
      options: ['2.5 billion', '3 billion', '4.9 billion', '5.3 billion'],
      answer: '4.9 billion',
    },
    {
      question: 'How many hours per month does the average user spend on TikTok?',
      options: [
        '12 hours',
        '20 hours',
        '26 hours',
        '32 hours',
      ],
      answer: '26 hours',
    },
    {
      question: 'Which well-known social media platform was initially named "Picaboo"?',
      options: ['Snapchat', 'Instagram', 'TikTok', 'Pinterest'],
      answer: 'Snapchat',
    },
    {
      question: 'Which social media platform was created by Mark Zuckerberg?',
      options: [
        'Instagram',
        'Twitter',
        'LinkedIn',
        'Facebook',
      ],
      answer: 'Facebook',
    },
    {
      question: 'Which platform is best known for live streaming video games?',
      options: ['TikTok', 'Twitch', 'Facebook', 'Twitter'],
      answer: 'Twitch',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();