const compose =
  (...fns) =>
  (initial) =>
    fns.reduce((result, next) => next(result), initial);

const createPayload = (str) => ({
  hr: str.match(/^\d{2}/)?.[0],
  min: str.match(/(?<=[:])\d{2}/)?.[0],
  sec: str.match(/\d{2}(?=\w{2})/)?.[0],
  mode: str.match(/\w{2}$/)?.[0],
});

const mapTo24 = ({ hr, min, sec, mode }) => {
  let hour = Number(hr);

  if (mode === "PM" && hour !== 12) {
    hour += 12;
  } else if (mode === "AM" && hour === 12) {
    hour = 0;
  }

  return {
    hr: hour.toString().padStart(2, '0'),
    min,
    sec,
  };
};

const rebuildString = ({ hr, min, sec }) => ({
  military: `${hr}:${min}:${sec}`,
});

const display = ({ military }) => military;

const timeConversion = (str) =>
  compose(
    createPayload, 
    mapTo24, 
    rebuildString, 
    display, 
    console.log
  )(str);

// timeConversion("07:05:45PM");
// timeConversion("07:05:45AM");
// timeConversion("01:05:45AM");
// timeConversion("01:05:45PM");
// timeConversion("01:00:45PM");
// timeConversion("01:00:45AM");
// timeConversion("02:00:45AM");
// timeConversion("12:00:45PM");
// timeConversion("12:00:45AM");
// timeConversion("11:00:45AM");
// timeConversion("11:00:45PM");
// timeConversion("12:00:45AM");
// timeConversion("12:00:45PM");
// timeConversion("01:00:45PM");
// timeConversion("02:00:45PM");
timeConversion("03:00:45PM");
timeConversion("04:00:45PM");
timeConversion("05:00:45PM");
timeConversion("06:00:45PM");
timeConversion("07:00:45PM");
timeConversion("08:00:45PM");
timeConversion("09:00:45PM");
timeConversion("10:00:45PM");
timeConversion("11:00:45PM");
timeConversion("12:00:45AM");



// console.log(/(?<!:[:])/.test("12:01:00"))
// console.log("12:01:00".match(/(?<=[:])\d{2}/))

// console.log(/(?<!:[:])/.test("07:05:45PM"));
// console.log("07:05:45PM".match(/\d{2}(?=\w{2})/));
