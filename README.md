# Frontend Mentor - Frontend quiz app solution

This is a solution to the [Frontend quiz app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Select a quiz subject
- Select a single answer from each question from a choice of four
- See an error message when trying to submit an answer without making a selection
- See if they have made a correct or incorrect choice when they submit an answer
- Move on to the next question after seeing the question result
- See a completed state with the score after the final question
- Play again to choose another subject
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app only using their keyboard
- **Bonus**: Change the app's theme between light and dark


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Responsive design with media queries
- CSS theming (light/dark mode)

### What I learned

This project was an excellent opportunity to practice several key frontend development concepts:

**CSS Grid Layout**: Implemented a responsive 2-column desktop layout that transitions to a single-column mobile layout:

```css
@media (min-width: 1025px) {
  .quiz-menu:not([style*="display: none"]) {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: var(--spacing-2xl) !important;
    align-items: start !important;
  }
}
```

**JavaScript Class-based Architecture**: Organized the code using ES6 classes for better maintainability:

```js
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
  }
}
```

**Theme Switching**: Implemented a smooth light/dark mode toggle using CSS custom properties:

```css
[data-theme="light"] {
  --bg-primary: #f4f6fa;
  --text-primary: #313e51;
}

[data-theme="dark"] {
  --bg-primary: #313e51;
  --text-primary: #ffffff;
}
```

**HTML Escaping**: Learned the importance of properly escaping HTML content to prevent parsing issues with quiz options containing HTML tags:

```js
escapeHtml(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
```

### Continued development

Areas I want to continue focusing on in future projects:

1. **Advanced CSS Animations**: Adding more sophisticated transitions and micro-interactions
2. **TypeScript Integration**: Converting the vanilla JavaScript to TypeScript for better type safety
3. **Performance Optimization**: Implementing lazy loading and code splitting techniques
4. **Testing**: Adding unit tests and end-to-end testing with tools like Jest and Playwright
5. **Accessibility**: Further improving keyboard navigation and screen reader support

## Author

- Frontend Mentor - [@angie-create](https://www.frontendmentor.io/profile/angie-create)