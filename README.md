# QA Practice with Playwright

This repository is designed for QA practice using [Playwright](https://playwright.dev/) to perform end-to-end testing on various input fields, including text, email, and password fields. It focuses on validating functionality and edge cases in a sample web application.

## Project Structure

```
.github/
    workflows/
        playwright.yml          # GitHub Actions workflow for running Playwright tests
.gitignore                  # Ignored files and directories
e2e/
    example.spec.js           # Example end-to-end test
package.json                # Project dependencies and scripts
playwright.config.js        # Playwright configuration file
test-results/
    .last-run.json            # Results of the last test run
inputs-email-Email-field-OtherHost-domain---invalid-chromium/
    error-context.md          # Error details for a failed test
tests/
    example.spec.js           # Example test
    inputs/
        email.spec.js           # Tests for email input field
        password.spec.js        # Tests for password input field
        text.spec.js            # Tests for text input field
utils/
    formUtils.js              # Utility functions for form testing
tests-examples/
    demo-todo-app.spec.js     # Example Playwright test for a demo app
```

## Features

- **Comprehensive Input Testing**: Validates text, email, and password input fields.
- **Robust Validation Scenarios**: Covers invalid inputs, edge cases, and boundary conditions.
- **CI/CD Integration**: Automated test execution with GitHub Actions.
- **Cross-Browser Support**: Configurable environment for multiple browsers.

## Prerequisites

Ensure the following are installed before running the project:

1. [Node.js](https://nodejs.org/) (version 16 or later)
2. [npm](https://www.npmjs.com/) (bundled with Node.js)
3. [Playwright Browsers](https://playwright.dev/docs/intro)

## Installation

1. Clone the repository:
     ```sh
     git clone <repository-url>
     cd QApractice
     ```
2. Install dependencies:
     ```sh
     npm install
     ```
3. Install Playwright browsers:
     ```sh
     npx playwright install --with-deps
     ```

## Running Tests

### Run All Tests
To execute all tests:
```sh
npx playwright test
```

### Run Specific Tests
To run tests in a specific file:
```sh
npx playwright test tests/inputs/email.spec.js
```

### View Test Report
After running tests, view the report:
```sh
npx playwright show-report
```

### Debug Tests
To debug tests interactively:
```sh
npx playwright test --debug
```

## Configuration

The Playwright configuration is defined in `playwright.config.js`. Key settings include:

- `testDir`: Directory containing test files (`./tests`).
- `timeout`: Maximum time for each test (30 seconds).
- `baseURL`: Base URL for the application under test (`https://www.qa-practice.com`).
- `projects`: Browser configurations (e.g., Chromium).

## Continuous Integration

This project uses GitHub Actions for CI. The workflow is defined in `playwright.yml` and runs tests on every push or pull request to the `main` or `master` branches.

## Troubleshooting

- If tests fail due to browser issues, ensure Playwright browsers are installed:
    ```sh
    npx playwright install --with-deps
    ```
- For debugging, use the `--debug` flag to run tests interactively.

## License

This project is licensed under the MIT License.

---

Replace `<repository-url>` with the actual URL of your GitHub repository before saving this content in your `README.md` file.