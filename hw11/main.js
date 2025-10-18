// 1) წამოიღეთ ინფომრაცია ამ API-დან  https://jsonplaceholder.typicode.com/users და მირებული შედეგი ჩაწერეთ users.json ში ოღონდ იუზერებს უნდა ქონდეთ მხოლოდ id, name, username და email

const fs = require("fs/promises");
const path = require("path");

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  const mapedUsers = users.map(({ id, name, username, email }) => ({
    id,
    name,
    username,
    email,
  }));
  const filePath = path.join(__dirname, "data/users.json");
  await fs.writeFile(filePath, JSON.stringify(mapedUsers));
};
fetchUsers();

// 4) შექმენით ფაილი random.txt შიგნით დაწერეთ რაიმე წინადადება თქვენი მიზანია დაითვალოთ რამდენი სიტყვა, რამდენი ხმოვანი და რამდენი ასოა ამ ფაილში და ჩაწეროთ შედეგი result.json ში შემდეგი სახით  {word: 20, vowel: 64, chars: 152}

const main = async () => {
  const filePath = path.join(__dirname, "random.txt");
  const resultPath = path.join(__dirname, "data/result.json");
  const text = await fs.readFile(filePath, "utf-8");
  if (text.trim().length === 0) {
    return;
  }
  const word = text.trim().split(/ +/).length;
  const vowel = text.match(/[aeiou]/gi).length;
  const chars = text.replace(/ /g, "").length;
  await fs.writeFile(resultPath, JSON.stringify({ word, vowel, chars }));
};

main();
