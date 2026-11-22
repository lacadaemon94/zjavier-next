export const formatDate = (date: string) => {
  const parsed = new Date(date);
  const isCurrentYear = parsed.getUTCFullYear() === new Date().getUTCFullYear();

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(isCurrentYear ? {} : { year: "numeric" }),
    timeZone: "UTC",
  }).format(parsed);
};