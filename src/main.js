const studentFrom = document.getElementById("student-form");
const studentList = document.getElementById("student-list");
const studentUpdateForm = document.getElementById("product-update-form");
const addMarksForm = document.getElementById("addMarks-form");
const msg = document.querySelector(".msg");

// Get the URL of the current page
const currentUrl = window.location.href;
const fileName = currentUrl.split("/").pop();

const mathTest1 = generateRandomValue();
const mathTest2 = generateRandomValue();

const getAllStudents = () => {
  const students = getDataLs("students");

  let dataList = "";
  if (!students) {
    return (studentList.innerHTML = `
        <tr>
            <td colspan="9" class="text-danger text-center"> No data Found</td>
        </tr>        
        `);
  } else if (students.length === 0) {
    studentList.innerHTML = `
        <tr>
            <td colspan="9" class="text-danger text-center"> No data Found</td>
        </tr>        
        `;
  } else {
    students.reverse().forEach((item, index) => {
      dataList += `
            <tr>
                <td>${index + 1}</td>
                <td><img style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" src="${
                  item.photo
                }" alt=${item.name}></td>
                <td>${item.name}</td>
                <td>${item.examination}</td>
                <td>${item.year}</td>
                <td>${item.board}</td>
                <td>${item.roll}</td>
                <td>${item.reg}</td>
                <td>
                ${
                  !getAllMarks(item.marks)
                    ? `<button onclick="addMarks('${item.id}')" class="btn btn-success btn-sm product-add" href="#exampleModal4" data-bs-toggle="modal"><i class="fa-solid fa-plus"></i></button>`
                    : `<button onclick="showSingleStudent('${item.id}')" class="btn btn-dark btn-sm product-viwe" href="#exampleModal2" data-bs-toggle="modal"><i class="fa-regular fa-eye"></i></button>`
                }
                </td>
                <td>
                  <a onclick="showStudentInfo('${
                    item.id
                  }')" class="btn btn-info btn-sm" href="#exampleModal5" data-bs-toggle="modal"><i class="fa-regular fa-eye"></i></a>
                  <a onclick="editSingleStudent('${
                    item.id
                  }')"  class="btn btn-warning btn-sm product-edit" href="#exampleModal3" data-bs-toggle="modal"><i class="fa-regular fa-pen-to-square"></i></a>
                  <a onclick="deleteStudent('${
                    item.id
                  }')" class="btn btn-danger btn-sm product-delete" href="#"><i class="fa-regular fa-trash-can"></i></a>
                </td>
              </tr>
            `;
    });
    studentList.innerHTML = dataList;
  }
};
const showSingleStudent = (id) => {
  const singleData = document.querySelector(".single-data");
  const studentDetails = document.querySelector("#student-details");
  const updateButton = document.querySelector("#updateButton");
  const { marks, name, photo } = getSingleData("students", id);
  let dataList = "";
  if (marks.length === 0) {
    dataList += `<tr class="text-center text-danger">
                      <td colspan="5">No Marks Found</td>
                  </tr>`;
  } else {
    marks.forEach((item, index) => {
      dataList += `<tr>
                      <th>${index + 1}</th>
                      <td>${item.name}</td>
                      <td>${item.value}</td>
                      <td>${grade(parseInt(item.value)).letterGrade}</td>
                      <td>${grade(parseInt(item.value)).gradePoint}</td>
                    </tr>
                    `;
    });
  }
  studentDetails.innerHTML = `<div class="student-info">
                <img src=${photo} alt=${name}>
                <h4>${name}</h4>
              </div>`;
  updateButton.innerHTML = `<a href="#exampleModal4" data-bs-toggle="modal" onclick="updateMarks('${id}')" class="btn btn-sm btn-warning">Update Marks</a>`;
  singleData.innerHTML = dataList;
};
const editSingleStudent = (id) => {
  const {
    name,
    fatherName,
    motherName,
    group,
    institute,
    examination,
    board,
    year,
    type,
    dob,
    photo,
    roll,
    reg,
  } = getSingleData("students", id);
  studentUpdateForm.innerHTML = `            
                 <div class="row">
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="name">name</label>
                    <input required value="${name}" id="name" name="name" type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="fatherName">Father's Name</label>
                    <input value="${fatherName}" required id="fatherName" name="fatherName" type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="motherName">Mother's Name</label>
                    <input value="${motherName}" required id="motherName" name="motherName" type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="dob">Date Of Birth</label>
                    <input value="${dob}" required id="dob" name="dob" type="date" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="photo">photo</label>
                    <input value="${photo}" required id="photo" name="photo" type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="photo">Institute</label>
                    <select class="form-control" name="institute" id="institute">
                        <option value="">- Institute -</option>
                        <option ${
                          institute === "Rajuk Uttara Model College"
                            ? "selected"
                            : ""
                        } value="Rajuk Uttara Model College">Rajuk Uttara Model College</option>
                        <option ${
                          institute === "Ideal School and College"
                            ? "selected"
                            : ""
                        } value="Ideal School and College">Ideal School and College</option>
                        <option ${
                          institute === "Shamsul Hoque Khan School & College"
                            ? "selected"
                            : ""
                        } value="Shamsul Hoque Khan School & College">Shamsul Hoque Khan School & College</option>
                        <option ${
                          institute === "Notre Dame College" ? "selected" : ""
                        } value="Notre Dame College">Notre Dame College</option>
                        <option ${
                          institute === "Dhaka College" ? "selected" : ""
                        } value="Dhaka College">Dhaka College</option>
                        <option ${
                          institute === "Dhaka Commerce College"
                            ? "selected"
                            : ""
                        } value="Dhaka Commerce College">Dhaka Commerce College</option>
                        <option ${
                          institute === "BAF Shaheen College" ? "selected" : ""
                        } value="BAF Shaheen College">BAF Shaheen College</option>
                        <option ${
                          institute === "Dhaka Imperial College"
                            ? "selected"
                            : ""
                        } value="Dhaka Imperial College">Dhaka Imperial College</option>
                      </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="roll">Roll</label>
                    <input value="${roll}" required id="roll" name="roll" type="number" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="reg">Registration</label>
                    <input value="${reg}" required id="reg" name="reg" type="number" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="examination">Examination</label>
                    <select required class="form-control" name="examination" id="examination">
                        <option value="">- Examination -</option>
                        <option ${
                          examination === "HSC/Alim/Equivalent"
                            ? "selected"
                            : ""
                        } value="HSC/Alim/Equivalent">HSC/Alim/Equivalent</option>
                        <option ${
                          examination === "JSC/JDC" ? "selected" : ""
                        } value="JSC/JDC">JSC/JDC</option>
                        <option ${
                          examination === "SSC/Dakhil" ? "selected" : ""
                        } value="SSC/Dakhil">SSC/Dakhil</option>
                        <option ${
                          examination === "SSC(Vocational)" ? "selected" : ""
                        } value="SSC(Vocational)">SSC(Vocational)</option>
                        <option ${
                          examination === "HSC/Alim" ? "selected" : ""
                        } value="HSC/Alim">HSC/Alim</option>
                        <option ${
                          examination === "HSC(Vocational)" ? "selected" : ""
                        } value="HSC(Vocational)">HSC(Vocational)</option>
                        <option ${
                          examination === "HSC(BM)" ? "selected" : ""
                        } value="HSC(BM)">HSC(BM)</option>
                        <option ${
                          examination === "Diploma in Commerce"
                            ? "selected"
                            : ""
                        } value="Diploma in Commerce">Diploma in Commerce</option>
                      </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="board">Board</label>
                    <select required class="form-control" name="board" id="board">
                        <option value="">- Select Board -</option>
                        <option  ${
                          board === "barisal" ? "selected" : ""
                        } value="barisal">Barisal</option>
                        <option  ${
                          board === "chittagong" ? "selected" : ""
                        } value="chittagong">Chittagong</option>
                        <option  ${
                          board === "comilla" ? "selected" : ""
                        } value="comilla">Comilla</option>
                        <option  ${
                          board === "dhaka" ? "selected" : ""
                        } value="dhaka">Dhaka</option>
                        <option  ${
                          board === "dinajpur" ? "selected" : ""
                        } value="dinajpur">Dinajpur</option>
                        <option  ${
                          board === "jessore" ? "selected" : ""
                        } value="jessore">Jessore</option>
                        <option  ${
                          board === "mymensingh" ? "selected" : ""
                        } value="mymensingh">Mymensingh</option>
                        <option  ${
                          board === "rajshahi" ? "selected" : ""
                        } value="rajshahi">Rajshahi</option>
                        <option  ${
                          board === "sylhet" ? "selected" : ""
                        } value="sylhet">Sylhet</option>
                        <option  ${
                          board === "madrasah" ? "selected" : ""
                        } value="madrasah">Madrasah</option>
                        <option  ${
                          board === "tec" ? "selected" : ""
                        } value="tec">Technical</option>
                        <option  ${
                          board === "dibs" ? "selected" : ""
                        } value="dibs">DIBS(Dhaka)</option>
                      </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <label for="year">Year</label>
                    <select required class="form-control" name="year" id="year">
                        <option value="">- Select Year -</option>
                        <option ${
                          year === "2024" ? "selected" : ""
                        } value="2024">2024</option>
                        <option ${
                          year === "2023" ? "selected" : ""
                        } value="2023">2023</option>
                        <option ${
                          year === "2022" ? "selected" : ""
                        } value="2022">2022</option>
                        <option ${
                          year === "2021" ? "selected" : ""
                        } value="2021">2021</option>
                        <option ${
                          year === "2020" ? "selected" : ""
                        } value="2020">2020</option>
                        <option ${
                          year === "2019" ? "selected" : ""
                        } value="2019">2019</option>
                        <option ${
                          year === "2018" ? "selected" : ""
                        } value="2018">2018</option>
                        <option ${
                          year === "2017" ? "selected" : ""
                        } value="2017">2017</option>
                        <option ${
                          year === "2016" ? "selected" : ""
                        } value="2016">2016</option>
                        <option ${
                          year === "2015" ? "selected" : ""
                        } value="2015">2015</option>
                        <option ${
                          year === "2014" ? "selected" : ""
                        } value="2014">2014</option>
                        <option ${
                          year === "2013" ? "selected" : ""
                        } value="2013">2013</option>
                        <option ${
                          year === "2012" ? "selected" : ""
                        } value="2012">2012</option>
                        <option ${
                          year === "2011" ? "selected" : ""
                        } value="2011">2011</option>
                        <option ${
                          year === "2010" ? "selected" : ""
                        } value="2010">2010</option>
                        <option ${
                          year === "2009" ? "selected" : ""
                        } value="2009">2009</option>
                        <option ${
                          year === "2008" ? "selected" : ""
                        } value="2008">2008</option>
                        <option ${
                          year === "2007" ? "selected" : ""
                        } value="2007">2007</option>
                        <option ${
                          year === "2006" ? "selected" : ""
                        } value="2006">2006</option>
                        <option ${
                          year === "2005" ? "selected" : ""
                        } value="2005">2005</option>
                        <option ${
                          year === "2004" ? "selected" : ""
                        } value="2004">2004</option>
                        <option ${
                          year === "2003" ? "selected" : ""
                        } value="2003">2003</option>
                        <option ${
                          year === "2002" ? "selected" : ""
                        } value="2002">2002</option>
                        <option ${
                          year === "2001" ? "selected" : ""
                        } value="2001">2001</option>
                        <option ${
                          year === "2000" ? "selected" : ""
                        } value="2000">2000</option>
                        <option ${
                          year === "1999" ? "selected" : ""
                        } value="1999">1999</option>
                        <option ${
                          year === "1998" ? "selected" : ""
                        } value="1998">1998</option>
                        <option ${
                          year === "1997" ? "selected" : ""
                        } value="1997">1997</option>
                        <option ${
                          year === "1996" ? "selected" : ""
                        } value="1996">1996</option>
                      </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="my-3">
                    <span class="d-block fw-medium ">Select Group</span>
                    <input ${
                      group === "science" ? "checked" : ""
                    } type="radio" id="science" name="group" value="science">
                    <label for="science">Science</label>
                    <br>
                    <input ${
                      group === "arts" ? "checked" : ""
                    }  type="radio" id="arts" name="group" value="arts">
                    <label for="arts">Arts</label>
                    <br>
                    <input ${
                      group === "commerce" ? "checked" : ""
                    }  type="radio" id="commerce" name="group" value="commerce">
                    <label for="commerce">Commerce</label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="my-3">
                    <span class="d-block fw-medium ">Select Type</span>
                    <input ${
                      type === "regular" ? "checked" : ""
                    } required  type="radio" id="regular" name="type" value="regular">
                    <label for="regular">regular</label>
                    <br>
                    <input ${
                      type === "irregular" ? "checked" : ""
                    } required type="radio" id="irregular" name="type" value="irregular">
                    <label for="irregular">Irregular</label>
                  </div>
                </div>

                <div class="col-md-12">
                    <input
                      type="submit"
                      class="btn btn-primary w-100"
                      value="Submit"
                    />
                </div>
              </div>`;

  studentUpdateForm.onsubmit = (e) => {
    e.preventDefault();
    const modalClose = document.getElementById("editModalClose");
    const msgEdit = document.querySelector(".msg-edit");
    // get form data from formData object
    let formData = new FormData(e.target);
    // let studentData = Object.fromEntries(formData.entries());
    let {
      name,
      fatherName,
      motherName,
      dob,
      photo,
      institute,
      roll,
      reg,
      examination,
      board,
      year,
      group,
      type,
    } = Object.fromEntries(formData.entries());
    // form validation

    if (
      !name ||
      !fatherName ||
      !motherName ||
      !dob ||
      !photo ||
      !institute ||
      !roll ||
      !reg ||
      !examination ||
      !board ||
      !year ||
      !type
    ) {
      alert("not validate");
      return (msgEdit.innerHTML = setAlert("All Fields are required"));
    } else {
      const allData = getDataLs("students");
      const updatedData = {
        name,
        fatherName,
        motherName,
        dob,
        photo,
        institute,
        roll,
        reg,
        examination,
        board,
        year,
        group,
        type,
      };

      const updatedIndex = allData.findIndex((item) => item.id === id);

      allData[updatedIndex] = {
        ...allData[updatedIndex],
        ...updatedData,
      };

      localStorage.setItem("students", JSON.stringify(allData));

      msgEdit.innerHTML = setAlert("Data Updated", "success");
      e.target.reset();
      modalClose.click();
      getAllStudents();
    }
  };
};
const deleteStudent = (id) => {
  const conf = confirm("are you sure");
  if (conf) {
    deleteSingleStudent("students", id);
    getAllStudents();
  }
};
const addMarks = (id) => {
  addMarksForm.querySelector(`input[name="bangla"]`).value = "";
  addMarksForm.querySelector(`input[name="english"]`).value = "";
  addMarksForm.querySelector(`input[name="math"]`).value = "";
  addMarksForm.querySelector(`input[name="science"]`).value = "";
  addMarksForm.querySelector(`input[name="sociology"]`).value = "";
  addMarksForm.querySelector(`input[name="religion"]`).value = "";

  addMarksForm.querySelector(`input[type="submit"]`).value = "Submit";

  addMarksForm.onsubmit = (e) => {
    e.preventDefault();
    const modalClose = document.getElementById("modalCloseBtn2");
    const msgMarks = document.querySelector(".msg-marks");

    // get form data from formData object

    let formData = new FormData(e.target);

    let { bangla, english, math, science, sociology, religion, validate } =
      Object.fromEntries(formData.entries());

    if (
      !bangla ||
      !english ||
      !math ||
      !science ||
      !sociology ||
      !religion ||
      !validate
    ) {
      return (msgMarks.innerHTML = setAlert("All Fields are required"));
    } else if (
      bangla > 100 ||
      english > 100 ||
      math > 100 ||
      science > 100 ||
      sociology > 100 ||
      religion > 100
    ) {
      return (msgMarks.innerHTML = setAlert("Invalid Credentials"));
    } else {
      const allData = getDataLs("students");
      const updatedData = allData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            marks: [
              {
                id: createId(),
                name: "bangla",
                value: bangla,
                code: "101",
              },
              {
                id: createId(),
                name: "english",
                value: english,
                code: "106",
              },
              {
                id: createId(),
                name: "math",
                value: math,
                code: "108",
              },
              {
                id: createId(),
                name: "science",
                value: science,
                code: "130",
              },
              {
                id: createId(),
                name: "sociology",
                value: sociology,
                code: "105",
              },
              {
                id: createId(),
                name: "religion",
                value: religion,
                code: "109",
              },
            ],
          };
        }
        return item;
      });
      localStorage.setItem("students", JSON.stringify(updatedData));
    }

    msgMarks.innerHTML = setAlert("Data Stable", "success");
    e.target.reset();
    modalClose.click();
    getAllStudents();
  };
};
const updateMarks = (id) => {
  const showModalClose = document.getElementById("showModalClose");
  showModalClose.click();
  const { marks } = getSingleData("students", id);

  for (let i = 0; i < 6; i++) {
    addMarksForm.querySelector(`input[name="${marks[i].name}"]`).value =
      marks[i].value;
  }
  addMarksForm.querySelector(`input[type="submit"]`).value = "Update";

  addMarksForm.onsubmit = (e) => {
    e.preventDefault();
    const modalClose = document.getElementById("modalCloseBtn2");
    const msgMarks = document.querySelector(".msg-marks");

    // get form data from formData object

    let formData = new FormData(e.target);

    let { bangla, english, math, science, sociology, religion, validate } =
      Object.fromEntries(formData.entries());

    if (
      !bangla ||
      !english ||
      !math ||
      !science ||
      !sociology ||
      !religion ||
      !validate
    ) {
      return (msgMarks.innerHTML = setAlert("All Fields are required"));
    } else if (
      bangla > 100 ||
      english > 100 ||
      math > 100 ||
      science > 100 ||
      sociology > 100 ||
      religion > 100
    ) {
      return (msgMarks.innerHTML = setAlert("Invalid Credentials"));
    } else {
      const allData = getDataLs("students");
      const updatedValues = {
        bangla,
        english,
        math,
        science,
        sociology,
        religion,
      };
      const updatedData = allData.map((item) => {
        if (item.id === id) {
          item.marks.forEach((subject) => {
            if (updatedValues.hasOwnProperty(subject.name)) {
              subject.value = updatedValues[subject.name];
            }
          });
        }
        return item;
      });
      localStorage.setItem("students", JSON.stringify(updatedData));
    }

    msgMarks.innerHTML = setAlert("Data Stable", "success");
    e.target.reset();
    modalClose.click();
    getAllStudents();
  };
};
const showStudentInfo = (id) => {
  const studentInfo = document.getElementById("student-info");
  const {
    photo,
    name,
    fatherName,
    motherName,
    board,
    dob,
    examination,
    group,
    institute,
    roll,
    reg,
    year,
    type,
  } = getSingleData("students", id);
  studentInfo.innerHTML = `
   <img src="${photo}" alt="${name}">
              <div><span>Name :</span> ${name}</div>
              <div><span>Father's Name :</span> ${fatherName}</div>
              <div><span>Mother's Name :</span> ${motherName}</div>
              <div><span>board :</span> ${board}</div>
              <div><span>Date Of Birth :</span> ${dob}</div>
              <div><span>Examination :</span> ${examination}</div>
              <div><span>Group :</span> ${group}</div>
              <div><span>Institute :</span> ${institute}</div>
              <div><span>Roll No :</span> ${roll}</div>
              <div><span>Registration :</span> ${reg}</div>
              <div><span>Year :</span> ${year}</div>
              <div><span>Type :</span> ${type}</div>
  `;
};
if (fileName == "admin.html") {
  getAllStudents();
}

if (fileName == "admin.html") {
  studentFrom.onsubmit = (e) => {
    e.preventDefault();
    const modalClose = document.getElementById("modalCloseBtn");

    // get form data from formData object

    let formData = new FormData(e.target);

    let {
      name,
      fatherName,
      motherName,
      dob,
      photo,
      institute,
      roll,
      reg,
      examination,
      board,
      year,
      group,
      type,
      validateSubmit,
    } = Object.fromEntries(formData.entries());

    // form validation

    if (
      !name ||
      !fatherName ||
      !motherName ||
      !dob ||
      !photo ||
      !institute ||
      !roll ||
      !reg ||
      !examination ||
      !board ||
      !year ||
      !type ||
      !validateSubmit
    ) {
      return (msg.innerHTML = setAlert("All Fields are required"));
    } else if (existRoll(roll)) {
      return (msg.innerHTML = setAlert("Roll Number Already exist"));
    } else if (existReg(reg)) {
      return (msg.innerHTML = setAlert("Registration Number Already exist"));
    } else {
      sendDataLs("students", {
        id: createId(),
        name,
        fatherName,
        motherName,
        dob,
        photo,
        institute,
        roll,
        reg,
        examination,
        board,
        year,
        group,
        type,
        marks: [],
        createdAt: Date.now(),
      });
      msg.innerHTML = setAlert("Data Stable", "success");
      e.target.reset();
      modalClose.click();
      getAllStudents();
    }
  };
}

// Search Results

const searchResultForm = document.getElementById("search-result-form");

if (fileName == "index.html" || fileName == "") {
  document.getElementById(
    "validateLabel"
  ).innerHTML = `${mathTest1} + ${mathTest2}`;
  searchResultForm.onsubmit = (e) => {
    e.preventDefault();

    // get form data from formData object

    let formData = new FormData(e.target);

    let { examination, year, board, roll, reg, validate } = Object.fromEntries(
      formData.entries()
    );
    if (!examination || !year || !board || !roll || !reg || !validate) {
      return alert("no input");
    }
    if (parseInt(validate) !== mathTest1 + mathTest2)
      return alert("you are a robot");
    const data = filterResult(examination, year, board, roll, reg);
    if (!data) return alert(" no data found");

    const changeURL = window.location.href.split("/");
    changeURL.pop();
    changeURL.push("result.html");
    window.location.href = "/result.html";
  };
}

if (fileName == "result.html") {
  const getStudentData = () => {
    const printResult = document.querySelector(".show-result");
    const data = showResult();
    if (data.length === 0) {
      window.location.href = "/index.html";
    }
    data.forEach((item) => {
      printResult.innerHTML = `
                      <h4>${item.examination} ${item.year}</h4>
                <table border="1" class="Information-table">
                    <tr>
                        <td colspan="4"><img src="${
                          item.photo
                        }" alt="UserProfile"></td>
                    </tr>
                    <tr>
                        <td>Roll No</td>
                        <td class="text-uppercase">${item.roll}</td>
                        <td>Name</td>
                        <td class="text-uppercase">${item.name}</td>
                    </tr>
                    <tr>
                        <td>Board</td>
                        <td class="text-uppercase">${item.board}</td>
                        <td>Father's Name</td>
                        <td class="text-uppercase">${item.fatherName}</td>
                    </tr>
                    <tr>
                        <td>Group</td>
                        <td class="text-uppercase">${item.group}</td>
                        <td>Mother's Name</td>
                        <td class="text-uppercase">${item.motherName}</td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td class="text-uppercase">${item.type}</td>
                        <td>Date of Birth</td>
                        <td class="text-uppercase">${item.dob}</td>
                    </tr>
                    <tr>
                        <td>Result</td>
                        <td class="fw-700 text-uppercase">${
                          resultCalculate(item.marks).isPass
                        }</td>
                        <td>Institute</td>
                        <td class="text-uppercase">${item.institute}</td>
                    </tr>
                    <tr>
                        <td>GPA</td>
                        <td colspan="3" class="fw-700 text-uppercase">${
                          resultCalculate(item.marks).GPA
                        }</td>
                    </tr>
                </table>
                ${
                  !getAllMarks(item.marks)
                    ? ""
                    : ` <h4>Grade Sheet</h4>
                <table border="1" class="Show-result-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Subject</th>
                            <th>Grade</th>
                            <th>GPA</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                     ${getAllMarks(item.marks)}
                    </tbody>
                </table>`
                }
                <a href="javascript:void(0)" onclick=goToSearch()>Search Again</a>
      `;
    });
  };
  getStudentData();
}
const goToSearch = () => {
  removeSecretKey();
  window.location.href = "/index.html";
};
