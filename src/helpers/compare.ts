export const isNullish = (value: any) => value === null || value === undefined;

export const isToday = (date: Date) => new Date().toDateString() === date.toDateString();
