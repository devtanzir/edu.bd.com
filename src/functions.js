/**
 * Custom Alert Created
 * @param {*} msg
 * @param {*} type
 * @returns
 */

const setAlert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`;
};

/**
 * All types of email verified
 * @param {*} email
 * @returns
 */

const emailCheck = (email) => {
  let pattern = /^[a-z_0-9\.]{1,}@[a-z0-9]{1,}\.[a-z\.]{2,8}$/;
  return pattern.test(email);
};

/**
 * Bangladeshi Cell Number Check
 * @param {*} cell
 * @returns
 */

const cellCheck = (cell) => {
  let pattern = /^(01|8801|\+8801)[0-9]{9}$/;
  return pattern.test(cell);
};

/**
 * id generator
 * @returns
 */

const createId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  const machineId = "xxxxxxxxxxxx".replace(/[x]/g, function () {
    return ((Math.random() * 16) | 0).toString(16);
  });
  const processId = (Math.floor(Math.random() * 1000) % 1000)
    .toString(16)
    .padStart(3, "0");
  const counter = ((Math.random() * 16777216) | 0)
    .toString(16)
    .padStart(6, "0");

  return timestamp + machineId + processId + counter;
};

/**
 * get time ago
 * @param {*} postDate
 * @returns
 */

function formatPostTime(postDate) {
  const currentDate = new Date();
  const diff = currentDate - postDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "Yesterday";
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}

/**
 *
 * Grade calculator
 */

function grade(marks) {
  let gradePoint;
  let letterGrade;

  if (marks >= 0 && marks <= 32) {
    gradePoint = 0;
    letterGrade = "F";
  } else if (marks >= 33 && marks < 40) {
    gradePoint = 1;
    letterGrade = "D";
  } else if (marks >= 40 && marks < 50) {
    gradePoint = 2;
    letterGrade = "C";
  } else if (marks >= 50 && marks < 60) {
    gradePoint = 3;
    letterGrade = "B";
  } else if (marks >= 60 && marks < 70) {
    gradePoint = 3.5;
    letterGrade = "A-";
  } else if (marks >= 70 && marks < 80) {
    gradePoint = 4;
    letterGrade = "A";
  } else if (marks >= 80 && marks <= 100) {
    gradePoint = 5;
    letterGrade = "A+";
  }

  return { gradePoint, letterGrade };
}

/**
 * gpa Calculator
 */

const gpa = (bangla, english, science, religion, accounting, arabic) => {
  let totalGpa =
    parseInt(bangla) +
    parseInt(english) +
    parseInt(science) +
    parseInt(religion) +
    parseInt(accounting) +
    parseInt(arabic);

  let gpa = totalGpa / 6;

  if (
    bangla == 0 ||
    english == 0 ||
    religion == 0 ||
    accounting == 0 ||
    science == 0 ||
    arabic == 0
  ) {
    return false;
  } else {
    return gpa.toFixed(2);
  }
};

const resultCalculate = (marks) => {
  if (marks.length === 0)
    return {
      isPass: "not yet Published",
      GPA: "not yet Published",
    };
  const GPA = gpa(
    grade(parseInt(marks[0].value)).gradePoint,
    grade(parseInt(marks[1].value)).gradePoint,
    grade(parseInt(marks[2].value)).gradePoint,
    grade(parseInt(marks[3].value)).gradePoint,
    grade(parseInt(marks[4].value)).gradePoint,
    grade(parseInt(marks[5].value)).gradePoint
  );
  const isPass = GPA ? "Passed" : "Failed" ?? "not yet published";

  return {
    GPA: GPA || "0.00",
    isPass,
  };
};

const getAllMarks = (marks) => {
  const allMarks = marks.map(
    (item) => `<tr>
                            <td>${item.code}</td>
                            <td>${item.name}</td>
                            <td>${grade(item.value).letterGrade}</td>
                            <td>${grade(item.value).gradePoint}</td>
                            <td>${item.value}</td>
                        </tr>`
  );
  if (allMarks.length === 0) {
    return false;
  }
  return allMarks.join(" ");
};

const generateRandomValue = () => {
  return Math.floor(Math.random() * 9) + 1;
};
