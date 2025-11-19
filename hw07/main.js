const textFormatHelper = (str, length = 30) => {
  if (str.length > length) {
    length = str.length + 2;
  }
  const border = new Array(length).fill("-").join("");
  const textSpace = length - 2 - str.length;
  const spaceAmount = Math.floor(textSpace / 2);
  const line =
    "|" +
    new Array(spaceAmount).fill(" ").join("") +
    str +
    new Array(textSpace - spaceAmount).fill(" ").join("") +
    "|";
  return `${border}\n${line}\n${border}`;
};

// 1) დაწერეთ ფუნქცია რომელიც წამოიღებს დეითას ამ საიტიდან https://jsonplaceholde.typicode.com, url სპეციალურად არის არასწორი თქვენი მიზანია რომ როდესაც რექუსთი დაფეილდება გააკეთოთ რეთრაი 5 ჯერ.

const fetchData = async (maxRetries = 5) => {
  let fetchAttempt = 0;
  while (fetchAttempt < maxRetries) {
    try {
      const res = await fetch("https://jsonplaceholde.typicode.com");
      const data = await res.json();
      return data;
    } catch (err) {
      fetchAttempt++;
      if (fetchAttempt < maxRetries) {
        continue;
      } else {
        console.log(textFormatHelper("Exercise 1"));
        console.error(`All 5 attempts failed:`, err.message);
      }
    }
  }
};

fetchData();

// 2) დაწერეთ ფუნცქია რომელიც წამოიღებს მონაცემებს ამ ორი url-დან https://dummyjson.com/users და https://jsonplaceholder.typicode.com/users თქვენი მიზანია დალოგოთ მხოლოდ ის რომელიც მოასწრებს დარიზოლვებას.

const dataFetchRace = () => {
  Promise.race([
    fetch("https://dummyjson.com/users"),
    fetch("https://jsonplaceholder.typicode.com/users"),
  ])
    .then((res) => res.json())
    .then((data) => {
      console.log(textFormatHelper("Exercise 2"));
      console.log(data);
    });
};
dataFetchRace();

// 3) დაწერეთ ფუნქცია რომელიც წამოიღებს ინფორმაციას https://dummyjson.com/products ამ url-დან, შემდეგ გაფილტავას და დალოგავს მხოლოდ იმ პროდუქტებს რომელთა ფასიც არის 10-ზე მეტი

const fetchProducts = () => {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => data.products.filter((item) => item.price > 10))
    .then((filtered) => {
      console.log(textFormatHelper("Exercise 3"));
      console.log(filtered);
    });
};

fetchProducts();

// 4) დაწერეთ ფუნქცია რომელიც წამოიღებს ინფორმაციას ამ url-დან https://dummyjson.com/users, გაფილტრავს მხოლოდ ისეთ იუზერებს რომელთა პროფესია არის web developer და დალოგავს მხოლოდ შემდეგ ფროფერთებს: სახელი, გვარი, მისამართი(ქალაქი), იმეილი და ტელეფონის ნომერი.

const fetchUsers = () => {
  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => {
      return data.users
        .filter((user) =>
          user.company.title.toLowerCase().includes("web developer")
        )
        .map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address.city,
          email: user.email,
          phone: user.phone,
        }));
    })
    .then((filtered) => {
      console.log(textFormatHelper("Exercise 4"));
      console.log(filtered);
    });
};

fetchUsers();

// 5) დაწერეთ ფუნქცია რომელიც წამოიღებს იმფორმაციას ერთდროულად შემდეგი  api-დან: https://dummyjson.com/recipes, https://dummyjson.com/comments, https://dummyjson.com/todos, https://dummyjson.com/quotes და ყველას დარიზოლვებულ და ჯეისონში გადმოტრანსფორმირებულ შედეგებს დალოგავთ. აუცილებელია რომ ყველა გაეშვას ერთდროულად

const fetchInParalell = async () => {
  const apis = [
    "https://dummyjson.com/recipes",
    "https://dummyjson.com/comments",
    "https://dummyjson.com/todos",
    "https://dummyjson.com/quotes",
  ];
  const res = await Promise.all(apis.map((url) => fetch(url)));
  const data = await Promise.all(res.map((r) => r.json()));
  console.log(textFormatHelper("Exercise 5"));
  console.log(data);
};
fetchInParalell();
