# Text-Emoji Converter Application

This repository hosts the **Text-to-Emoji Conversion Project**. Our team, **The Agents**, chose a **detective** theme. The app creates a fun way for all people to communicate with each other using text-to-emoji conversions.

---

## Team Structure

- **Leads:** Helena Bender and Rahat Bhatia
- **Back-End Team:** Akshit Agarwal, Rahat Bhatia, Bimal Gyawali, Zhe Kan, Astoria Ma, Haiyi Xing
- **Front-End Team:** Helena Bender, Bhavik Chandna, Liam Hardy, Cynthia Vuong, Grace Yang
- **New Team:** Cheng and Chuanqi

---

## Setup & Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm

### Installation

1. Clone the repository:

- `cd text-emoji-converter`

2. Install dependencies:

- `npm install`

3. Start the application:

- `npm start`

---

## Running

### Local Development

- `npm start`
- `http://localhost:3000`

### Vercel Deployment

- The app is automatically deployed to Vercel when changes are pushed to the main branch.
- **Live URL:** [https://text-emoji-converter-eight.vercel.app/]

---

## Code Style and Formatting

The repository on the main branch enforces strict code style and format checks. Pull requests can only be merged once all checks pass.

Run checks locally:

- `npm install`
- `npm run lint`

Fix format issues:

- `npx prettier --write .`
- `npx eslint . --fix`
- `npx stylelint '**/*.{css,scss}' --fix`

The checks performed:

1. Prettier: `prettier --check .`
2. JavaScript Linting: `eslint .`
3. CSS/SCSS Linting: `stylelint '**/*.{css,scss}'`

Note: Some issues may require manual fixes. Using VSCode extensions for ESLint and Prettier is highly recommended.

---

## Unit Tests

We have a Node.js built-in test runner. The specific testcases we have are

- test/translate.test.js - Tests for translation functionality
- test/utils.test.js - Tests for utility functions

---

## Pull Requests

1. All work should be done on feature branches.
2. Create PRs from feature branches to main branch once completed.
3. PR titles should be descriptive and follow the commit conventions:
   - [PR title guidelines](https://flank.github.io/flank/pr_titles/)

---

## Documentation

- Refer to the [project documentation repository](https://github.com/CSE210-FA25-Team04/documentation) for detailed guides and instructions.

---

## Team Communication

- Refer to the [meeting notes repository](https://github.com/CSE210-FA25-Team04/meeting-notes) for updates, discussions, and team meeting insights.
