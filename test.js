const logScribe = require("./logScribe");

function myFunction() {
  try {
    throw new Error("Something went wrong");
  } catch (e) {
    logScribe(e);
    logScribe(e, {
      contextLinesAbove: 3,
      contextLinesBelow: 1,
      includeFullStacktrace: true,
      lineNumbers: false,
    });
  }
}

myFunction();
