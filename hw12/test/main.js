// 1) წინასწარ შექმენით შემდეგი ტიპის ფოლდერები:
// /Task12
//    test/
//        main.txt
//     test2/
//         main.txt
//     main.js
//      second.txt
// და ჩაწერეთ შიგნით რენდომ ტექსტი თითოეულში თქვენი მიზანია დაწეროთ ფუნცქია რომელიც წაიკითხავს რეკურსიულად ყველა .txt გაფარტოების ფაილს და დაგილოგავთ სულ რამდენი სიტყვაა ყველა ფაილში ერთად, პლუს რამდენი, ხმოვანი.
const fs = require("fs/promises");
const path = require("path");
let totalWords = 0;
let totalVowerls = 0;
const fullPath = path.join(__dirname);
const readFiles = async (filePath = fullPath) => {
  const items = await fs.readdir(filePath, { withFileTypes: true });
  for (const item of items) {
    if (item.isFile() && path.extname(item.name).toLowerCase() === ".txt") {
      const currentFilePath = path.join(filePath, item.name);
      const text = await fs.readFile(currentFilePath, "utf-8");
      const word = text.trim().split(/ +/).length;
      const vowel = text.match(/[aeiou]/gi).length;
      totalWords += word;
      totalVowerls += vowel;
    }
    if (item.isDirectory()) {
      await readFiles(path.join(filePath, item.name));
    }
  }
};
(async () => {
  await readFiles();
  console.log("words:", totalWords);
  console.log("vowel:", totalVowerls);
})();
