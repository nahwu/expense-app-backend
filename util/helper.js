const getRandomMultipleArrayItem = (array, numberOfArrayItemsToReturn) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfArrayItemsToReturn);
};

exports.getRandomMultipleArrayItem = getRandomMultipleArrayItem;
