const arrayOfNumbers = [1, 3, 7, 8, 9, 10, 11];
console.log("Provided array: ", arrayOfNumbers);

// Slices and shifts a provided array
function shiftArray(array) {
  const index = Math.floor(Math.random() * array.length);
  let shiftedArray = [];
  shiftedArray = [...array.slice(index), ...array.slice(0, index)];
  return shiftedArray;
}

// Finds the biggest number in a provided array
function findBiggestNumber(array) {
  let number = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > number) {
      number = array[i];
    } else {
      break;
    }
  }
  return number;
}

const shifetedArray = shiftArray(arrayOfNumbers);
console.log("Shifted Array: ", shifetedArray);

const biggestNumber = findBiggestNumber(shifetedArray);
console.log("Highest number: ", biggestNumber);

// 1. Edge cases: Provide an empty array

// 2. Since the worst case scenario is going through all the array's elements with a for loop,
// then the complexity of the algorithm is O(n)

// 3. More optimized solution is adding Binary search, which reduces the complexity of
// the algorithm to Log(n), below is an improved function:

const findBiggestNumberImp = (array) => {
  if (array.length === 0) return null;
  let startIndex = 0;
  let endIndex = array.length - 1;
  let middleIndex = Math.floor((endIndex + startIndex) / 2);
  if (
    array[startIndex] <= array[middleIndex] &&
    array[middleIndex] < array[endIndex]
  ) {
    return array[endIndex];
  }
  while (middleIndex < endIndex) {
    if (array[middleIndex] > array[startIndex]) {
      startIndex = middleIndex;
    } else {
      endIndex = middleIndex;
    }
    middleIndex = Math.floor((endIndex + startIndex) / 2);
  }
  return array[endIndex];
};

const biggestNumberImp = findBiggestNumberImp(shifetedArray);
console.log("Highest number with improved function: ", biggestNumberImp);
