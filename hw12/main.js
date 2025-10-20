// 2) შექმენით სერვერი რომელიც უპასუხებს შემდეგი ტიპის რექუესთებს:
// GET  /about დააბრუნეთ რაიმე ტიპის ინფორმაცია მაგალითად, სახელი, გვარი, ჰობი და ა.შ

// GET /players უნდა დააბრუნოს მაისივი ფეხბურთელების რომელსაც წაიკითხავთ players.json დან fs მოდულით

// GET /players?nation=georgia უდნა დააბრუნოს მხოლოდ ქართველი ფეხბურთელები

// GET /players?nation=germany მხოლოდ გერმანელი ფეხბურტელები და ა.შ

// POST /players უნდა გაატანოთ ფეხბურთელის ყველა მონაცემები ბექენდში დაადოთ ვალიდაცია და ჩაწეროთ players.json ში.

// DELETE /players/1 წაშლის კონკრეტულ ფეღბურთელს და განაახლებს players.json-ს

const fs = require("fs/promises");
const path = require("path");
const http = require("http");
const url = require("url");
const filePath = path.join(__dirname, "players.json");

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === "GET" && parsedUrl.path === "/about") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ name: "John Doe" }));
    return;
  }

  if (req.method === "GET" && parsedUrl.pathname === "/players") {
    const text = await fs.readFile(filePath, "utf-8");
    let data = JSON.parse(text);
    const nation = parsedUrl.query.nation;
    if (nation) {
      data = data.filter(
        (p) => p.nation.toLowerCase() === nation.toLowerCase()
      );
    }
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(data));
  }

  if (req.method === "POST" && parsedUrl.pathname === "/players") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      const player = JSON.parse(body);

      if (
        !player.name ||
        !player.nation ||
        !player.age ||
        !player.club ||
        !player.position
      ) {
        res.writeHead(400, { "content-type": "application/json" });
        return res.end(
          JSON.stringify({
            success: false,
            message: "there are missing fields",
          })
        );
      }
      const text = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(text);
      const id = (data[data.length - 1]?.id || 0) + 1;
      const newPlayer = { id, ...player };
      data.push(newPlayer);
      await fs.writeFile(filePath, JSON.stringify(data));

      res.writeHead(201, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({ success: true, message: "created successfully" })
      );
    });
  }

  if (req.method === "DELETE" && parsedUrl.pathname.startsWith("/players")) {
    const id = Number(parsedUrl.pathname.split("/")[2]);

    if (!id) {
      res.writeHead(400, { "content-type": "application/json" });
      return res.end(JSON.stringify({ success: false, message: "invalid id" }));
    }
    const text = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(text);
    const index = data.findIndex((p) => p.id === id);

    if (index === -1) {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({
          success: false,
          message: "there are no players to be found with given id",
        })
      );
    }
    data.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(data));

    res.writeHead(200, { "content-type": "application/json" });
    return res.end(
      JSON.stringify({ success: true, message: "deleted successfully" })
    );
  }
});

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
