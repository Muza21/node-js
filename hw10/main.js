// 1) დაწერეთ ფუნცქია რომელიც პარამეტრად მიიღებს ობიექტების მასივს, დაჯგუფეთ შეკვეთები date-ით და დაითვალეთ დღიური ჯამი.
// ინფუთი: [{date:'2025-01-01',amount:12.5},{date:'2025-01-01',amount:7.5},{date:'2025-01-02',amount:10}]
// აუთფუთი: {'2025-01-01':20,'2025-01-02':10}
const arr = [
  { date: "2025-01-01", amount: 12.5 },
  { date: "2025-01-01", amount: 7.5 },
  { date: "2025-01-02", amount: 10 },
];

const res = arr.reduce((acc, cur) => {
  acc[cur.date] = (acc[cur.date] || 0) + cur.amount;
  return acc;
}, {});
console.log("ex1", res);

// 2) პროდუქტები დაჯგუფეთ vendor-ით და იპოვეთ საშუალო price.
// ინფუთი: [{vendor:'A',price:10},{vendor:'A',price:20},{vendor:'B',price:15}]
// აუთფუთი: {A:15, B:15}

const productsData = [
  { vendor: "A", price: 10 },
  { vendor: "A", price: 20 },
  { vendor: "B", price: 15 },
];

const obj = productsData.reduce((acc, cur) => {
  if (!acc[cur.vendor]) acc[cur.vendor] = { totalPrice: 0, count: 0 };
  acc[cur.vendor].totalPrice += cur.price;
  acc[cur.vendor].count++;
  return acc;
}, {});

Object.keys(obj).forEach((key) => {
  obj[key] = obj[key].totalPrice / obj[key].count;
});
console.log("ex2", obj);

// 3) დაწერეთ ფუნქცია, რომელიც მიიღებს სტრიქონების მასივს და დააბრუნებს ყველაზე გრძელ სტრიქონს. Input: ["apple", "banana", "kiwi"] Output: "banana"

const fruits = ["apple", "banana", "kiwi"];
const largestWord = (words) => words.toSorted((a, b) => b.length - a.length)[0];
console.log("ex3", largestWord(fruits));

// 4) დაწერეთ ფუნქცია, რომელიც მიიღებს ობიექტს და დააბრუნებს მის მნიშვნელობების ჯამს. Input: {x:5, y:3} Output: 8

const sumObjValues = (param) => {
  return Object.keys(param).reduce((acc, cur) => acc + param[cur], 0);
};
console.log("ex4", sumObjValues({ x: 5, y: 3 }));

// 5) დაწერეთ ფუნქცია, რომელიც მიიღებს ობიექტების მასივს (შეკვეთები), გაფილტრავს მხოლოდ active სტატუსის, გადაყვანს თითოეულს amount-ის გაორმაგებულ ობიექტად და შემდეგ დაითვლის ჯამს. Input: [{id:1, amount:10, status:"active"}, {id:2, amount:5, status:"inactive"}] Output: 20

const input = [
  { id: 1, amount: 10, status: "active" },
  { id: 2, amount: 5, status: "inactive" },
];

const getOrdersSumAmount = (orders) =>
  orders.reduce((acc, cur) => {
    if (cur.status === "active") {
      return acc + 2 * cur.amount;
    }
    return acc;
  }, 0);

const output = getOrdersSumAmount(input);
console.log("ex5", output);

// 6) დაწერეთ კლასი UserManager მეთოდებით: create(user), read(id), update(id, data), delete(id).

class UserManager {
  #users = [];
  #id = 0;
  create(user) {
    const userData = {
      id: ++this.#id,
      ...user,
    };
    this.#users.push(userData);
    return this;
  }
  read(id) {
    const index = this.findTodoIndex(id);
    if (index === -1) throw new Error("no user with that id");
    return this.#users.find((user) => user.id === id);
  }
  update(id, data) {
    const index = this.findTodoIndex(id);
    if (index === -1) throw new Error("no user with that id");
    this.#users[index] = {
      ...this.#users[index],
      ...data,
    };
    return this;
  }
  delete(id) {
    const index = this.findTodoIndex(id);
    if (index === -1) throw new Error("no user with that id");
    this.#users.splice(index, 1);
  }

  readAllUsers() {
    return this.#users;
  }

  findTodoIndex(id) {
    return this.#users.findIndex((user) => user.id === id);
  }
}

const users = new UserManager();

users
  .create({ name: "John", age: 90, phone: "12345", gender: "male" })
  .create({ name: "Jane", age: 89, phone: "23456", gender: "female" })
  .create({ name: "Jake", age: 88, phone: "34567", gender: "male" });

console.log("ex6", users.read(3));
users.update(3, { name: "Kate", gender: "female" });
console.log(users.read(3));
users.delete(3);
console.log(users.readAllUsers());
// 7) დაწერეთ ფუნცქია რომელიც წამოიღებს პროდუქტების ინფორმაციას შემდეგი ენდფოინთიდან https://dummyjson.com/products გაფილტრეთ 100 ლარზე ძვირი პროდუქტები და დალოგეთ მხოლოდ ამ პროდუქტის სახელები

const fetchData = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  console.log("ex7");
  data.products
    .filter((product) => product.price > 100)
    .forEach((product) => console.log(product.title));
};
fetchData();

// 8) დაწერეთ ფუნქცია, რომელიც მიიღებს მომხმარებლებს, გაფილტრავს active-ებს და შეაეთებს სრულ სახელს. Input: [{first: "a", last: "b", active: true}, {first: "c", last: "d", active: false}] Output: [{full: "a b"}]

const input8 = [
  { first: "a", last: "b", active: true },
  { first: "c", last: "d", active: false },
];
const output8 = input8
  .filter((item) => item.active)
  .map((item) => ({
    full: `${item.first} ${item.last}`,
  }));
console.log("ex8", output8);
