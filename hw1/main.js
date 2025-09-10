// 1) დაწერეთ ფუნცქია რომელიც გადააკონვერტირებს ცელსიუს ფარენჰეიტში და დააბრუნებს პასუხს.
const convertToFahrenheit = (celsius) => {
  return celsius * 1.8 + 32;
};

const celsius1 = 10;
const celsius2 = 20;
const celsius3 = 30;

console.log("Ex. 1");
console.log(celsius1 + "°C = " + convertToFahrenheit(celsius1) + "°F");
console.log(celsius2 + "°C = " + convertToFahrenheit(celsius2) + "°F");
console.log(celsius3 + "°C = " + convertToFahrenheit(celsius3) + "°F");

// 2) დაწერე თუნცქია რომელიც მიიღებს სტრინგს არგუმენტად და დააბრუნებს ამ სრინგის შებრუნებულს(reverse).

const reverseString = (str) => {
  return str.split("").reverse().join("");
};

console.log("Ex. 2");
console.log(reverseString("hello"));
console.log(reverseString("world"));
console.log(reverseString("12345"));

// 3) დაწერეთ ფუნქცია რომელიც პარამეტრად მიიღებს წინადადებას და დათვლის რამდენი სიტყვაა შიგნით
// (ეს ლექციაზე არ გაგვიკეთებია მაგრამ შეგიძლია დასერჩოთ)

const countWordsInSentence = (sentence) => {
  return sentence.split(" ").length;
};

console.log("Ex. 3");
console.log(
  'sentence: "this should have 5 words" have ' +
    countWordsInSentence("this should have 5 words") +
    " words"
);

console.log(
  'sentence: "some random sentence that have couple of words in it" have ' +
    countWordsInSentence(
      "some random sentence that have couple of words in it"
    ) +
    " words"
);

// 4) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს სიტყვას და დააბრუნებს რამდენი ხმოვანია ამ სიტყვაში
console.log("Ex. 4");
const vowels = ["a", "e", "i", "o", "u"];
const countVowel = (word) => {
  const wordInLowerCase = word.toLowerCase();
  let count = 0;
  for (let i = 0; i < wordInLowerCase.length; i++) {
    if (vowels.includes(wordInLowerCase[i])) {
      count++;
    }
  }
  return count;
};

console.log(countVowel("lasha"));

// 5) დაწერეთ ფუნცქია რომელიც მიიღებს რიცხს პარამეტრად და დაგიბრუნებთ ამ რიცხვის ფაქტორიალს

const factorial = (num) => {
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }
  return result;
};

console.log("Ex. 5");
console.log(factorial(5));
console.log(factorial(10));
console.log(factorial(6));

// 6) დაწერეთ ფუნცქია რომლეიც მიიღებს რიცხს პარამეტრად და დაგიბრუნებთ 0 დან ამ რიცხვამდე მხოლოდ ლუწი
// რიცხვების ჯამს

const evenNumSum = (num) => {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (i % 2 === 0) {
      sum += i;
    }
  }
  return sum;
};

console.log("Ex. 6");
console.log(evenNumSum(10));
console.log(evenNumSum(5));
console.log(evenNumSum(20));

// 7) დაწერეთ ფუნცქია რომელიც მიიღებს სტუდენტის ქულას არგუმენტად და დაგირბუნებთ სტუდენტის შეფასებას A,B,C,E,F

const evaluateStudentScore = (score) => {
  if (score > 90) {
    return "A";
  } else if (score > 80) {
    return "B";
  } else if (score > 70) {
    return "C";
  } else if (score > 50) {
    return "E";
  } else {
    return "F";
  }
};

console.log("Ex. 7");
console.log("100 = " + evaluateStudentScore(100));
console.log("70 = " + evaluateStudentScore(70));
console.log("71 = " + evaluateStudentScore(71));
console.log("51 = " + evaluateStudentScore(51));
console.log("81 = " + evaluateStudentScore(81));
console.log("80 = " + evaluateStudentScore(80));

// 8) დაწერეთ ფუნცქია რომელიც მიიღებს პაროლს პარამეტრად თქვენი მიზანია შეამოწმოთ თუ არის 8 სიმბოლოზე მეტი
// შეიცავს რიცხვს და ერთი დიდ ასოს(capital letter)

const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const validatePassword = (pass) => {
  const passwordLength = pass.length;
  if (passwordLength <= 8) {
    return "password should be more than 8 characters";
  }

  let hasDigit = false;
  for (let i = 0; i < digits.length; i++) {
    if (pass.split("").includes(digits[i])) {
      hasDigit = true;
    }
  }
  if (!hasDigit) {
    return "password should have at least one digit";
  }

  let hasUpperCase = false;
  for (let i = 0; i < passwordLength; i++) {
    if (isNaN(pass[i] * 1) && pass[i] === pass[i].toUpperCase()) {
      hasUpperCase = true;
    }
  }
  if (!hasUpperCase) {
    return "password should have at least one capital letter";
  }

  return true;
};

console.log("Ex. 8");
console.log(validatePassword("passwords1S"));
