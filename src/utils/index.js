const lowToHighExp = (a, b) => {
  return a.experience - b.experience;
};

const highToLowExp = (a, b) => {
  return b.experience - a.experience;
};

const aToZSort = (a, b) => {
  var nameA = a.firstName.toUpperCase();
  var nameB = b.firstName.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

const zToASort = (a, b) => {
  var nameA = a.firstName.toUpperCase();
  var nameB = b.firstName.toUpperCase();
  if (nameA < nameB) {
    return 1;
  }
  if (nameA > nameB) {
    return -1;
  }

  return 0;
};

export default {
  lowToHighExp,
  highToLowExp,
  aToZSort,
  zToASort,
};
