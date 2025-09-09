// ===============================================
// Quiz App - Refactored with Better Code Structure
// ===============================================

class QuizApp {
  constructor() {
    this.state = {
      quizData: null,
      currentQuiz: null,
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      answeredQuestions: [],
      isAnswerSubmitted: false
    };
    
    this.elements = this.getElements();
    this.init();
  }

  // ===============================================
  // Pure Helper Functions
  // ===============================================

  getElements() {
    return {
      quizMenu: document.getElementById('quizMenu'),
      quizQuestion: document.getElementById('quizQuestion'),
      quizCompleted: document.getElementById('quizCompleted'),
      currentQuiz: document.getElementById('currentQuiz'),
      currentQuizIcon: document.getElementById('currentQuizIcon'),
      currentQuizTitle: document.getElementById('currentQuizTitle'),
      quizSubjects: document.getElementById('quizSubjects'),
      questionNumber: document.getElementById('questionNumber'),
      questionText: document.getElementById('questionText'),
      progressFill: document.getElementById('progressFill'),
      answerOptions: document.getElementById('answerOptions'),
      errorMessage: document.getElementById('errorMessage'),
      submitBtn: document.getElementById('submitBtn'),
      answerForm: document.getElementById('answerForm'),
      finalScore: document.getElementById('finalScore'),
      completedQuizIcon: document.getElementById('completedQuizIcon'),
      completedQuizTitle: document.getElementById('completedQuizTitle'),
      playAgainBtn: document.getElementById('playAgainBtn'),
      themeToggle: document.getElementById('themeToggle')
    };
  }

  escapeHtml(text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  unescapeHtml(text) {
    return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }

  hideElement(element) {
    if (element) element.style.display = 'none';
  }

  showElement(element, display = 'block') {
    if (element) element.style.display = display;
  }

  clearContainer(container) {
    if (container) container.innerHTML = '';
  }

  // ===============================================
  // State Management
  // ===============================================

  updateState(newState) {
    this.state = { ...this.state, ...newState };
  }

  resetQuizState() {
    this.updateState({
      currentQuiz: null,
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      answeredQuestions: [],
      isAnswerSubmitted: false
    });
  }

  resetQuestionState() {
    this.updateState({
      selectedAnswer: null,
      isAnswerSubmitted: false
    });
  }

  // ===============================================
  // DOM Manipulation Helpers
  // ===============================================

  hideAllScreens() {
    const screens = [this.elements.quizMenu, this.elements.quizQuestion, this.elements.quizCompleted];
    screens.forEach(screen => this.hideElement(screen));
  }

  clearErrorMessage() {
    this.hideElement(this.elements.errorMessage);
  }

  showErrorMessage() {
    this.showElement(this.elements.errorMessage, 'flex');
  }

  updateProgressBar() {
    if (!this.state.currentQuiz) return;
    const percentage = ((this.state.currentQuestionIndex + 1) / this.state.currentQuiz.questions.length) * 100;
    this.elements.progressFill.style.width = `${percentage}%`;
  }

  resetSubmitButton() {
    if (!this.elements.submitBtn) return;
    this.elements.submitBtn.textContent = 'Submit Answer';
    this.elements.submitBtn.onclick = null;
    this.elements.submitBtn.disabled = false;
  }

  resetAnswerOptions() {
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => {
      option.classList.remove('selected', 'correct', 'incorrect');
    });
  }

  resetForm() {
    this.resetQuestionState();
    this.clearErrorMessage();
    this.resetSubmitButton();
    this.resetAnswerOptions();
    
    if (this.elements.answerForm) {
      this.elements.answerForm.reset();
      const inputs = this.elements.answerForm.querySelectorAll('input, button');
      inputs.forEach(input => input.disabled = false);
    }
  }

  // ===============================================
  // Quiz Data Loading
  // ===============================================

  async init() {
    this.initTheme();
    await this.loadQuizData();
    this.setupEventListeners();
    this.showQuizMenu();
  }

  async loadQuizData() {
    try {
      const response = await fetch('./data.json');
      this.updateState({ quizData: await response.json() });
    } catch (error) {
      console.warn('Could not fetch data.json via HTTP, using embedded data for local development');
      this.updateState({ quizData: this.getFallbackData() });
    }
  }

  getFallbackData() {
    return {
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

  // ===============================================
  // Event Handling
  // ===============================================

  setupEventListeners() {
    // Theme toggle
    if (this.elements.themeToggle) {
      this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Play again button
    if (this.elements.playAgainBtn) {
      this.elements.playAgainBtn.addEventListener('click', () => this.resetQuiz());
    }

    // Answer form submission
    if (this.elements.answerForm) {
      this.elements.answerForm.addEventListener('submit', (e) => this.handleAnswerSubmit(e));
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
  }

  handleAnswerSubmit(e) {
    e.preventDefault();
    
    if (!this.state.selectedAnswer) {
      this.showErrorMessage();
      return;
    }

    if (this.state.isAnswerSubmitted) {
      // User clicked Next Question or Finish Quiz
      if (this.state.currentQuestionIndex < this.state.currentQuiz.questions.length - 1) {
        this.nextQuestion();
      } else {
        this.finishQuiz();
      }
    } else {
      // User submitted an answer for the first time
      this.checkAnswer();
    }
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
    this.showElement(this.elements.quizMenu);
    this.hideElement(this.elements.currentQuiz);
    this.renderQuizSubjects();
  }

  renderQuizSubjects() {
    if (!this.state.quizData?.quizzes) {
      console.error('Quiz data not available');
      return;
    }

    this.clearContainer(this.elements.quizSubjects);

    this.state.quizData.quizzes.forEach(quiz => {
      const subjectElement = this.createQuizSubjectElement(quiz);
      this.elements.quizSubjects.appendChild(subjectElement);
    });
  }

  createQuizSubjectElement(quiz) {
    const subjectElement = document.createElement('a');
    subjectElement.href = '#';
    subjectElement.className = `quiz-subject ${quiz.title.toLowerCase()}`;
    subjectElement.setAttribute('role', 'button');
    subjectElement.setAttribute('tabindex', '0');
    
    subjectElement.innerHTML = `
      <img src="${quiz.icon}" alt="${quiz.title} icon" class="quiz-icon">
      <span class="quiz-title">${quiz.title}</span>
    `;

    const handleClick = (e) => {
      e.preventDefault();
      this.startQuiz(quiz);
    };

    subjectElement.addEventListener('click', handleClick);
    subjectElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleClick(e);
      }
    });

    return subjectElement;
  }

  // ===============================================
  // Quiz Logic
  // ===============================================

  startQuiz(quiz) {
    this.updateState({ 
      currentQuiz: quiz,
      currentQuestionIndex: 0,
      score: 0,
      answeredQuestions: []
    });
    
    // Show current quiz in header
    this.showElement(this.elements.currentQuiz, 'flex');
    this.elements.currentQuizIcon.src = quiz.icon;
    this.elements.currentQuizIcon.alt = `${quiz.title} icon`;
    this.elements.currentQuizTitle.textContent = quiz.title;
    
    this.showQuestion();
  }

  showQuestion() {
    this.hideAllScreens();
    this.showElement(this.elements.quizQuestion);
    
    const question = this.state.currentQuiz.questions[this.state.currentQuestionIndex];
    
    // Update question info
    this.elements.questionNumber.textContent = 
      `Question ${this.state.currentQuestionIndex + 1} of ${this.state.currentQuiz.questions.length}`;
    this.elements.questionText.textContent = question.question;
    
    this.updateProgressBar();
    this.renderAnswerOptions(question);
    this.resetForm(); // Reset form state for new question
  }

  renderAnswerOptions(question) {
    this.clearContainer(this.elements.answerOptions);

    const letters = ['A', 'B', 'C', 'D'];
    
    question.options.forEach((option, index) => {
      const optionElement = this.createAnswerOption(option, index, letters[index]);
      this.elements.answerOptions.appendChild(optionElement);
    });
  }

  createAnswerOption(option, index, letter) {
    const optionElement = document.createElement('label');
    optionElement.className = 'answer-option';
    optionElement.setAttribute('tabindex', '0');
    
    const escapedOption = this.escapeHtml(option);
    
    optionElement.innerHTML = `
      <input type="radio" name="answer" value="${escapedOption}" data-index="${index}">
      <span class="answer-letter">${letter}</span>
      <span class="answer-text">${escapedOption}</span>
      <img src="./assets/images/icon-correct.svg" alt="Correct" class="answer-feedback correct-icon">
      <img src="./assets/images/icon-incorrect.svg" alt="Incorrect" class="answer-feedback incorrect-icon">
    `;

    const handleSelection = () => this.selectAnswer(optionElement, option);

    optionElement.addEventListener('click', handleSelection);
    optionElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelection();
      }
    });

    return optionElement;
  }

  selectAnswer(optionElement, answer) {
    // Remove previous selection
    document.querySelectorAll('.answer-option').forEach(option => {
      option.classList.remove('selected');
    });

    // Select current option
    optionElement.classList.add('selected');
    optionElement.querySelector('input[type="radio"]').checked = true;
    this.updateState({ selectedAnswer: answer });
    
    // Hide error message if shown
    this.clearErrorMessage();
  }

  checkAnswer() {
    const question = this.state.currentQuiz.questions[this.state.currentQuestionIndex];
    const isCorrect = this.state.selectedAnswer === question.answer;
    
    if (isCorrect) {
      this.updateState({ score: this.state.score + 1 });
    }

    // Store answer
    this.state.answeredQuestions.push({
      question: question.question,
      selectedAnswer: this.state.selectedAnswer,
      correctAnswer: question.answer,
      isCorrect: isCorrect
    });

    this.showAnswerFeedback(isCorrect, question.answer);
    this.updateState({ isAnswerSubmitted: true });
  }

  showAnswerFeedback(isCorrect, correctAnswer) {
    // Disable form inputs
    const inputs = this.elements.answerForm.querySelectorAll('input, button');
    inputs.forEach(input => input.disabled = true);

    // Show feedback for each option
    this.updateAnswerOptionsWithFeedback(correctAnswer, isCorrect);

    // Update submit button
    this.updateSubmitButtonForNextAction();
    
    // Re-enable submit button
    this.elements.submitBtn.disabled = false;
  }

  updateAnswerOptionsWithFeedback(correctAnswer, isCorrect) {
    document.querySelectorAll('.answer-option').forEach(option => {
      const radioInput = option.querySelector('input[type="radio"]');
      const optionValue = radioInput.getAttribute('value');
      const unescapedValue = this.unescapeHtml(optionValue);
      
      if (unescapedValue === correctAnswer) {
        option.classList.add('correct');
      } else if (unescapedValue === this.state.selectedAnswer && !isCorrect) {
        option.classList.add('incorrect');
      }
    });
  }

  updateSubmitButtonForNextAction() {
    if (this.state.currentQuestionIndex < this.state.currentQuiz.questions.length - 1) {
      this.elements.submitBtn.textContent = 'Next Question';
    } else {
      this.elements.submitBtn.textContent = 'Finish Quiz';
    }
  }

  nextQuestion() {
    this.updateState({ currentQuestionIndex: this.state.currentQuestionIndex + 1 });
    this.showQuestion();
  }

  finishQuiz() {
    this.showResults();
  }

  // ===============================================
  // Quiz Results
  // ===============================================

  showResults() {
    this.hideAllScreens();
    this.showElement(this.elements.quizCompleted);
    
    // Update score display
    this.elements.finalScore.textContent = this.state.score;
    this.elements.completedQuizIcon.src = this.state.currentQuiz.icon;
    this.elements.completedQuizIcon.alt = `${this.state.currentQuiz.title} icon`;
    this.elements.completedQuizTitle.textContent = this.state.currentQuiz.title;
    
    this.storeResults();
  }

  storeResults() {
    const results = {
      quiz: this.state.currentQuiz.title,
      score: this.state.score,
      total: this.state.currentQuiz.questions.length,
      percentage: Math.round((this.state.score / this.state.currentQuiz.questions.length) * 100),
      answers: this.state.answeredQuestions,
      completedAt: new Date().toISOString()
    };
    
    const allResults = JSON.parse(localStorage.getItem('quiz-results') || '[]');
    allResults.push(results);
    localStorage.setItem('quiz-results', JSON.stringify(allResults));
  }

  resetQuiz() {
    this.resetQuizState();
    this.showQuizMenu();
  }

  // ===============================================
  // Keyboard Navigation
  // ===============================================

  handleKeyboardNavigation(e) {
    const focusedElement = document.activeElement;
    
    // Quiz subjects navigation
    if (focusedElement?.classList.contains('quiz-subject')) {
      this.handleQuizSubjectsNavigation(e, focusedElement);
    }
    
    // Answer options navigation
    if (focusedElement?.classList.contains('answer-option')) {
      this.handleAnswerOptionsNavigation(e, focusedElement);
    }

    // Escape to go back to menu
    if (e.key === 'Escape' && !this.state.selectedAnswer) {
      this.showQuizMenu();
    }
  }

  handleQuizSubjectsNavigation(e, focusedElement) {
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

  handleAnswerOptionsNavigation(e, focusedElement) {
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