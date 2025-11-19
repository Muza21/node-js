// 1) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს სტრინგს და დააბრუნებს ამ სტირნგის აბრივიატურას მაგალითად getAbbr('John Doe') => "J.D"

const abbreviateName = (fullName) => {
  return fullName
    .split(" ")
    .map((name) => name[0].toUpperCase() + ".")
    .join("");
};

console.log("\n1)");
console.log(abbreviateName("John Doe"));
console.log(abbreviateName("Firstname Lastname"));

// 2) დაწერეთ ფუნცქია რომელიც არგუმენტად მიიღებს რიცხვს და დააბრუნებს ამ რიცხვების ჯამს მაგ: getSumOfDigit(123) => 6 ახსნა 1 + 2 + 3

const getSumOfDigit = (number) => {
  let sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }
  return sum;
};
console.log("\n2)");
console.log(getSumOfDigit(123456789));
console.log(getSumOfDigit(123));

// 3) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს სტრინგს და წაშლის ამ სტრინგიდან ყველა გამეორებად ასოს. მაგ: removeDuplicates('banana') => 'ban'

const removeDuplicates = (str) => {
  return str
    .split("")
    .filter((char, index) => str.indexOf(char) === index)
    .join("");
};

console.log("\n3)");
console.log(removeDuplicates("bananana"));

// 4) დაწერეთ ფუნქცია რომელიც წაშლის ყველა სფეისს სტრინგინდან მაგ: removeSpaces('1 2 aab') => '12aab' უნდა გამოიტენოთ for ლუპი

const removeSpaces = (str) => {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      res += str[i];
    }
  }
  return res;
};

console.log("\n4)");
console.log(removeSpaces("1 2 aab     sa"));

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს წინადადებას და შემოაბრუნებს თითოეულ სიტყვას მაგ: reverseEachWord('Hello World') =>  "olleH dlroW"

const reverseEachWord = (sentence) => {
  return sentence
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
};
console.log("\n5)");
console.log(reverseEachWord("Hello World"));
console.log(reverseEachWord("Each word is reversed in this sentence"));
