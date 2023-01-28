import moment from "moment";

export const FormatDate = (date: Date | undefined) => {
  return moment(date).calendar(date, {
    sameDay: "LT",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "[Last] dddd",
    sameElse: "DD/MM/YYYY",
  });
};
