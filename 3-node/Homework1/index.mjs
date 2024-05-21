import chalk from "chalk";
import fs from "fs";

//задание 1
function printFileStatsFromTextFile(filename) {
  const fileContent = fs.readFileSync("./files/text.txt" + filename, "utf8");
  const lines = fileContent.split("\n");

  console.log(fileContent);
  console.log(`Количество строк: ${lines.length}\n`);
}

//задание 2
function countLettersAndDigitsSpaces(filename) {
  const fileContent = fs.readFileSync("./files/text.txt" + filename, "utf8");
  let letters = 0;
  let digits = 0;
  let spaces = 0;

  for (let i = 0; i < fileContent.length; i++) {
    const char = fileContent[i];
    if (char.match(/[a-zA-Z]/)) {
      letters++;
    } else if (char.match(/[0-9]/)) {
      digits++;
    } else if (char === " ") {
      spaces++;
    }
  }
  console.log(`Буквы: ${letters}`);
  console.log(`Цифры: ${digits}`);
  console.log(`Пробелы: ${spaces}\n`);
}

//задание 3
function printEvenOrOddNumbers(evenOdd = "even", limit = 40) {
  for (let i = 2; i <= limit; i++) {
    if (
      (evenOdd === "even" && i % 2 === 0) ||
      (evenOdd === "odd" && i % 2 !== 0)
    ) {
      console.log(i);
    }
  }
  console.log();
}

//задание 4
function calculate(num1, operation, num2) {
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    console.error("Оба аргумента должны быть числами");
    return;
  }

  let result;

  switch (operation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
      console.error("Неверная операция");
      return;
  }

  console.log(`Результат: ${result}\n`);
}

//задание 5
function calculateWithStyling(num1, operation, num2) {
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    console.error("Оба аргумента должны быть числами");
    return;
  }

  let result;

  switch (operation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
      console.error("Неверная операция");
      return;
  }

  console.log(chalk.green(`Результат: ${result}\n`));
}

printFileStatsFromTextFile("test.txt");
countLettersAndDigitsSpaces("test.txt");
printEvenOrOddNumbers("even");
calculate(2, "*", 3);
calculateWithStyling(2, "+", 3);
