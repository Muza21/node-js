// 1) დაწერეთ ფუნცქია რომელსაც გადაეცემა 2 პარამეტრი, 1 - ობიექტი, 2- ფროფერთი რომელიც გინდათ რომ წაშალოს,
// ეს ფუნქცია დააბრუნებს ობიექტს რომელშიც წაშლილი იქნება ის ფროფერთი რასაც გადასცემთ.

const person = {
  name: "John",
  lastname: "Doe",
  age: 100,
};

const removeProperty = (obj, property) => {
  if (!obj.hasOwnProperty(property)) {
    return;
  }
  delete obj[property];
  return obj;
};
console.log("Ex1.");
console.log("Function returns:");
console.log(removeProperty(person, "age"));
console.log("The object that was passed:");
console.log(person);

// 2) მოცემული გაქვთ მასივი  [
//   { name: "Ana", score: 50 },
//   { name: "Nika", score: 80 },
//   { name: "Luka", score: 70 }
// ] თქვენი მიზანია დაწეროთ ფუნცქია რომელიც არგუმენტად მიიღებს ამ მასივს და დააბრუნებს ლიდერბორდს ქულების მიხედვით.
// შედეგი: [
//   { name: 'Nika', score: 80, rank: 1 },
//   { name: 'Luka', score: 70, rank: 2 },
//   { name: 'Ana',  score: 50, rank: 3 }
// ]
const array = [
  { name: "Ana", score: 50 },
  { name: "Nika", score: 80 },
  { name: "Lika", score: 70 },
  { name: "Anna", score: 51 },
  { name: "Nutsa", score: 85 },
  { name: "Luka", score: 73 },
];
console.log("Ex2.");
const res = array
  .sort((itemA, itemB) => itemB.score - itemA.score)
  .map((item, index) => ({ ...item, rank: index + 1 }));

console.log("Ranked list:");
console.log(res);

// 3) დაწერეთ ფუნცქია რომელიც დააბრუნებს მხოლოდ იმ ობიექტს რომლის სათაურიც ყველაზე გრძელია. მაგ: [
//   { title: "Up", year: 2009 }, { title: "The Lord of the Rings", year: 2001 }
// ] =>   { title: "The Lord of the Rings", year: 2001 }

console.log("Ex3.");
const movies = [
  { title: "Up", year: 2009 },
  { title: "The Lord of the Rings", year: 2001 },
  { title: "Matrix", year: 1999 },
];

const longestTitleMovie = movies.sort(
  (movieA, movieB) => movieB.title.length - movieA.title.length
)[0];
console.log("Longest title movie:", longestTitleMovie);

// 4) დაწერეთ ფუნქცია რომელიც გამოითვლის საშუალო ასაკს თითოეულ დეპარტამენტის და დააბრუნებს შესაბამის ობიექტს. მაგ: [
//   { name: "Ana", dept: "HR", age: 25 },
//   { name: "Nika", dept: "IT", age: 30 },
//   { name: "Luka", dept: "IT", age: 22 }
// ]. => { HR: 25, IT: 26 }

console.log("Ex4.");
const employees = [
  { name: "Ana", dept: "HR", age: 25 },
  { name: "Nika", dept: "IT", age: 30 },
  { name: "Luka", dept: "IT", age: 22 },
];
const reduced = employees.reduce((acc, cur) => {
  if (!acc[cur.dept]) {
    acc[cur.dept] = {};
  }
  acc[cur.dept] = {
    sum: (acc[cur.dept]["sum"] || 0) + cur.age,
    count: (acc[cur.dept]["count"] || 0) + 1,
  };
  return acc;
}, {});

const result = {};

for (let key of Object.keys(reduced)) {
  result[key] = reduced[key].sum / reduced[key].count;
}

console.log("Result:", result);

// 5) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს კომენტარების მასივს და დააბრუნებს სიტყვების რაოდენობას მაგ: [
//   { id:1, comment:"Hello world" },
//   { id:2, comment:"This is great!" },
//   { id:3, comment:"" }
// ] => 5
console.log("Ex5.");
const comments = [
  { id: 1, comment: "Hello world" },
  { id: 2, comment: "This is great!" },
  { id: 2, comment: "This          is           great!" },
  { id: 3, comment: "" },
  { id: 3, comment: "                                       " },
];

const countWords = comments.reduce((acc, cur) => {
  const tempWords = cur.comment.trim().replace(/ +/g, " ").split(" ");
  if (tempWords[0] === "") {
    return acc;
  }
  acc += tempWords.length;
  return acc;
}, 0);

console.log(`Words count: ${countWords}`);
