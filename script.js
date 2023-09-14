const questions = [
    // Categoria: Geografia
    {
      question: "Qual é o maior oceano do mundo?",
      options: ["Oceano Atlântico", "Oceano Índico", "Oceano Pacífico", "Oceano Ártico"],
      correctIndex: 2
    },
    {
      question: "Qual é a capital da França?",
      options: ["Londres", "Paris", "Roma", "Berlim"],
      correctIndex: 1
    },
    {
      question: "Em que continente fica o Egito?",
      options: ["África", "Ásia", "Europa", "América do Sul"],
      correctIndex: 0
    },
    {
      question: "Qual é o rio mais longo do mundo?",
      options: ["Nilo", "Amazonas", "Mississippi", "Yangtzé"],
      correctIndex: 0
    },
    {
      question: "Qual é o ponto mais alto da Terra?",
      options: ["Monte Kilimanjaro", "Everest", "Monte McKinley", "Monte Aconcágua"],
      correctIndex: 1
    },
  
    // Categoria: História
    {
      question: "Em que ano ocorreu a Revolução Francesa?",
      options: ["1789", "1804", "1812", "1756"],
      correctIndex: 0
    },
    {
      question: "Quem foi o primeiro presidente dos Estados Unidos?",
      options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "Benjamin Franklin"],
      correctIndex: 1
    },
    {
      question: "Qual imperador romano ficou conhecido por sua extravagância e governou durante o incêndio de Roma em 64 d.C.?",
      options: ["Augusto", "Tibério", "Calígula", "Nero"],
      correctIndex: 3
    },
    {
      question: "Quem foi o líder sul-africano que lutou contra o apartheid e se tornou o primeiro presidente negro do país?",
      options: ["Nelson Mandela", "Desmond Tutu", "Thabo Mbeki", "Jacob Zuma"],
      correctIndex: 0
    },
    {
      question: "Qual foi a civilização que construiu a cidade de Machu Picchu?",
      options: ["Astecas", "Incas", "Maias", "Egípcios"],
      correctIndex: 1
    },
  
    // Categoria: Ciência e Tecnologia
    {
      question: "Qual é o processo pelo qual as plantas produzem seu próprio alimento usando a luz solar?",
      options: ["Fotossíntese", "Respiração", "Digestão", "Circulação"],
      correctIndex: 0
    },
    {
      question: "Quem é conhecido como o pai da física moderna e formulou as leis do movimento e a lei da gravitação universal?",
      options: ["Isaac Newton", "Albert Einstein", "Galileu Galilei", "Nikola Tesla"],
      correctIndex: 0
    },
    {
      question: "Qual é o elemento químico mais abundante na crosta terrestre?",
      options: ["Oxigênio", "Carbono", "Hidrogênio", "Silício"],
      correctIndex: 3
    },
    {
      question: "Qual é a unidade básica de hereditariedade em um organismo vivo?",
      options: ["Átomo", "Célula", "Gene", "Molécula"],
      correctIndex: 2
    },
    {
      question: "Que famoso cientista desenvolveu a teoria da relatividade?",
      options: ["Isaac Newton", "Marie Curie", "Albert Einstein", "Stephen Hawking"],
      correctIndex: 2
    },
  
    // Categoria: Cultura Pop
    {
      question: "Qual é a série de filmes que apresenta personagens como Luke Skywalker e Darth Vader?",
      options: ["Star Trek", "Star Wars", "Guardiões da Galáxia", "Senhor dos Anéis"],
      correctIndex: 1
    },
    {
      question: "Quem é a estrela pop conhecida como a 'Rainha do Pop'?",
      options: ["Beyoncé", "Britney Spears", "Madonna", "Lady Gaga"],
      correctIndex: 2
    },
    {
      question: "Qual é o nome da primeira série da Netflix que se passa no universo de 'Stranger Things'?",
      options: ["Stranger Worlds", "Hawkins Chronicles", "Upside Down", "Six"],
      correctIndex: 0
    },
    {
      question: "Qual é o nome do bruxo protagonista da série de livros escrita por J.K. Rowling?",
      options: ["Gandalf", "Merlin", "Harry Potter", "Dumbledore"],
      correctIndex: 2
    },
    {
      question: "Que filme ganhou o Oscar de Melhor Filme em 2020?",
      options: ["Parasita", "1917", "Coringa", "Era uma vez em Hollywood"],
      correctIndex: 0
    },
        // Adicione mais perguntas aqui
  ];
  
  let currentQuestionIndex = 0;
  let selectedOptionIndex = null;
  let score = 0;
  let lives = 3;
  let timer;
  
  const startPage = document.getElementById("start-page");
  const quizPage = document.getElementById("quiz-page");
  const startButton = document.getElementById("start-button");
  const questionDisplay = document.getElementById("question");
  const optionsContainer = document.getElementById("options-container");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const livesDisplay = document.getElementById("lives");
  const heartEmojis = document.querySelectorAll(".heart-emoji");
  const confirmButton = document.getElementById("confirm-button");
  const selectionWarning = document.getElementById("selection-warning");
  
  startButton.addEventListener("click", () => {
    startPage.style.display = "none";
    quizPage.style.display = "block";
    startQuiz();
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    confirmButton.addEventListener("click", checkAnswer);
    hideStartPage();
  });
  
  function hideStartPage() {
    startPage.style.display = "block";
    quizPage.style.display = "none";
  }
  
  function flashBackground(color) {
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.style.transition = "background-color 0.3s";
    quizContainer.style.backgroundColor = color;
  
    setTimeout(() => {
      quizContainer.style.backgroundColor = "#ffffff";
    }, 300);
  }
  
  function startQuiz() {
    showQuestion();
    updateLivesDisplay();
    startTimer();
    confirmButton.style.display = "block";
    selectionWarning.style.display = "none";
  }
  
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionDisplay.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
  
    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement("button");
      optionElement.classList.add("option");
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => selectOption(index));
      optionsContainer.appendChild(optionElement);
    });
  }
  
  function selectOption(index) {
    selectedOptionIndex = index;
    const options = optionsContainer.getElementsByClassName("option");
    Array.from(options).forEach(option => option.classList.remove("selected"));
    options[index].classList.add("selected");
    selectionWarning.style.display = "none";
  }
  
  function startTimer() {
    let timeLeft = 30;
    timerDisplay.textContent = `Tempo: ${timeLeft}s`;
  
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Tempo: ${timeLeft}s`;
      } else {
        clearInterval(timer);
        if (selectedOptionIndex === null) {
          lives--;
          updateLivesDisplay();
        }
        showQuestion(); // Vai para a próxima pergunta após o tempo esgotado
      }
    }, 1000);
  }
  
  function checkAnswer() {
    clearInterval(timer);
  
    if (selectedOptionIndex === null) {
      selectionWarning.style.display = "block";
      lives--;
      updateLivesDisplay();
    } else {
      const correctIndex = questions[currentQuestionIndex].correctIndex;
  
      if (selectedOptionIndex === correctIndex) {
        score++;
        scoreDisplay.textContent = `Pontuação: ${score} de ${questions.length}`;
        flashBackground("#27ae60");
      } else {
        lives--;
        updateLivesDisplay();
        flashBackground("#e74c3c");
  
        if (lives === 0) {
          showFinalScore();
          return;
        }
      }
    }
  
    currentQuestionIndex++;
    selectedOptionIndex = null;
  
    if (currentQuestionIndex < questions.length) {
      setTimeout(() => {
        showQuestion();
        startTimer();
        confirmButton.style.display = "block";
      }, 1000);
    } else {
      showFinalScore();
    }
  }
  
  function updateLivesDisplay() {
    heartEmojis.forEach((emoji, index) => {
      emoji.style.visibility = index < lives ? "visible" : "hidden";
    });
  }
  
  function showFinalScore() {
    questionDisplay.textContent = `Quiz Concluído! Sua Pontuação Final é ${score} de ${questions.length}`;
    optionsContainer.innerHTML = "";
    timerDisplay.textContent = "";
    livesDisplay.textContent = "";
    confirmButton.style.display = "none";
    selectionWarning.style.display = "none";
  }