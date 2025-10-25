#!/usr/bin/env node

// 2) გააკეთეთ weather-cli ხელსაწყო რომელსაც ექნება შემდეგი ფუნქციონალი:
// weather-cli tbilisi => დაგიბრუნებთ თბილისში რა ამინდია იმას, თუ ისეთ ქალაქს ჩაწერთ რაც არ იძებნება დააბრუნეთ შესაბამისი ერორი.
// ამინდის ინფორმაცია უნდა წამოიღოთ შემდეგი ეიპიაიდან: https://api.openweathermap.org/data/2.5/weather?q={cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c
// cityName ის ნაცვლად უნდა გამოიყენოთ არგუმენტად მიღებული ქალაქის სახელი და გამოაჩინოთ შესაბამისი მონაცემები.

// რეფერენსი: npm i commander, npm link, #!/usr/bin/env node.
// შეგიძლიათ გამოიყენოთ npm i  ტერმინალში უფრო ლამაზად გამოჩნდეს ბრძანებები.

import { Command } from "commander";

const program = new Command();

program
  .name("weather-cli")
  .description("Get current weather by city")
  .version("1.0.0");

program
  .description("This action get's weather info")
  .argument("<city>", "city name to get weather info")
  .action(async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        console.log(`Error: ${data.message}`);
        return;
      }
      console.log(`\nWeather in ${data.name}, ${data.sys.country}`);
      console.log(`Temperature: ${data.main.temp}°C`);
      console.log(`Condition: ${data.weather[0].description}`);
      console.log(`Wind: ${data.wind.speed}\n`);
    } catch (err) {
      console.log("Failed to fetch weather data");
    }
  });

program.parse();
