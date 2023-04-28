
# Spring 4: REPL
## Project Details
Project Name: REPL <br/>
Project Team: Blake Shao (`tsha4`), Alyssa Loo (`aloo1`) <br/>
Repo: https://github.com/cs0320-s2023/sprint-4-aloo1-tshao4.git </br>
Estimate Hours: 20</br>

## Design Choices
### App
App is the class where the main components of the website is rendered, it helps render input box that takes in user input
and submits it, history box that contains the history of user inputs' corresponding outputs, and header of the web app. 
It initializes keeps track of `currentState`, the state of the web app at the moment, as a constant `DEFAULT_STATE` and `states`,
a list of the app's past states as an empty list.
### InputBox
This is the class that is responsible for rendering the inputBox component of the website, which is an input HTML element and a button. For it to function, it takes in props including:
- `handlers`: a map of string and REPL Functions, which prepares the functions the program is going to use and their call signatures
- `states`: the list of past program states held in App and its setter `setStates`
- `currentState`: the current state of the program held in App and its setter `setCurrentState`
Furthermore, InputBox prepares materials for `HistoryBox` to produce outputs on the web app. It takes in user input, updates some basic variables of `currentState`, matches the command with a function in handlers, modifies `currentState`, and updates `states` for `HistoryBox`'s usage.
### HistoryBox
This class is responsible for rending the HistoryBox component of the web app, which is the history of outputs from user inputs. For props, it takes in `states` a list of states tracked in `App` but initially modified and updated in `InputBox`. In HistoryBox, the class takes `states` and use the information to render them into appropriate HTML elements on the web app interface.
### Header
This class simply returns an HTML element of the website header
### APIFunctions
This is a class of utility functions to handlers' process. It contains functions that communicates with backend API and extract information based on different commands such as load, view, or search. It utilizes backend functionalities to product the outputs of the inputs, which in turn are used by handlers to update the new state.
### Handler
This is a class that contains all the possible commands functions the web app can take in and perform. It contains variable `handlers`, a map that maps each function's command name and its actually function for InputBox's use. For now it contains handlers for `mode`, `view`, `search`, and `load_file` commands. Besides, other developers can always edit the `handlers` map by adding new functions and deleting existing functions with `addFunction` and `deleteFunction` methods to customize the tool.
### State
State contains an interface that designates what essential information is needed to render user outputs reflective of the server state at the time of each input submission. It keeps track of the following:
- `verbose`: whether the program's mode at the time of user input submission of a specific command
- `filePath`: the file path of the file loaded at the time of user input submission of a specific command
- `input`: the user input at the time of user input submission of a specific command
- `output`: the output corresponding the `input`'s command and parameters
- `additionalHTML`: HTML elements, like tables, in addition to the output text
- `hasAdditionalHTML`: boolean tracking whether the output has additional HTML

### Utilities
This class contains utility functions and class/types for the program. 
- Functions for translating JSON data into table HTML Elements.
- It contains a `csvFile` class that is used to interpret JSON responses into a data structure to be turned into a HTML table.
- It also contains the generic interfact `REPLFunction` used to build the map of string command -> `REPLFunctions` for a generic REPL.

## Testing
We test using mocks in two ways:
1. In `mockDomTesting` we replace API handler functions in our app with mock handler functions. These functions that don't make any API calls but just retrieve mock CSV data. These tests are intended to test front-end logic (e.g. that `verbose` mode works as intended, or that when the CSV data returned has no rows when 'view' is called, our front-end prints "No rows to show.").
2. In `mswDomTesting` we use a mock service worker so as to actually test our API handlers. The mock service worker intercepts calls to the URL that our API handlers send GET requests to. The mock server accesses the same mock CSV data, and this test suite focuses on testing server-side errors (e.g. how our program handles when the backend returns that a file has not been loaded in-state, or when the user does not have file permissions to load a file, or when the column argument in search was invalid.)

We also do unit testing in `unitTesting` on adding and removing commands from the `Handler` map, and adding and removing commands while the App is live.

## Errors and Bugs
In the screenreader, previous commands are read out first before the table is read out.

## How to
- `To Test`: run `npm test`
- `To Run` : run `npm run dev` in terminal
    - Using the live server from aloo1's Sprint 3, here are the available csv files: ten-star.csv, headless-star.csv, stardata.csv
    - Using the mock data server, here are the available csv files: file1, file2, file3, fileEmpty

## Collaboration Credit
- dhan26 and nhe6 for reference on mock data.
- edStem #517 for the idea of using the Mock Service Worker library


