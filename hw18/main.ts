// // გადავწეროთ მოცემული ფაილი typescript_ზე.

// function calculateRectangleArea(rectangle) {
//   return rectangle.width * rectangle.height;
// }

interface Rectangle {
  width: number;
  height: number;
}

function calculateRectangleArea(rectangle: Rectangle): number {
  return rectangle.width * rectangle.height;
}

// function calculateRectanglePerimeter(rectangle) {
//   return 2 * (rectangle.width + rectangle.height);
// }

function calculateRectanglePerimeter(rectangle: Rectangle): number {
  return 2 * (rectangle.width + rectangle.height);
}

// function calculateCircleArea(circle) {
//   return Math.PI * Math.pow(circle.radius, 2);
// }

interface Circle {
  radius: number;
}

function calculateCircleArea(circle: Circle): number {
  return Math.PI * Math.pow(circle.radius, 2);
}

// function calculateCirclePerimeter(circle) {
//   return 2 * Math.PI * circle.radius;
// }

function calculateCirclePerimeter(circle: Circle): number {
  return 2 * Math.PI * circle.radius;
}

// // Independent Functions

// function addNumbers(a, b) {
//   return a + b;
// }

function addNumbers(a: number, b: number): number {
  return a + b;
}

// function multiplyNumbers(a, b) {
//   return a * b;
// }

function multiplyNumbers(a: number, b: number): number {
  return a * b;
}

// function capitalizeString(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// function filterEvenNumbers(numbers) {
//   return numbers.filter((num) => num % 2 === 0);
// }
function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter((num) => num % 2 === 0);
}
// function findMax(numbers) {
//   return Math.max(...numbers);
// }
function findMax(numbers: number[]): number {
  return Math.max(...numbers);
}

// function isPalindrome(str) {
//   const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
//   const reversedStr = cleanStr.split("").reverse().join("");
//   return cleanStr === reversedStr;
// }
function isPalindrome(str: string): boolean {
  const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const reversedStr = cleanStr.split("").reverse().join("");
  return cleanStr === reversedStr;
}
// function calculateFactorial(n) {
//   if (n === 0 || n === 1) {
//     return 1;
//   } else {
//     return n * calculateFactorial(n - 1);
//   }
// }
function calculateFactorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * calculateFactorial(n - 1);
  }
}
// // Test Cases

// // სასურველია გავაკეთოთ Rectangle და Circle კლაზები და დავუმატოთ შესაბამისი მეთოდები.

const rectangle: Rectangle = { width: 5, height: 8 };
const circle: Circle = { radius: 3 };

const rectangleArea = calculateRectangleArea(rectangle);
const rectanglePerimeter = calculateRectanglePerimeter(rectangle);

const circleArea = calculateCircleArea(circle);
const circlePerimeter = calculateCirclePerimeter(circle);

console.log(
  `Rectangle Area: ${rectangleArea}, Perimeter: ${rectanglePerimeter}`
);
console.log(`Circle Area: ${circleArea}, Perimeter: ${circlePerimeter}`);

const sumResult = addNumbers(5, 3);
const multiplicationResult = multiplyNumbers(4, 7);
const capitalizedString = capitalizeString("javascript is fun");
const evenNumbers = filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(`Sum: ${sumResult}`);
console.log(`Multiplication: ${multiplicationResult}`);
console.log(`Capitalized String: ${capitalizedString}`);
console.log(`Even Numbers: ${evenNumbers}`);

const maxNumber = findMax([23, 56, 12, 89, 43]);
const isPalindromeResult = isPalindrome("A man, a plan, a canal, Panama");
const factorialResult = calculateFactorial(5);

console.log(`Max Number: ${maxNumber}`);
console.log(`Is Palindrome: ${isPalindromeResult}`);
console.log(`Factorial: ${factorialResult}`);

// /*

// 2. შევქმნათ კლასი BankAccount რომელსაც ექნება accountNumber,balance და transactionHistory ფროფერთები.
//    კონსტრუქტორში უნდა ვიღებდეთ accountNumber და initialBalance მნიშვნელობებს.
//    გარედან არუნდა იყოს შესაძლებელი accountNumber, balance და transactionHistory შეცვლა.
//    კლასში უნდა გვქონდეს მეთოდები:
//    getAccountInfo
//    deposit - თანხის დამატება ანგარიშზე.
//    withdraw - თანხის მოკლება ანგარიშიდან.
//    transferFunds - გადარიცხვა სხვა BankAccount_ზე
//    getTransactionHistory - აბრუნებს transactionHistory_ მასივს
//    recordTransaction - transactionHistory_ში ამატებს ჩნაწერს ტრანსფერის შესახებ

//    შევქმნათ მინიმუმ 2 BankAccount_ის ინსტანსი.
//    გავაკეთოთ სხვადასხვა ოპერაციები.
//    დავბეჯდოთ შექმნილი ექაუნთების transactionHistory.

// */

interface Transaction {
  date: Date;
  action: string;
  amount: number;
}

class BankAccount {
  private accountNumber;
  private balance;
  private transactionHistory: Transaction[] = [];

  constructor(accountNumber: string, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  getAccountInfo() {
    return {
      accountNumber: this.accountNumber,
      balance: this.balance,
      transactionHistory: this.transactionHistory,
    };
  }

  deposit(amount: number) {
    this.balance += amount;
    this.recordTransaction({
      date: new Date(),
      action: "deposit",
      amount: amount,
    });
  }

  withdraw(amount: number) {
    if (this.balance < amount) {
      console.log("not enough balance");
      return;
    }
    this.balance -= amount;
    this.recordTransaction({
      date: new Date(),
      action: "withdraw",
      amount: amount,
    });
  }

  transferFunds(amount: number) {
    if (this.balance < amount) {
      console.log("not enough balance");
      return;
    }
    this.balance -= amount;
    this.recordTransaction({
      date: new Date(),
      action: "transfer",
      amount: amount,
    });
  }

  getTransactionHistory() {
    return this.transactionHistory;
  }

  private recordTransaction(transaction: Transaction) {
    this.transactionHistory.push(transaction);
  }
}

const bankAccount = new BankAccount("NODE07GE000123456789", 50000);
console.log(bankAccount.getTransactionHistory(), "transaction history");
console.log(bankAccount.transferFunds(5000), "make transfer");
console.log(bankAccount.withdraw(5000), "withdrawo money");
console.log(bankAccount.deposit(5000), "deposit");
console.log(bankAccount.getTransactionHistory(), "transaction history");
console.log(bankAccount.getAccountInfo(), "account info");
