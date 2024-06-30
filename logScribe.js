const fs = require("fs");
const cardinal = require("cardinal");

function extractStackInfo(stackLine) {
  const lineNumber = parseInt(stackLine.match(/:(\d+):\d+/)[1], 10);
  const fileNameMatch = stackLine.match(/\((.*):[0-9]+:[0-9]+\)/);
  return {
    lineNumber,
    fileName: fileNameMatch ? fileNameMatch[1] : "",
  };
}

function getRelevantCodeSnippet(fileName, startLine, endLine) {
  const fileContent = fs.readFileSync(fileName, "utf-8").split("\n");
  return fileContent.slice(startLine, endLine).map((line, index) => ({
    line: line,
    number: startLine + index + 1,
  }));
}

function logScribe(message, options = {}) {
  const error = new Error();
  const stackLines = error.stack.split("\n");
  const relevantStackLine = stackLines[2];
  const { fileName, lineNumber } = extractStackInfo(relevantStackLine);

  const linesAbove = options.linesAbove || 5;
  const linesBelow = options.linesBelow || 2;
  const fullList = options.fullList || false;
  const lineNumbers = options.lineNumbers !== false;

  console.log(`${message} (logged at line ${lineNumber})`);
  console.log(`Error occurred in file: ${fileName} at line ${lineNumber}`);

  if (fullList) {
    console.log("Full Stack Trace:");
    stackLines.forEach((line, index) => {
      if (index > 0) console.log(line);
    });
  }

  const startLine = Math.max(0, lineNumber - linesAbove - 1);
  const endLine = Math.min(lineNumber + linesBelow, error.stack.length);

  const codeSnippet = getRelevantCodeSnippet(fileName, startLine, endLine);
  codeSnippet.forEach(({ line, number }) => {
    try {
      const highlightedLine = cardinal.highlight(line);
      const lineDisplay = lineNumbers ? `${number}: ` : "";
      console.log(`${lineDisplay}${highlightedLine}`);
    } catch (e) {
      const lineDisplay = lineNumbers ? `${number}: ` : "";
      console.log(`${lineDisplay}${line}`);
    }
  });
}

module.exports = logScribe;
