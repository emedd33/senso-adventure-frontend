const parseActionUsage = (usage: {
  type: string;
  dice?: string;
  min_value?: number;
  times?: number;
}) => {
  switch (usage.type) {
    case "recharge on roll":
      return `${
        usage.times ? `Usable ${usage.times}.` : ""
      }Recharges each turn on ${usage.min_value}+ (${usage.dice})`;
    case "per day":
      return `${
        usage.times ? `Usable ${usage.times} times.` : null
      } Recharges each day`;
    default:
      var e = new Error(
        `not valid usage type, please add ${usage.type} to parseActionUsage function `
      );
      throw e;
  }
};
const parseSuccessType = (type: string) => {
  switch (type) {
    case "none":
      return "No effect";
    case "half":
      return "Half damage";
    default:
      return "type";
  }
};

export { parseActionUsage, parseSuccessType };
