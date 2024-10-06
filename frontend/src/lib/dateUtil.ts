const daysOfWeek = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

export const parseToDateSlash = (dateStr: string) => {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export const formatToDateStr = (date: Date) => {
  return date.toLocaleDateString("en-CA");
};

export const getCalendarRange = (year: number, month: number) => {
  // 月份從1開始，但Date物件的月份是從0開始，所以需要減1
  const firstDayOfMonth = new Date(year, month - 1, 1);

  // 計算日曆範圍的開始日期
  // getDay() 返回的是星期幾，0是星期日，6是星期六
  const startDayOffset = firstDayOfMonth.getDay(); // 這個月的第一天是星期幾
  // 月曆的開始日期是上個月的最後幾天
  const calendarStart = new Date(firstDayOfMonth);
  calendarStart.setDate(calendarStart.getDate() - startDayOffset);

  const calendarEnd = new Date(calendarStart);
  calendarEnd.setDate(calendarStart.getDate() + 41); // 日曆一次顯示42天，所以加41來找到結束的日期

  // 格式化開始和結束日期
  const start = formatToDateStr(calendarStart); // 使用已有的formatToDateStr函數
  const end = formatToDateStr(calendarEnd);

  return { start, end };
};

export const formatToYYYYMMDD = (year: number, month: number, day: number) => {
  const monthStr = String(month).padStart(2, "0");
  const dayStr = String(day).padStart(2, "0");
  return `${year}/${monthStr}/${dayStr}`;
};

export const getWeekDay = (dateStr: string) => {
  const date = new Date(dateStr);
  return daysOfWeek[date.getDay()];
};

export const parseDateString = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return { year, month, day };
};
