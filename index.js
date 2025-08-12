const http = require("http");
const url = require("url");

// Example of a bug: function with unused variables
function sum(a, b) {
    let unusedVar = 42; // SonarQube might flag this
    return a + b;
}

// Example of a potential vulnerability: eval on user input
function runUserCode(input) {
    return eval(input); // This should trigger a security hotspot warning
}

// Simple HTTP server
http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;

    if (queryObject.action === "sum") {
        const result = sum(Number(queryObject.a), Number(queryObject.b));
        res.end(`Sum: ${result}`);
    } else if (queryObject.action === "exec") {
        const output = runUserCode(queryObject.code);
        res.end(`Executed: ${output}`);
    } else {
        res.end("Hello SonarQube");
    }
}).listen(3000, () => console.log("Server running on http://localhost:3000"));

