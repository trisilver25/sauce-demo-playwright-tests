# Sauce Demo Playwright Regression

A playwright project used to perform a fully automated regression on the site "saucedemo.com"

# Prequisites:

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
   - Within .auth create 2 new files, lockedOutData.json, and loginData.json
     - For lockedOutData.json you'll need a "user" field, and a "pass" field, fill in this data utilizing
       saucedemo.com through the 2nd user listed, and the password provided.
     - For loginData.json you'll need a "user" field, a "pass" field, and a "invalid_pass" field
       Both user and pass can be found on saucedemo.com's first page, the 1st user will be used for this user field
       and the pass will be the common one found on the page.
4. Once everything is set up it's time to execute the test, run the following commands:
   - npx playwright test
   - npx playwright show-report

## JSON Examples of loginData and lockedOutData
