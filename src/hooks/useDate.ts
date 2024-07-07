import { useTranslation } from "react-i18next";
import { isToday } from "../helpers/compare";

const useDate = (date: Date | string) => {
  const { i18n } = useTranslation();

  if (!date) {
    return {};
  }

  if (typeof date === "string") {
    date = new Date(date);
  }

  return {
    HHmm: date.toLocaleTimeString(i18n.resolvedLanguage, {
      hour: "2-digit",
      minute: "2-digit",
    }),
    ddMMyyyy: date.toLocaleDateString(i18n.resolvedLanguage, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    isToday: isToday(date),
  };
};

export default useDate;
