# Sauce Demo Playwright Regression

A playwright project used to perform a fully automated regression on the site "saucedemo.com"

## Prerequisites:

- Node v20+

## Get Started

1. Clone the Repo to your local pc with git:
   - git clone https://github.com/trisilver25/sauce-demo-playwright-tests.git
2. In a terminal run the following commands:
   - npm install
   - npx playwright install
3. Set up your local User Data files to pull a username and password to run the tests with.
   - Create a new directory in the main directory labeled "playwright"
   - Within "playwright" create another directory ".auth"
   - Within .auth create 2 new files, lockedOutData.json, and loginData.json, follow the example json's in the JSON Examples section.
     Note: These are SauceDemo's publicly published test credentials, not real secrets.
4. Once everything is set up it's time to execute the test, run the following commands:
   - npx playwright test
   - npx playwright show-report

## JSON Examples:

loginData.json

```json
{
  "user": "standard_user",
  "pass": "secret_sauce",
  "invalid_pass": "1253"
}
```

lockedOutData.json

```json
{
  "user": "locked_out_user",
  "pass": "secret_sauce"
}
```
