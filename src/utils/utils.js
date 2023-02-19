export const formatToCurrency = (num) => {
  return num.toLocaleString(
    'en-US',
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
  console.log(snapshotPriceArr, depthUpdatePriceArr, type);
  const newArr = clone(snapshotPriceArr);
  let sorted = true;
  if (depthUpdatePriceArr.length > 0) {
    depthUpdatePriceArr.forEach((update) => {
      const index = snapshotPriceArr.findIndex(
        (element) => element[0] === update[0]
      );
      if (index !== -1) {
        if (update[1] === '0') {
          // price level exists, quantity set to 0, remove from list
          newArr.splice(index, 1);
        }
        //price level already exists, different quantity
        else {
          console.log(newArr[index]);
          newArr[index][1] = update[1];
          console.log(newArr[index]);
          console.log(snapshotPriceArr[index]);
        }
      }

      if (index === -1 && update[1] !== '0') {
        // new price level, add to list
        newArr.push(update);
        sorted = false;
      }
    });
    if (sorted === false) {
      if (type === 'bids') {
        newArr.sort((a, b) => b[0] - a[0]);
      }
      if (type === 'asks') {
        newArr.sort((a, b) => a[0] - b[0]);
      }
    }
  }
  console.log(snapshotPriceArr, type);
  return newArr;
};
