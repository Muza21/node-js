// 3) შექმენით car.js და cars.json ფაილები. როდესაც გამოიძახებთ ბრძანებას node car.js Ferrari 2020 red უნდა დაამატოთ ეს მანქანის ინფორმაცია cars.json ში. გაითვალისწინეთ თითოეულ დამატებულ ობიექტს უნდა ჰქონდეს, carName, carColor, carReleaseDate. 5 ჯერ რო გავუშვა ეს ბრძანება 5 ახალი მანქანა უნდა იყოს დამატებული cars.json ში. როდესაც გამოვიძახებ node car.js show 2020 უნდა გამოაჩინოს მხოლოდ 2020 წლის მანქანები, როცა გამოვიძახებ node car.js show red უნდა გამოაჩინოს მხოლოდ წითელი ფერის მანქანები

const fs = require("fs/promises");
const path = require("path");

const carActions = {
  add: async ({ cars, carName, carColor, carReleaseDate, filePath }) => {
    const id = cars.length === 0 ? 1 : cars[cars.length - 1].id + 1;
    const car = {
      id,
      carName,
      carColor,
      carReleaseDate,
    };
    cars.push(car);
    await fs.writeFile(filePath, JSON.stringify(cars));
  },
  show: ({ cars, filter }) => {
    const filtered = cars.filter(
      (car) => car.carColor === filter || car.carReleaseDate === filter
    );
    if (filtered.length === 0) {
      return;
    }
    console.log(filtered);
  },
};

const main = async () => {
  const filePath = path.join(__dirname, "data/cars.json");
  const [, , action, arg1, arg2] = process.argv;
  const data = await fs.readFile(filePath, "utf-8");
  const cars = JSON.parse(data || "[]");
  if (action === "show") {
    const filter = arg1;
    return carActions.show({ cars, filter });
  }
  const carName = action;
  const carReleaseDate = arg1;
  const carColor = arg2;
  await carActions.add({ cars, carName, carColor, carReleaseDate, filePath });
};

main();
