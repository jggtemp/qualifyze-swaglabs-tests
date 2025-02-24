# 🧪 Swag Labs Playwright Test Suite

This repository contains automated tests for [Swag Labs](https://www.saucedemo.com/) using **Playwright**.

## 📌 Table of Contents
- [📦 Installation](#-installation)
- [🚀 Running Tests](#-running-tests)
    - [Run All Tests](#run-all-tests)
    - [Run Tests by Category (Tags)](#run-tests-by-category-tags)
    - [Run Tests in Different Browsers](#run-tests-in-different-browsers)
    - [Run Tests in Headed Mode](#run-tests-in-headed-mode)
    - [Run Tests in Parallel](#run-tests-in-parallel)
- [🛠 Project Structure](#-project-structure)
- [🔖 Tags Used for Filtering](#-tags-used-for-filtering)
- [📄 Environment Variables](#-environment-variables)
- [📊 Test Reports](#-test-reports)

---

## 📦 Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/jggtemp/qualifyze-swaglabs-tests.git
cd qualifyze-swaglabs-tests
```

### 2️⃣ Install Dependencies
Node 18 required.
```sh
npm install
```

### 3️⃣ Install Playwright Browsers
```sh
npx playwright install
```

---

## 🚀 Running Tests

### Run All Tests
Some might fail. It's an expected behavior.
```sh
npx playwright test
```

### Run Tests by Category (Tags)
Run only **checkout tests**:
```sh
npx playwright test --grep "@checkout"
```

Run only **bug validation tests**:
```sh
npx playwright test --grep "@bug-validation"
```

Run only **security-related tests** (e.g., SQL Injection validation):
```sh
npx playwright test --grep "@security"
```

Run only **end-to-end tests**:
```sh
npx playwright test --grep "@e2e"
```

Run only **data integrity tests** (e.g., shared cart bug):
```sh
npx playwright test --grep "@data-integrity"
```

Run only **performance tests**:
Have in mind this will execute 10 workers and could be CPU and memory intensive.
```sh
npx playwright test --grep "@performance" --workers=10
```

### Run Tests in Different Browsers and Simulated Devices
Run tests in **Chrome**:
```sh
npx playwright test --project=chromium
```

Run tests in **Firefox**:
```sh
npx playwright test --project=firefox
```

Run tests in **Mobile**:
```sh
npx playwright test --project=mobile-chrome --grep-invert='@performance|@bug|@visual'
```

Run tests in **Visual Comparison mode**:
```sh
npx playwright test tests/visual-comparison.spec.ts --project=chromium
```

### Run Tests in Headed Mode (With UI)
```sh
npx playwright test --headed
```

### Run Tests in Parallel (Default)
Playwright runs tests **in parallel by default**. You can increase concurrency:
```sh
npx playwright test --workers=4
```

### Run Tests with Debugging Mode
```sh
npx playwright test --debug
```

---

## 🛠 Project Structure
```
📂 swaglabs-playwright-tests
│── 📂 tests
│   ├── checkout.spec.ts          # Full checkout flow test
│   ├── checkout_bugs.spec.ts     # Bug-related checkout tests
│   ├── login.spec.ts             # Login tests (multiple users, invalid logins)
│── 📂 pages
│   ├── LoginPage.ts              # Login page actions
│   ├── InventoryPage.ts          # Product inventory page actions
│   ├── CartPage.ts               # Shopping cart actions
│   ├── CheckoutFormPage.ts       # Checkout form interactions
│   ├── CheckoutOverviewPage.ts   # Checkout review page interactions
│   ├── CheckoutCompletePage.ts   # Checkout completion validation
│── 📂 utils
│   ├── locators.ts               # Centralized locators file
│── playwright.config.ts          # Playwright configuration
│── .env                          # Environment variables (Base URL, user credentials)
│── README.md                     # Project documentation
```

---

## 🔖 Tags Used for Filtering
| **Tag**           | **Description** |
|------------------|---------------|
| `@checkout`     | Checkout flow tests |
| `@e2e`         | End-to-end test scenarios |
| `@bug-validation` | Tests for reported bugs |
| `@bug`         | Specific bug-related tests |
| `@security`    | Security-related tests (e.g., SQL Injection) |
| `@data-integrity` | Tests for consistency issues (e.g., shared cart bug) |
| `@flow`        | Full user flow tests |

---

## 📊 Test Reports
Generate an **HTML Report**:
```sh
npx playwright test --reporter=html
```
Then, open the report:
```sh
npx playwright show-report
```

Generate a **JSON report**:
```sh
npx playwright test --reporter=json > test-results.json
```

