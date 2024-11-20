export const formatDate = (date, weekday = false) => {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  if (weekday) {
    options.weekday = "long";
  }

  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

export const formatTime = (date) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

export const formatPhoneNumber = (number) => {
  const numberStr = number.toString();

  if (numberStr.length === 11) {
    const countryCode = numberStr.slice(0, 2);
    const parts = numberStr.slice(2);

    const formatted = `+${countryCode} ${parts.slice(0, 1)} ${parts.slice(
      1,
      3
    )} ${parts.slice(3, 5)} ${parts.slice(5, 7)} ${parts.slice(7)}`;

    return formatted;
  }

  return numberStr;
};
