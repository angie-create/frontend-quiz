// ===============================================
// Quiz App - Main JavaScript
// ===============================================

class QuizApp {
  constructor() {
    this.quizData = null;
    this.currentQuiz = null;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.answeredQuestions = [];
    
    this.init();
  }

  async init() {
    this.initTheme();
    await this.loadQuizData();
    this.setupEventListeners();
    this.showQuizMenu();
  }

  // ===============================================
  // Data Loading
  // ===============================================

  async loadQuizData() {
    try {
      // Try to fetch from server first
      const response = await fetch('./data.json');
      this.quizData = await response.json();
    } catch (error) {
      console.warn('Could not fetch data.json via HTTP, using embedded data for local development');
      // Fallback to embedded data for local file:// protocol
      this.quizData = {
        "quizzes": [
          {
            "title": "HTML",
            "icon": "./assets/images/icon-html.svg",
            "questions": [
              {
                "question": "What does HTML stand for?",
                "options": [
                  "Hyper Trainer Marking Language",
                  "Hyper Text Marketing Language", 
                  "Hyper Text Markup Language",
                  "Hyper Text Markup Leveler"
                ],
                "answer": "Hyper Text Markup Language"
              },
              {
                "question": "Which of the following is the correct structure for an HTML document?",
                "options": [
                  "<html><head></head><body></body></html>",
                  "<head><html></html><body></body></head>",
                  "<body><head></head><html></html></body>", 
                  "<html><body></body><head></head></html>"
                ],
                "answer": "<html><head></head><body></body></html>"
              },
              {
                "question": "Which HTML element is used to define the title of a document?",
                "options": [
                  "<head>",
                  "<title>",
                  "<header>",
                  "<top>"
                ],
                "answer": "<title>"
              },
              {
                "question": "What is the purpose of the <body> tag in HTML?",
                "options": [
                  "It defines the document's head section.",
                  "It contains all the content such as text, images, and links.",
                  "It is used to define the main content of an HTML document.",
                  "It specifies the body of the email content in HTML."
                ],
                "answer": "It contains all the content such as text, images, and links."
              },
              {
                "question": "Which HTML tag is used to create a hyperlink?",
                "options": [
                  "<hyperlink>",
                  "<link>", 
                  "<a>",
                  "<url>"
                ],
                "answer": "<a>"
              },
              {
                "question": "Which attribute specifies the URL of the page the link goes to?",
                "options": [
                  "link",
                  "src",
                  "href", 
                  "url"
                ],
                "answer": "href"
              },
              {
                "question": "Which HTML element is used to specify a header for a document or section?",
                "options": [
                  "<head>",
                  "<top>",
                  "<header>",
                  "<section>"
                ],
                "answer": "<header>"
              },
              {
                "question": "How do you create an ordered list in HTML?",
                "options": [
                  "<ul>",
                  "<ol>",
                  "<list>",
                  "<order>"
                ],
                "answer": "<ol>"
              },
              {
                "question": "What is the correct HTML element for inserting a line break?",
                "options": [
                  "<break>",
                  "<lb>",
                  "<br>",
                  "<newline>"
                ],
                "answer": "<br>"
              },
              {
                "question": "Which attribute is used to provide a text description of an image?",
                "options": [
                  "title",
                  "src",
                  "alt",
                  "description"
                ],
                "answer": "alt"
              }
            ]
          },
          {
            "title": "CSS",
            "icon": "./assets/images/icon-css.svg",
            "questions": [
              {
                "question": "What does CSS stand for?",
                "options": [
                  "Cascading Style Sheets",
                  "Creative Style Sheets", 
                  "Computer Style Sheets",
                  "Colorful Style Sheets"
                ],
                "answer": "Cascading Style Sheets"
              },
              {
                "question": "Which HTML attribute is used to define inline styles?",
                "options": [
                  "class",
                  "style",
                  "font",
                  "styles"
                ],
                "answer": "style"
              },
              {
                "question": "How do you insert a comment in a CSS file?",
                "options": [
                  "// this is a comment //",
                  "/* this is a comment */",
                  "-- this is a comment --",
                  "<!-- this is a comment -->"
                ],
                "answer": "/* this is a comment */"
              },
              {
                "question": "Which property is used to change the background color?",
                "options": [
                  "color",
                  "bgcolor", 
                  "background-color",
                  "background"
                ],
                "answer": "background-color"
              },
              {
                "question": "How do you apply a style to all <p> elements?",
                "options": [
                  "p { }",
                  ".p { }",
                  "#p { }",
                  "all.p { }"
                ],
                "answer": "p { }"
              },
              {
                "question": "How do you select an element with id 'demo'?",
                "options": [
                  ".demo",
                  "*demo",
                  "#demo",
                  "demo"
                ],
                "answer": "#demo"
              },
              {
                "question": "How do you select elements with class name 'test'?",
                "options": [
                  ".test",
                  "#test",
                  "test",
                  "*test"
                ],
                "answer": ".test"
              },
              {
                "question": "Which property is used to change the font of an element?",
                "options": [
                  "font-weight",
                  "font-style",
                  "font-family",
                  "font-size"
                ],
                "answer": "font-family"
              },
              {
                "question": "How do you make each word in a text start with a capital letter?",
                "options": [
                  "text-transform: capitalize;",
                  "text-transform: uppercase;",
                  "You can't do that with CSS",
                  "font-variant: capitalize;"
                ],
                "answer": "text-transform: capitalize;"
              },
              {
                "question": "How do you make a list that lists its items with squares?",
                "options": [
                  "list-style-type: square;",
                  "list-type: square;",
                  "list-style: square;",
                  "list: square;"
                ],
                "answer": "list-style-type: square;"
              }
            ]
          },
          {
            "title": "JavaScript",
            "icon": "./assets/images/icon-js.svg", 
            "questions": [
              {
                "question": "Which type of JavaScript language is ___",
                "options": [
                  "Object-Oriented",
                  "Object-Based",
                  "Assembly-language",
                  "High-level"
                ],
                "answer": "Object-Based"
              },
              {
                "question": "Which one of the following also known as Conditional Expression:",
                "options": [
                  "Alternative to if-else",
                  "Switch statement",
                  "If-then-else statement",
                  "immediate if"
                ],
                "answer": "immediate if"
              },
              {
                "question": "In JavaScript, what is a block of statement?",
                "options": [
                  "Conditional block",
                  "block that combines a number of statements into a single compound statement",
                  "block that contains a single statement",
                  "block that has local scope"
                ],
                "answer": "block that combines a number of statements into a single compound statement"
              },
              {
                "question": "When interpreter encounters an empty statements, what it will do:",
                "options": [
                  "Shows a warning",
                  "Prompts to complete the statement",
                  "Throws an error",
                  "Ignores the statements"
                ],
                "answer": "Ignores the statements"
              },
              {
                "question": "The \"function\" and  \"var\" are known as:",
                "options": [
                  "Keywords",
                  "Data types",
                  "Declaration statements",
                  "Prototypes"
                ],
                "answer": "Declaration statements"
              },
              {
                "question": "Which of the following variables takes precedence over the others if the names are the same?",
                "options": [
                  "Global variable",
                  "The local element",
                  "The two of the above",
                  "None of the above"
                ],
                "answer": "The local element"
              },
              {
                "question": "Which one of the following is the correct way for calling the JavaScript code?",
                "options": [
                  "Preprocessor",
                  "Triggering Event",
                  "RMI",
                  "Function/Method"
                ],
                "answer": "Function/Method"
              },
              {
                "question": "Which of the following type of a variable is volatile?",
                "options": [
                  "Mutable variable",
                  "Dynamic variable",
                  "Volatile variable", 
                  "Immutable variable"
                ],
                "answer": "Mutable variable"
              },
              {
                "question": "When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints:",
                "options": [
                  "Prints an exception error",
                  "Prints an overflow error",
                  "Displays \"Infinity\"",
                  "Prints the value as such"
                ],
                "answer": "Displays \"Infinity\""
              },
              {
                "question": "In the JavaScript, which one of the following is not considered as an error:",
                "options": [
                  "Syntax error",
                  "Missing of semicolons",
                  "Division by zero",
                  "Missing of Bracket"
                ],
                "answer": "Division by zero"
              }
            ]
          },
          {
            "title": "Accessibility",
            "icon": "./assets/images/icon-accessibility.svg",
            "questions": [
              {
                "question": "What does 'WCAG' stand for?",
                "options": [
                  "Web Content Accessibility Guidelines",
                  "Web Compliance Accessibility Guide",
                  "Web Content Accessibility Goals",
                  "Website Compliance and Accessibility Guidelines"
                ],
                "answer": "Web Content Accessibility Guidelines"
              },
              {
                "question": "Which element is used to provide a text alternative for images?",
                "options": [
                  "title attribute",
                  "alt attribute", 
                  "longdesc attribute",
                  "summary attribute"
                ],
                "answer": "alt attribute"
              },
              {
                "question": "What is the purpose of the 'tabindex' attribute?",
                "options": [
                  "To change the tab color",
                  "To specify the tab order of elements",
                  "To create new tabs",
                  "To hide tabs from users"
                ],
                "answer": "To specify the tab order of elements"
              },
              {
                "question": "Which of these color contrast ratios meets WCAG AA standard for normal text?",
                "options": [
                  "2:1",
                  "3:1",
                  "4.5:1",
                  "7:1"
                ],
                "answer": "4.5:1"
              },
              {
                "question": "What is the most important thing to consider when designing for screen readers?",
                "options": [
                  "Color contrast",
                  "Font size",
                  "Semantic HTML structure",
                  "Animation effects"
                ],
                "answer": "Semantic HTML structure"
              },
              {
                "question": "Which attribute should you use to describe the purpose of a link?",
                "options": [
                  "alt",
                  "title",
                  "aria-label",
                  "summary"
                ],
                "answer": "aria-label"
              },
              {
                "question": "What is the minimum color contrast ratio for large text under WCAG AA?",
                "options": [
                  "1.5:1",
                  "2:1", 
                  "3:1",
                  "4.5:1"
                ],
                "answer": "3:1"
              },
              {
                "question": "Which HTML element is best for a page's main heading?",
                "options": [
                  "<header>",
                  "<h1>",
                  "<title>",
                  "<main>"
                ],
                "answer": "<h1>"
              },
              {
                "question": "What does 'aria-hidden=\"true\"' do?",
                "options": [
                  "Hides the element completely",
                  "Hides the element from screen readers only",
                  "Hides the element from visual users only", 
                  "Makes the element transparent"
                ],
                "answer": "Hides the element from screen readers only"
              },
              {
                "question": "Which is the correct way to group related form fields?",
                "options": [
                  "<group>",
                  "<fieldset>",
                  "<section>",
                  "<div>"
                ],
                "answer": "<fieldset>"
              }
            ]
          }
        ]
      };
    }
  }

  // ===============================================
  // Event Listeners
  // ===============================================

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', this.toggleTheme.bind(this));

    // Play again button
    const playAgainBtn = document.getElementById('playAgainBtn');
    playAgainBtn.addEventListener('click', this.resetQuiz.bind(this));

    // Answer form submission
    const answerForm = document.getElementById('answerForm');
    answerForm.addEventListener('submit', this.handleAnswerSubmit.bind(this));

    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
  }

  // ===============================================
  // Theme Management
  // ===============================================

  toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('quiz-theme', newTheme);
    
    // Update theme icons
    this.updateThemeIcons(newTheme);
  }

  updateThemeIcons(theme) {
    const lightIcons = document.querySelectorAll('.theme-icon-light');
    const darkIcons = document.querySelectorAll('.theme-icon-dark');
    
    if (theme === 'dark') {
      lightIcons.forEach(icon => {
        icon.src = icon.src.replace('light.svg', 'dark.svg');
      });
      darkIcons.forEach(icon => {
        icon.src = icon.src.replace('light.svg', 'dark.svg');
      });
    } else {
      lightIcons.forEach(icon => {
        icon.src = icon.src.replace('dark.svg', 'light.svg');
      });
      darkIcons.forEach(icon => {
        icon.src = icon.src.replace('dark.svg', 'light.svg');
      });
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem('quiz-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.body.setAttribute('data-theme', theme);
    this.updateThemeIcons(theme);
  }

  // ===============================================
  // Quiz Menu
  // ===============================================

  showQuizMenu() {
    this.hideAllScreens();
    document.getElementById('quizMenu').style.display = 'block';
    document.getElementById('currentQuiz').style.display = 'none';
    
    console.log('Quiz data loaded:', this.quizData);
    this.renderQuizSubjects();
  }

  renderQuizSubjects() {
    const container = document.getElementById('quizSubjects');
    container.innerHTML = '';

    console.log('Rendering quiz subjects. Container:', container);
    console.log('Quiz data:', this.quizData);

    if (!this.quizData || !this.quizData.quizzes) {
      console.error('Quiz data not available');
      return;
    }

    this.quizData.quizzes.forEach(quiz => {
      const subjectElement = document.createElement('a');
      subjectElement.href = '#';
      subjectElement.className = `quiz-subject ${quiz.title.toLowerCase()}`;
      subjectElement.setAttribute('role', 'button');
      subjectElement.setAttribute('tabindex', '0');
      
      subjectElement.innerHTML = `
        <img src="${quiz.icon}" alt="${quiz.title} icon" class="quiz-icon">
        <span class="quiz-title">${quiz.title}</span>
      `;

      subjectElement.addEventListener('click', (e) => {
        e.preventDefault();
        this.startQuiz(quiz);
      });

      subjectElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.startQuiz(quiz);
        }
      });

      container.appendChild(subjectElement);
    });
  }

  // ===============================================
  // Quiz Logic
  // ===============================================

  startQuiz(quiz) {
    this.currentQuiz = quiz;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answeredQuestions = [];
    
    // Show current quiz in header
    document.getElementById('currentQuiz').style.display = 'flex';
    document.getElementById('currentQuizIcon').src = quiz.icon;
    document.getElementById('currentQuizIcon').alt = `${quiz.title} icon`;
    document.getElementById('currentQuizTitle').textContent = quiz.title;
    
    this.showQuestion();
  }

  showQuestion() {
    this.hideAllScreens();
    document.getElementById('quizQuestion').style.display = 'block';
    
    const question = this.currentQuiz.questions[this.currentQuestionIndex];
    
    // Update question info
    document.getElementById('questionNumber').textContent = 
      `Question ${this.currentQuestionIndex + 1} of ${this.currentQuiz.questions.length}`;
    document.getElementById('questionText').textContent = question.question;
    
    // Update progress bar
    const progressPercent = ((this.currentQuestionIndex + 1) / this.currentQuiz.questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
    
    this.renderAnswerOptions(question);
    this.resetAnswerForm();
  }

  renderAnswerOptions(question) {
    const container = document.getElementById('answerOptions');
    container.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    
    question.options.forEach((option, index) => {
      const optionElement = document.createElement('label');
      optionElement.className = 'answer-option';
      optionElement.setAttribute('tabindex', '0');
      
      optionElement.innerHTML = `
        <input type="radio" name="answer" value="${option}" data-index="${index}">
        <span class="answer-letter">${letters[index]}</span>
        <span class="answer-text">${option}</span>
        <img src="./assets/images/icon-correct.svg" alt="Correct" class="answer-feedback correct-icon">
        <img src="./assets/images/icon-incorrect.svg" alt="Incorrect" class="answer-feedback incorrect-icon">
      `;
      
      console.log('Created option element:', optionElement.outerHTML);

      // Add click handler
      optionElement.addEventListener('click', () => {
        this.selectAnswer(optionElement, option);
      });

      // Add keyboard handler
      optionElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectAnswer(optionElement, option);
        }
      });

      container.appendChild(optionElement);
    });
  }

  selectAnswer(optionElement, answer) {
    // Remove previous selection
    document.querySelectorAll('.answer-option').forEach(option => {
      option.classList.remove('selected');
    });

    // Select current option
    optionElement.classList.add('selected');
    optionElement.querySelector('input[type="radio"]').checked = true;
    this.selectedAnswer = answer;
    
    // Hide error message if shown
    document.getElementById('errorMessage').style.display = 'none';
  }

  handleAnswerSubmit(e) {
    e.preventDefault();
    
    if (!this.selectedAnswer) {
      this.showError();
      return;
    }

    this.checkAnswer();
  }

  showError() {
    document.getElementById('errorMessage').style.display = 'flex';
    
    // Focus on error message for screen readers
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  checkAnswer() {
    const question = this.currentQuiz.questions[this.currentQuestionIndex];
    const isCorrect = this.selectedAnswer === question.answer;
    
    if (isCorrect) {
      this.score++;
    }

    // Store answer
    this.answeredQuestions.push({
      question: question.question,
      selectedAnswer: this.selectedAnswer,
      correctAnswer: question.answer,
      isCorrect: isCorrect
    });

    this.showAnswerFeedback(isCorrect, question.answer);
  }

  showAnswerFeedback(isCorrect, correctAnswer) {
    // Disable form
    const form = document.getElementById('answerForm');
    const inputs = form.querySelectorAll('input, button');
    inputs.forEach(input => input.disabled = true);

    // Show feedback for each option
    document.querySelectorAll('.answer-option').forEach(option => {
      const answerText = option.querySelector('.answer-text').textContent;
      
      if (answerText === correctAnswer) {
        option.classList.add('correct');
      } else if (answerText === this.selectedAnswer && !isCorrect) {
        option.classList.add('incorrect');
      }
    });

    // Change submit button to next/finish
    const submitBtn = document.getElementById('submitBtn');
    if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
      submitBtn.textContent = 'Next Question';
      submitBtn.onclick = () => this.nextQuestion();
    } else {
      submitBtn.textContent = 'Finish Quiz';
      submitBtn.onclick = () => this.finishQuiz();
    }
    
    submitBtn.disabled = false;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.showQuestion();
  }

  finishQuiz() {
    this.showResults();
  }

  resetAnswerForm() {
    this.selectedAnswer = null;
    
    // Reset form state
    const form = document.getElementById('answerForm');
    form.reset();
    
    const inputs = form.querySelectorAll('input, button');
    inputs.forEach(input => input.disabled = false);
    
    // Reset submit button
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'Submit Answer';
    submitBtn.onclick = null;
    
    // Hide error message
    document.getElementById('errorMessage').style.display = 'none';
    
    // Reset option styles
    document.querySelectorAll('.answer-option').forEach(option => {
      option.classList.remove('selected', 'correct', 'incorrect');
    });
  }

  // ===============================================
  // Quiz Results
  // ===============================================

  showResults() {
    this.hideAllScreens();
    document.getElementById('quizCompleted').style.display = 'block';
    
    // Update score display
    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('completedQuizIcon').src = this.currentQuiz.icon;
    document.getElementById('completedQuizIcon').alt = `${this.currentQuiz.title} icon`;
    document.getElementById('completedQuizTitle').textContent = this.currentQuiz.title;
    
    // Store results for potential review
    this.storeResults();
  }

  storeResults() {
    const results = {
      quiz: this.currentQuiz.title,
      score: this.score,
      total: this.currentQuiz.questions.length,
      percentage: Math.round((this.score / this.currentQuiz.questions.length) * 100),
      answers: this.answeredQuestions,
      completedAt: new Date().toISOString()
    };
    
    // Store in localStorage for potential future features
    const allResults = JSON.parse(localStorage.getItem('quiz-results') || '[]');
    allResults.push(results);
    localStorage.setItem('quiz-results', JSON.stringify(allResults));
  }

  resetQuiz() {
    this.currentQuiz = null;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.answeredQuestions = [];
    
    this.showQuizMenu();
  }

  // ===============================================
  // Utility Functions
  // ===============================================

  hideAllScreens() {
    document.getElementById('quizMenu').style.display = 'none';
    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('quizCompleted').style.display = 'none';
  }

  handleKeyboardNavigation(e) {
    // Handle keyboard navigation for better accessibility
    const focusedElement = document.activeElement;
    
    // Allow arrow key navigation through quiz subjects
    if (focusedElement && focusedElement.classList.contains('quiz-subject')) {
      const subjects = Array.from(document.querySelectorAll('.quiz-subject'));
      const currentIndex = subjects.indexOf(focusedElement);
      
      let nextIndex;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % subjects.length;
        subjects[nextIndex].focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIndex = currentIndex === 0 ? subjects.length - 1 : currentIndex - 1;
        subjects[nextIndex].focus();
      }
    }
    
    // Allow arrow key navigation through answer options
    if (focusedElement && focusedElement.classList.contains('answer-option')) {
      const options = Array.from(document.querySelectorAll('.answer-option'));
      const currentIndex = options.indexOf(focusedElement);
      
      let nextIndex;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % options.length;
        options[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
        options[nextIndex].focus();
      }
    }

    // Escape key to go back to menu (if not in middle of answering)
    if (e.key === 'Escape') {
      const currentScreen = this.getCurrentScreen();
      if (currentScreen === 'quizQuestion' && !this.selectedAnswer) {
        // Only allow escape if no answer is selected
        this.showQuizMenu();
      }
    }
  }

  getCurrentScreen() {
    if (document.getElementById('quizMenu').style.display !== 'none') return 'quizMenu';
    if (document.getElementById('quizQuestion').style.display !== 'none') return 'quizQuestion';
    if (document.getElementById('quizCompleted').style.display !== 'none') return 'quizCompleted';
    return 'unknown';
  }
}

// ===============================================
// Initialize App
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
  const app = new QuizApp();
  
  // Handle system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('quiz-theme')) {
      const theme = e.matches ? 'dark' : 'light';
      document.body.setAttribute('data-theme', theme);
      app.updateThemeIcons(theme);
    }
  });
});

// ===============================================
// Service Worker Registration (for potential PWA features)
// ===============================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Could register service worker here for offline functionality
    // navigator.serviceWorker.register('/sw.js');
  });
}