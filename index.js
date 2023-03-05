const http = require("http");
const fs = require("fs");

const ROUTES = {
  ROOT: "/",
  READ: "/read",
  WRITE: "/write",
  APPEND: "/append",
  DELETE: "/delete",
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case ROUTES.ROOT:
      try {
        const html = fs.readFileSync("./index.html");
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        res.write(html);
        res.end();
      } catch (err) {
        res.writeHead(500, {
          "Content-Type": "text/html",
        });
        res.write("<h1>Server Error</h1>");
        res.end();
      }
      return;

    case ROUTES.READ:
      try {
        const firstTXT = fs.readFileSync("./first.txt");
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.write(firstTXT);
        res.end();
      } catch (err) {
        res.writeHead(500, {
          "Content-Type": "text/html",
        });
        res.write("<h1>Server Error</h1>");
        res.end();
      }

      return;

    case ROUTES.WRITE:
      try {
        const firstTXT = fs.readFileSync("./first.txt");
        fs.writeFileSync("./second.txt", firstTXT);
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.write("Done");
        res.end();
      } catch (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.write("Operation Failed");
        res.end();
      }

      return;

    case ROUTES.APPEND:
      try {
        fs.appendFileSync("./first.txt", " No! It will be full not pull ! 😑 ");
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.write("Done");
        res.end();
      } catch (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.write("Operation Failed");
        res.end();
      }
      return;

    case ROUTES.DELETE:
      try {
        fs.rmSync("./second.txt");
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.write("Done");
        res.end();
      } catch (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.write("Operation Failed");
        res.end();
      }
      return;

    default:
      res.writeHead(400, "Not Found");
      res.write("Not Found 404");
      res.end();
      return;
  }
});

const PORT = 5000;

server.listen(PORT);
