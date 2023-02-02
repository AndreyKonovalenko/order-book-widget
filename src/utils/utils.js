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
