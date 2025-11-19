// 1) დაწერეთ ფუნცქია რომელიც დალოგავს მაუსის კოორდინატებს მხოლოდ მას შემდეგ რაც მაუსი გაჩერდება, გამოიყენეთ debaunce ტექნიკა.
// მინიშნება: window.addEventListener('mousemove',(e) => {
//     console.log(e.clientX, e.clientY)
// })

const debounce = (callback, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const logMouse = debounce((e) => {
  console.log(e.clientX, e.clientY);
});

window.addEventListener("mousemove", logMouse);

// 2) შექმენით html-ში ბათონი და ყოველ ბათონის ქლიქზე დაარექუესთეთ შემდეგი API-დან და მიღებული შედეგი გამოაჩნიეთ https://dummyjson.com/quotes ისევე როგორც რენდომ კატის ფაქტზე ვქენით.

const button = document.getElementById("get_quote");
const container = document.querySelector(".container");
const quoteDiv = document.createElement("div");
container.appendChild(quoteDiv);

button.addEventListener("click", () => {
  fetch("https://dummyjson.com/quotes")
    .then((res) => res.json())
    .then((data) => {
      quoteDiv.textContent =
        data.quotes[Math.floor(Math.random() * data.quotes.length)].quote;
    });
});

// 3) დაწერეთ ფუნცქია რომელიც წამოიღებს იუზერების ინფორმაციას შემდეგი API-დან https://dummyjson.com/users თქვენი მიზანია გააკეთოთ ფეჯინეიშენი სულ არის 200-ზე მეტი იუზერი და დიფოტად მოდის 30. მინიშნება, თუ სრულ რაოდენობას გაყოფთ ლიმიტზე მიიღებთ ფეიჯების რაოდენობას, რაც შეეხება როგორ უნდა გამოთვალოთ skip ფროფერთი. skip = (page - 1) * limit) limit = 30

const userContainerList = document.createElement("div");
container.appendChild(userContainerList);
let limit = 30;
let page = 1;
let totalPageAmount;
let skip = (page - 1) * limit;
const prevBtn = document.createElement("button");
const nextBtn = document.createElement("button");
const pageNumber = document.createElement("span");
prevBtn.textContent = "prev";
nextBtn.textContent = "next";
pageNumber.textContent = page;
container.appendChild(prevBtn);
container.appendChild(pageNumber);
container.appendChild(nextBtn);

const drawUsers = (users) => {
  users.map((user) => {
    const userItem = document.createElement("div");
    userItem.style.border = "1px solid black";
    userItem.style.background = "#ff00ff";
    userItem.innerHTML = `
      <div>
        <h4>${user.firstName} ${user.lastName}</h4>
        <p>${user.email}</p>
        <p>${user.id}</p>
        <p>${user.phone}</p>
      </div>`;
    userContainerList.appendChild(userItem);
  });
  pageNumber.textContent = page;
};

const fetchUsers = (limit, skip) => {
  fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
    .then((res) => res.json())
    .then((data) => {
      totalPageAmount = Math.ceil(data.total / limit);
      drawUsers(data.users);
    });
};
fetchUsers(limit, skip);

prevBtn.addEventListener("click", () => {
  page -= 1;
  if (page < 1) {
    page = 1;
    return;
  }
  skip = (page - 1) * limit;
  userContainerList.innerHTML = "";
  fetchUsers(limit, skip);
});
nextBtn.addEventListener("click", () => {
  page += 1;
  if (page > totalPageAmount) {
    page = totalPageAmount;
    return;
  }
  skip = (page - 1) * limit;
  userContainerList.innerHTML = "";
  fetchUsers(limit, skip);
});

// 4) შექმენით ინფუთი სადაც იუზერი მხოლოდ რიცხვებს შეიყვანს, რიცხვის შეყვანის შემდეგ უნდა დაარექუესთოთ შემდეგ ეიპიაიზე https://myfakeapi.com/api/cars/10 10-ის ნაცვლად ჩაწერეთ იუზერის შეყვანილი ინფომრაცია, ეს ეიპიაი დაგიბრუნებთ მანქანის ინფორმაციას და გამოაჩინეტ ეს ინფორმაცია დომში. ასევე თუ არასწორი აიდი დაწერა მაგალითად 9999 ბექენდი დაგირტყავთ ერორს და გაჰენდლეთ ერორი და უთხარით იუზერს რომ სწორი აიდი შეიყვანოს, მაგალითად alert ის გამოყენებით.

const input = document.createElement("input");
const submitInputValueBtn = document.createElement("button");
const autoContainerDetails = document.createElement("div");
input.type = "number";
submitInputValueBtn.textContent = "submit";
container.prepend(autoContainerDetails);
container.prepend(submitInputValueBtn);
container.prepend(input);

const drawCarDetials = (car) => {
  autoContainerDetails.innerHTML = `
      <div>
        <p>${car.car} - ${car.car_model} - ${car.car_model_year} - id: ${car.id}</p>
        <p>Availability: ${car.availability}</p>
        <p>Color: ${car.car_color}</p>
        <p>Vin: ${car.car_vin}</p>
        <p>Price: ${car.price}</p>
      </div>`;
};

submitInputValueBtn.addEventListener("click", (e) => {
  const id = input.value.trim();

  if (id === "" || isNaN(Number(id))) {
    autoContainerDetails.textContent = "Wrong input";
    return;
  }

  fetch(`https://myfakeapi.com/api/cars/${input.value}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Invalid id. Enter the correct id number");
      }
      return res.json();
    })
    .then((data) => {
      if (!data.Car) {
        throw new Error("Invalid id. Enter the correct id number");
      }
      drawCarDetials(data.Car);
    })
    .catch((err) => (autoContainerDetails.textContent = err.message));
});
