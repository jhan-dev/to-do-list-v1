module.exports = getDate;

const getDate = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  
  return today.toLocaleDateString("en-US", options);
};

module.exports = getDay;

const getDay = () => {
  const today = new Date();
  const options = {
    weekday: "long"
  };

  return today.toLocaleDateString("en-US", options);
};