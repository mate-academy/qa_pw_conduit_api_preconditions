#  API preconditions for Conduit UI tests

## Table of contents

- [Description](#description)
- [Preparation](#preparation)
- [Main Task](#main-task)
- [Task Reporting](#task-reporting)

## Description

In this task you need to make all the test preconditions use API requests instead of UI actions.

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands:

    - `npm ci`
    - `npx playwright install`


## Main Task

1. Run all the test using the `npm run test-staging` and save the execution time for the future comparation.
2. Update the `profile` tests to use `loggedInUserAndPage` fixture instead of the `signUpUser` function.
- use create article tests as example. 
3. Update the `viewArticle` tests to create article using APIs instead of UI. 
4. Run all tests and make sure they are passing.
5. Record the new time of tests execution and compare it to the previous. 

## Task Reporting

1. Add and commit all your updates.
2. Push the code to the origin.
3. Create a PR for your changes.
4. Keep implementing suggestions from code review until your PR is approved.
