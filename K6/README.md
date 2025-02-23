# 🏎️ K6 Performance Testing with Docker

This repository contains a **K6 performance test** for load testing an authentication API using Docker. We simulate **100 concurrent users logging in** and making authenticated API requests.

## 📌 Features
- Uses **K6 in Docker** (no local installation required).
- Simulates **100 concurrent users** logging in.
- Stores the authentication token and makes **authenticated API requests**.
- Supports **gradual load ramp-up** testing.

## 🚀 Running the Test with Docker
### 1️⃣ **Run the Basic Test**
```sh
docker run --rm -v "$(pwd):/scripts" grafana/k6 run /scripts/performance-test.js
```

### 2️⃣ **Run the Test with Load Stages**
This version gradually increases traffic over time:
```sh
docker run --rm -v "$(pwd):/scripts" grafana/k6 run /scripts/performance-test.js --vus=20 --duration=1m
```

### 3️⃣ **Run the Test and Save Results**
To output test results as JSON:
```sh
docker run --rm -v "$(pwd):/scripts" grafana/k6 run /scripts/performance-test.js --out json=/scripts/results.json
```

## 🛠 Test Script (`performance-test.js`)
The test does the following:
1. **Logs in users** and extracts an authentication token.
2. **Sends an authenticated request** using the token.
3. **Checks for response validity** and simulates real user behavior.
4. **Gradually ramps up users for realistic load testing.**

## 🔖 Notes

## 🌍 Why We Changed the Web API
I initially attempted to test a frontend login page with some adaptations but K6 is designed for backend API load testing rather than interacting with UI elements. Since K6 cannot execute JavaScript or simulate browser interactions, we switched to a proper backend API (`reqres.in`). This allows us to accurately test authentication performance and scale without relying on UI automation tools like Playwright.
Also, Gatling and JMeter are for APIs too as long as I know...
This is an example on how to test and API with a tool like K6.
- **No need to install K6 locally** Just use Docker.
- Modify `vus` and `duration` values for different load scenarios.
- Consider integrating results into **Grafana for visualization**.


