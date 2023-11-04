const DATE = new Date();
const days_in_each_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function updateError(validyear, validmonth, validday) {
  if (!validyear) {
    document.getElementById("error-year").textContent = "must be a valid year";
  } else {
    document.getElementById("error-year").textContent = " ";
  }
  if (!validmonth) {
    document.getElementById("error-month").textContent =
      "must be a valid month";
  } else {
    document.getElementById("error-month").textContent = " ";
  }
  if (!validday) {
    document.getElementById("error-day").textContent = "must be a valid day";
  } else {
    document.getElementById("error-day").textContent = " ";
  }
  if (validday && validmonth && validyear) {
    document.getElementsByClassName(".error").textContent = " ";
    return true;
  }
  return false;
}

function showResult(month, year, day) {
  var currentDay = DATE.getDate();
  var currentMonth = DATE.getMonth() + 1;
  var currentYear = DATE.getFullYear();

  if (day > currentDay) {
    currentDay += days_in_each_month[month - 1];
    currentMonth--;
  }
  if (month > currentMonth) {
    currentYear--;
    currentMonth += 12;
  }
  var days = currentDay - day;
  var months = currentMonth - month;
  var years = currentYear - year;
  document.getElementById("yrr").textContent = years;
  document.getElementById("mnth").textContent = months;
  document.getElementById("dys").textContent = days;
}

function APP() {
  document.getElementById("btn").addEventListener("click", function () {
    var day = document.getElementById("dy").value;
    var month = document.getElementById("mon").value;
    var year = document.getElementById("yr").value;
    var validyear = validYear(year);
    var validmonth = validMonth(month);
    var validday = validDay(day, month, year);
    const allGood = updateError(validyear, validmonth, validday);
    if (allGood) {
      showResult(month, year, day);
    }
  });
}

function hasCharacters(input) {
  for (var i = 0; i < input.length; i++) {
    if (
      (input[i] >= "a" && input[i] <= "z") ||
      (input[i] >= "A" && input[i] <= "Z")
    )
      return true;
  }
  return false;
}

function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return true;
  return false;
}

function validMonth(month) {
  if (month.length === 0) return false;
  if (hasCharacters(month)) return false;
  if (month > 12 || month <= 0) return false;
  return true;
}

function validYear(year) {
  if (year.length == 0) return false;
  if (hasCharacters(year)) return false;
  if (year > DATE.getFullYear() || year <= 0 || year < 100) return false;

  return true;
}

function validDay(day, month, year) {
  if (day.length === 0 || year.length === 0 || month.length === 0) return false;

  day = parseInt(day, 10);
  month = parseInt(month, 10);
  year = parseInt(year, 10);

  if (hasCharacters(day)) return false;
  if (day > 31 || day <= 0) return false;
  if ((month === 4 || month === 6 || month === 0 || month === 11) && day > 30)
    return false;
  if (isLeapYear(year) && month === 2 && day > 29) return false;
  if (!isLeapYear(year) && month === 2 && day > 28) return false;
  return true;
}

APP();
