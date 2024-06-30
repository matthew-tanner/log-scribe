# LogScribe

A simple Node.js module to enhance logging by including the error message, file name, line number, and a snippet of code surrounding the log call.

## Features

- Logs the message with additional context.
- Shows the exact location (file and line number) of the log call.
- Displays a code snippet around the log call with syntax highlighting.

## Installation

Copy the `logScribe.js` file into your Node.js project.

## Usage

```javascript
const logScribe = require('./logScribe');

function myFunction() {
    // Your code here
    logScribe('Your log message');
}

myFunction();
```

#### Output (see test.js for example)
```js
Error occurred in file: full/path/to/test.js at line 7
2: 
3: function myFunction() {
4:   try {
5:     throw new Error("Something went wrong");
6:   } catch (e) {
7:     logScribe(e);
8:     logScribe(e, {
9:       contextLinesAbove: 3,
```

## Configuration

logScribe accepts an optional config object to customize the logging output:

- linesAbove (default: 5): Number of lines to show above the log call.
- linesBelow (default: 2): Number of lines to show below the log call.
- fullList (default: false): Whether to print the full stack trace.
- lineNumbers (default: true): Whether to show line numbers in the code snippet.

### Example usage with Configuration
```javascript
const logScribe = require('./LogScribe');

function myFunction() {
    // Your code here
    logScribe('Your log message', {
        linesAbove: 3,
        linesBelow: 3,
        fullList: true,
        lineNumbers: true
    });
}

myFunction();
```

## Contributing

Feel free to fork this project, submit issues, and make pull requests. Contributions are welcome!