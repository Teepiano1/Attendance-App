
const useTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minute = date.getMinutes();

  const time = hours + ":" + minute;
  return {
    time,
  };
};

export default useTime;
