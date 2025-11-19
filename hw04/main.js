// 1) წაშალეთ მასივის თითოეულ ელემენტს წაუშლის ბოლო სიმბოლოს მაგ: ["one","two","three"] => ["on","tw","thre"]

console.log("ex1");
const arr = ["one", "two", "three"];
const res = arr.map((item) => item.slice(0, -1));
console.log(res);

// 2) იპოვეთ მასივში 2 ყველაზე პატარა ელემენტის ჯამი, მაგ: [19,5,42,2,77] => 7

console.log("ex2");
const numbers = [19, 5, 42, 2, 77];
numbers.sort((a, b) => a - b);
console.log(numbers[0] + numbers[1]);

// 3) დააჯგუფეთ მოცემული მასივი ვალუტის მიხედვით, გაითვალისწინეთ თითეუილ ვალუტის ქვეშ უნდა შეინახოთ ტრანსაქციის მნიშვნელობა. მაგ:
// [
//   { amount: 10, currency: "USD" },
//   { amount: 20, currency: "EUR" },
//   { amount: 5,  currency: "USD" },
//   { amount: 50, currency: "EUR" }
// ]
// შედეგ: {
//   USD: [{ amount: 10 }, { amount: 5 }],
//   EUR: [{ amount: 20 }, { amount: 50 }]
// }

console.log("ex3");
const money = [
  { amount: 10, currency: "USD" },
  { amount: 20, currency: "EUR" },
  { amount: 5, currency: "USD" },
  { amount: 50, currency: "EUR" },
];

const transactions = money.reduce((acc, cur) => {
  if (!acc[cur.currency]) {
    acc[cur.currency] = [];
  }
  acc[cur.currency].push({ amount: cur.amount });
  return acc;
}, {});

console.log(transactions);

// 4) დაითვალეთ დადებითი რიცხვები და დააჯამეთ უარყოფითი რიცხვები პასუხი უნდა იყოს მასივი [10, -65]

console.log("ex4");
const nums = [1, -2, 3, -4, 5, -6, 7, -8, 9];
const result = nums.reduce(
  (acc, cur) => {
    if (cur > 0) {
      acc[0] += 1;
    } else {
      acc[1] += cur;
    }
    return acc;
  },
  [0, 0]
);
console.log(result);

// 5) გამოთვალეთ მასივის რიცხვების ჯამი ForEach ის გამოყენებით მაგ: [10, 12, 4, 2] => 28

console.log("ex5");
let sum = 0;
const numsArr = [10, 12, 4, 2];
numsArr.forEach((num) => {
  sum += num;
});
console.log(sum);

// 6) დაამუშავეთ მასივი რომ დააბრუნოს სტინგი მხოლოდ იმ ელემენტებით რომლის სიგრძე არის 5-ზე მეტი და შეაწებეთ #-ით
// მაგ: ["cat","parrot","dog","elephant"] => "PARROT#ELEPHANT"

console.log("ex6");
const answer = ["cat", "parrot", "dog", "elephant"]
  .filter((word) => word.length > 5)
  .map((word) => word.toUpperCase())
  .join("#");
console.log(answer);

// 7) დააჯგუფეთ მასივი კლასის მიხედვით და გამოითვალეთ საშუალო ქულა, მაგ:
// [
//   { name: "Ann",  cls: "A", grade: 90 },
//   { name: "Ben",  cls: "B", grade: 75 },
//   { name: "Cara", cls: "A", grade: 80 }
// ]
// შედეგი: {"A": 85, "B" 75}

console.log("ex7");
const studentInfo = [
  { name: "Ann", cls: "A", grade: 91 },
  { name: "Ben", cls: "B", grade: 85 },
  { name: "Cara", cls: "C", grade: 80 },
  { name: "Cara", cls: "D", grade: 70 },
  { name: "Cara", cls: "A", grade: 95 },
  { name: "Cara", cls: "C", grade: 76 },
];

const clsFrequency = {};

const averageGrade = studentInfo.reduce((acc, cur) => {
  acc[cur.cls] = (acc[cur.cls] || 0) + cur.grade;
  cur.grade;
  clsFrequency[cur.cls] = (clsFrequency[cur.cls] || 0) + 1;
  return acc;
}, {});

for (let key of Object.keys(averageGrade)) {
  averageGrade[key] /= clsFrequency[key];
}

console.log(averageGrade);
