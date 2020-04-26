// sort candidates by low to high experience
const lowToHighExp = (a, b) => {
  return a.experience - b.experience;
};

// sort candidates by high to low experience
const highToLowExp = (a, b) => {
  return b.experience - a.experience;
};

// sort candidates alphabetically in increasing order
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

// sort candidates alphabetically in decreasing order
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

// function to generate a random color
const randomColor = () => {
  const colors = [
    'blue',
    'orange',
    'gold',
    'magenta',
    'red',
    'purple',
    'volcano',
    'lime',
    'green',
    'geekblue',
    'cyan',
  ];
  const randomNumber = Math.floor(Math.random() * 11);

  return colors[randomNumber];
};

export default {
  lowToHighExp,
  highToLowExp,
  aToZSort,
  zToASort,
  randomColor,
};
