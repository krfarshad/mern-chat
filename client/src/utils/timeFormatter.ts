export const timeFormatter = (time: Date | string): string => {
  const now = new Date();
  const timeDiff = now.getTime() - new Date(time).getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours >= 1) {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else if (seconds > 0) {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  } else {
    return `just now`;
  }
};
