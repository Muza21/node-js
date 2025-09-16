// 1) დაწერეთ ფუნცქცია რომელიც მიიღებს მასივს არგუმენტად და დააბრუნებს ამ მასივის საშუალო არითმეტიკულს.

const average = (arr) => {
  return arr.reduce((acc, cur) => (acc += cur), 0) / arr.length;
};

console.log(average([1, 2, 3, 4, 5, 6, 7]));
console.log(average([11, 22, 43, 34, 65, 56, 37]));

// 2) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს რიცხვს და დააბრუნებს ამ რიცხვის შებრუნებულ მასივს თითოეული წევრით.
// მაგ: 35231 → [1,3,2,5,3]. 0 => [0]

const reverseNumberArray = (num) => {
  return (num + "")
    .split("")
    .reverse()
    .map((digit) => +digit);
};
console.log(reverseNumberArray(12345));
console.log(reverseNumberArray(56789));

// 3) დაწერეთ ფუნქცია რომელიც მიიღებს 2 მასივს არგუმენტად და დააბრუნებს მასივის მხოლოდ იმ წევრებს რომელსაც მეორე მასივი არ შეიცავს
// მაგ: a = [1, 2] და b = [1] დააბრუნეთ [2]. a = [1, 2, 2, 2, 3] და b = [2] დააბრუნეთ [1, 3].

const returnDifferentNums = (arr1, arr2) => {
  return arr1.filter((item) => !arr2.includes(item));
};

console.log(returnDifferentNums([1, 2], [1]));
console.log(returnDifferentNums([1, 2, 2, 2, 3], [2]));

// 4) დაწერეთ ფუნცქცია რომელსაც გადმოეცემა მასივი და იპოვე მასივში მეორე ყველაზე დიდი რიცხვი. მაგ: [10, 40, 20, 5, 30] => 30

const secondMaxNum = (arr) => {
  return arr.sort((a, b) => b - a)[1];
};

console.log(secondMaxNum([10, 40, 20, 5, 30]));

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს სტირნგების მასივს და უნდა დააბრუნოტ მხოლოდ იმ სიტყვების მასივი რომლებიც არის პალინდორმი:
// * პალინდორმი ეწოდება სიტყვას რომელიც შემობრუნების შემდეგ იგივე მნიშვნელობას ინარჩუნებს.
// მაგ: ["mom", "car", "level", "dog"] => ["mom", "level"]

const polindromWords = (arr) => {
  return arr.filter((word) => word === word.split("").reverse().join(""));
};

console.log(polindromWords(["mom", "car", "level", "dog"]));

// 6)დაწერეთ ფუნცქია რომელიც მიიღებს რიცხვების მასივს და დააბრუნებთ რომელია ყველაზე ხშირად გამეორებადი რიცხვი მაგ: [4, 5, 6, 5, 4, 5] => 5

const mostOccuredNum = (arr) => {
  const obj = arr.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  return +Object.entries(obj).reduce((acc, cur) => {
    if (acc[1] < cur[1]) {
      return cur;
    }
    return acc;
  })[0];
};

console.log(mostOccuredNum([4, 5, 6, 5, 4, 5]));
