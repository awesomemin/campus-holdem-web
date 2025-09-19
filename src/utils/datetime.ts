export const formatDateTime = (datetime: string | Date): string => {
  const date = new Date(datetime);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[date.getDay()];

  return `${year}. ${month}. ${day}(${dayName}) ${hours}:${minutes}`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};