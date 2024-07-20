import { useTranslation } from "react-i18next";
import { isToday } from "../helpers/compare";

type ReturnedType = { HHmm?: string; ddMMyyyy?: string; ddMonth?: string; fullDate?: string; isToday?: boolean };

const useDate = (date: Date | string): ReturnedType => {
  const { i18n } = useTranslation();

  if (!date) {
    return {};
  }

  if (typeof date === "string") {
    date = new Date(date);
  }

  const getLocalString = (options?: Intl.DateTimeFormatOptions) =>
    date.toLocaleString(i18n.resolvedLanguage, options);

  return {
    HHmm: getLocalString({ hour: "2-digit", minute: "2-digit" }),
    ddMMyyyy: getLocalString({ day: "2-digit", month: "2-digit", year: "numeric" }),
    ddMonth: getLocalString({ day: "2-digit", month: "long" }),
    fullDate: getLocalString(),
    isToday: isToday(date),
  };
};

export default useDate;
