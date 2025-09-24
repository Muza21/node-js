// 1) რა თანმიმდევრობით დაილოგება შემდეგი ინსტრუქციები:
// console.log("1");
// setTimeout(() => console.log("2"), 100);
// setTimeout(() => console.log("3"), 0);
// Promise.resolve().then(() => console.log("4"));
// console.log("5");

console.log("Ex1");
console.log("1 5 4 3 2");
// answer before running the code: 1 5 4 3 2
// the correct answer: 1 5 4 3 2

// 2) რა თანმიმდევრობით დაილოგება შემდეგი ინსტრუქციები:
// console.log("1");
// setTimeout(() => console.log("2"), 0);
// Promise.resolve().then(() => {
//   console.log("3");
//   setTimeout(() => console.log("4"), 0);
// });
// console.log("5");
console.log("Ex2");
console.log("1 5 3 2 4");
// answer before running the code: 1 5 3 2 4
// the correct answer: 1 5 3 2 4

// 3) დაწერეთ სლიფ ფუნქცია რომელიც პარამეტრად მიიღებს მილიწამს და დაიძინებს, ანუ სისტემა გაჩერდება პარამეტრის მიხედვით. await sleep(1000) სადაც ამ ფუნცქიას გამოიყენებთ 1 წამი უნდა გაჩერდეს ხოლმე სისტემა, გაითვალისწინეთ await ით უნდა გააჩეროთ ანუ პრომისი უნდა დააბრუნოს ფუნქციამ

console.log("Ex3");

const sleep = async (miliSeconds) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, miliSeconds);
  }).then((res) => res);
};
await sleep(1000);

// 4) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს რიცხვს 1-დან 20-მდე თქვენი მიზანია ფუნცქიის შიგნით ფუნქციამ ყოველ 1 წამში რენდომ რიცხვი დააგენერიროს მანამ სანამ რენდომ დაგენერირებული რიცხვი არ დამეთხვევა პარამეტს, როგორც კი ისინი ერთმანეთს დაემთხვევა გააჩერეთ რენდომ რიცხვის დალოგვა.

console.log("Ex4");

const randomNum = (num) => {
  const interval = setInterval(() => {
    const randomNumber = Math.ceil(Math.random() * 19);
    console.log(randomNumber);
    if (randomNumber === num) {
      clearInterval(interval);
    }
  }, 1000);
};

randomNum(15);

// 5) დაწერეთ ფუნცქია რომელსაც გადაეცემა 2 პარამეტრი 1 - ნებისმიერი რიცხვი 2 - დროის ერთეული მილიწამებში, თქვენი მიზანია დალოგოთ რიცხვები ამ რიცხვიდან 0 მდე იმ დროის ინტერვალში რაც არის მეორე პარამეტრი და 0ზე გააჩეროთ.

const countdown = (num, time) => {
  const interval = setInterval(() => {
    console.log(num);
    num -= 1;
    if (num === 0) {
      clearInterval(interval);
    }
  }, time);
};

countdown(5, 500);
