export const formatToCurrency = (num) => {
  return num.toLocaleString(
    "en-US",
    { minimumFractionDigits: 2 },
    {
      maximumFractionDigits: 2,
    }
  );
};

export const findMax = (arr) => {
  const amountArr = arr.map((element) => parseFloat(element[1]));
  return Math.max(...amountArr);
};

const clone = (arr) => {
  return arr.map((element) => {
    return element.slice();
  });
};

export const manageOrderBook = (
  snapshotPriceArr,
  depthUpdatePriceArr,
  type
) => {
  const newArr = clone(snapshotPriceArr);
  let sorted = true;
  console.log(depthUpdatePriceArr);
  if (depthUpdatePriceArr.length > 0) {
    depthUpdatePriceArr.forEach((update) => {
      const index = snapshotPriceArr.findIndex(
        (element) => element[0] === update[0]
      );
      if (index !== -1) {
        if (update[1] === "0.00000000") {
          // price level exists, quantity set to 0, remove from list
          newArr.splice(index, 1);
        }
        //price level already exists, different quantity
        else {
          console.log(update[1], update);
          newArr[index][1] = update[1];
        }
      }

      if (index === -1 && update[1] !== "0.00000000") {
        // new price level, add to list
        sorted = false;
      }
    });
    if (sorted === false) {
      if (type === "bids") {
        newArr.sort((a, b) => b[0] - a[0]);
      }
      if (type === "asks") {
        newArr.sort((a, b) => a[0] - b[0]);
      }
    }
  }
  return newArr;
};
