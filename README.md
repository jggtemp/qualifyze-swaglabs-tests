# Qualifyze Swag Labs Tests 🧪

This repository contains **automated UI and performance tests** for the **Swag Labs demo application** as part of the **Qualifyze technical case**.  

The tests are written using **Playwright** for functional, performance and visual UI testing, and **K6** for an external demo API load testing.

There are no integration tests because the application does not have any Back-End communication to mock. 

A **GitHub Actions CI/CD pipeline** ensures tests run automatically and **publishes detailed reports to GitHub Pages**.

---

## 🚀 **Project Overview**
### 🔹 **Technologies Used**
- [Playwright](https://playwright.dev/) – End-to-end UI automation  
- [K6](https://k6.io/) – Performance/load testing  
- [GitHub Actions](https://docs.github.com/en/actions) – CI/CD pipeline  
- [Pixelmatch](https://github.com/mapbox/pixelmatch) – Image comparison for visual testing  
- [GitHub Pages](https://pages.github.com/) – Publishes test reports  

---

## ⚙️ **GitHub Actions Pipeline**
The **CI/CD pipeline** automatically runs tests and generates reports on **each pull request to `develop` or `main`**.  
After execution, reports are uploaded and **published to GitHub Pages**.

### 🔄 **Pipeline Jobs**
| Job | Description |
|------------------|------------------------------------------------|
| **📦 Cache Docker** | Caches Playwright Docker image for faster test runs. |
| **🖥️ Desktop Tests (No Bugs)** | Runs functional UI tests on **desktop browsers**, excluding known bugs. |
| **🐞 Desktop Bug Tests** | Runs **bug-focused tests** that validate known issues. |
| **🖼️ Visual Comparison** | Compares UI screenshots between different test runs. |
| **⚡ Performance Testing** | Executes **K6 load tests** on API endpoints. |
| **📤 Deploy Reports** | Uploads **Playwright test reports** and **K6 results** to GitHub Pages. |

🔗 **CI/CD Workflows:**  
- **Pipeline File:** `.github/workflows/tests.yml`

---

## 📌 **Test Options**
The tests can be executed **locally** or via **GitHub Actions**.

[Playwright README](https://github.com/jggtemp/qualifyze-swaglabs-tests/blob/main/playwright/README.md)

[K6 README](https://github.com/jggtemp/qualifyze-swaglabs-tests/blob/main/K6/README.md)

---

## 📊 **Test Reports**
The pipeline **automatically publishes reports** to GitHub Pages.  
🔗 **View All Reports Here:**  
👉 **[Test Reports Dashboard](https://jggtemp.github.io/qualifyze-swaglabs-tests/)**
You can find failure screenshots and videos inside each failed test report.
Examples:

https://jggtemp.github.io/qualifyze-swaglabs-tests/desktop-bugs/index.html#?testId=65b32e862787c7fc915e-9dc12e770b5147c38e4b

https://jggtemp.github.io/qualifyze-swaglabs-tests/visual/index.html#?testId=93f91707f26ac243999c-bd6f62f42a274e4ee0a3


### 📁 **Available Reports**
| Report | Description | URL |
|--------|------------|----|
| 🖥️ **Desktop Report (No Bugs)** | Functional UI tests (excluding known issues) | [View Report](https://jggtemp.github.io/qualifyze-swaglabs-tests/desktop-no-bugs/) |
| 🐞 **Bug Report** | Tests that expose known issues | [View Report](https://jggtemp.github.io/qualifyze-swaglabs-tests/desktop-bugs/) |
| 🖼️ **Visual Report** | Screenshot comparisons for UI consistency | [View Report](https://jggtemp.github.io/qualifyze-swaglabs-tests/visual/) |
| ⚡ **Performance Report** | API load test results using K6 | [View Report](https://jggtemp.github.io/qualifyze-swaglabs-tests/performance/) |
| 📊 **Raw K6 Results** | Detailed performance metrics | [View Results](https://github.com/jggtemp/qualifyze-swaglabs-tests/blob/main/K6/results.txt) |

---
### **Where are the reports stored?**
- **GitHub Pages**: `gh-pages` branch. https://jggtemp.github.io/qualifyze-swaglabs-tests/
- **Local runs**: Inside `playwright/playwright-report/`.

