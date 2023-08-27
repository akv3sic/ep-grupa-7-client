/**
 * Convert ISO 8601 date format to day-month-year with time format.
 * @param isoDateStr - The date string in ISO 8601 format.
 * @returns - The date string in "day.month.year hour:minute:second" format.
 */
const isoToDayMonthYearWithTime = (isoDateStr: string): string => {
    const date = new Date(isoDateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${day}.${month}.${year} ${hour}:${minute}:${second}`;
};

export { isoToDayMonthYearWithTime };
