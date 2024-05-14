/**
 * get data ls
 * @param {*} key
 */
const getDataLs = (key) => {
  const data = localStorage.getItem(key);

  if (!data) false;

  return JSON.parse(data);
};

/**
 * Save Data ls
 * @param {*} key
 * @param {*} data
 */
const sendDataLs = (key, data) => {
  const stdData = localStorage.getItem(key);

  let lsData;
  if (stdData) {
    lsData = JSON.parse(stdData);
  } else {
    lsData = [];
  }

  lsData.push(data);
  localStorage.setItem(key, JSON.stringify(lsData));
};

/**
 * Show Single Student From ls
 * @param {*} key
 * @param {*} id
 * @returns
 */

const getSingleData = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key));

  if (data) {
    return data.find((data) => data.id == id);
  } else {
    return false;
  }
};

/**
 *
 * @param {*} key
 * @param {*} id
 * @returns
 */
const deleteSingleStudent = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key));

  if (data) {
    const updatedData = data.filter((data) => data.id !== id);
    localStorage.setItem(key, JSON.stringify(updatedData));
  } else {
    return false;
  }
};

const filterResult = (examination, year, board, roll, reg) => {
  const allData = getDataLs("students");
  if (!allData) {
    return false;
  }

  const finalData = allData.map((item) => {
    if (
      item.examination === examination &&
      item.year === year &&
      item.board === board &&
      item.roll === roll &&
      item.reg === reg
    ) {
      return {
        ...item,
        code: "secret-key",
      };
    }
    return item;
  });
  const checkValidity = allData.filter((item) => {
    if (
      item.examination === examination &&
      item.year === year &&
      item.board === board &&
      item.roll === roll &&
      item.reg === reg
    ) {
      return true;
    }
  });
  if (checkValidity.length === 0) {
    return false;
  }
  localStorage.setItem("students", JSON.stringify(finalData));
  return finalData;
};

const showResult = () => {
  const allData = getDataLs("students");

  return allData.filter((item) => {
    if (item.code) {
      return item;
    }
  });
};

const removeSecretKey = () => {
  const allData = getDataLs("students");
  const updatedData = allData.map((item) => {
    if (item.code) {
      delete item.code;
      return item;
    }
    return item;
  });
  localStorage.setItem("students", JSON.stringify(updatedData));
};

const existRoll = (roll) => {
  const allData = getDataLs("students");
  if (!allData) false;

  const stdRoll = allData.filter((item) => {
    if (item.roll === roll) {
      return true;
    }
  });

  if (stdRoll.length === 0) {
    return false;
  }
  return stdRoll;
};
const existReg = (reg) => {
  const allData = getDataLs("students");
  if (!allData) false;
  const stdReg = allData.filter((item) => {
    if (item.reg === reg) {
      return true;
    }
  });

  if (stdReg.length === 0) {
    return false;
  }
  return stdReg;
};
