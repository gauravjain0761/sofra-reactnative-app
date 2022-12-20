export const ItemTypeData = [
  { id: 1, name: "Normal" },
  { id: 2, name: "Cold" },
];

export const CurrentDeliverData = [
  { id: 1, name: "Yes" },
  { id: 2, name: "No" },
];

export const ExpiryTypeData = [
  { id: 0, name: "NO", label: "No Limit" },
  { id: 1, name: "DATE", label: "For Specific Dates" },
  { id: 2, name: "COUNT", label: "For Specific Count" },
];

export const VendorsValidityData = [
  { id: 1, name: "ALL", label: "For All Users" },
  { id: 2, name: "USERS", label: "For Specific Users" },
];

export const reportDropdownData = [
  { id: 1, name: "Settled Report" },
  { id: 2, name: "Un-Settled Report" },
];

export const vatType = [
  { id: 1, name: "EXCLUSIVE" },
  { id: 2, name: "INCLUSIVE" },
];

export const offerUserData = [
  { id: 1, name: "ALL", label: "For All Users" },
  { id: 2, name: "SPECIFIC", label: "For Specific Users" },
];

export const discountType = [
  { id: 1, name: "Price" },
  { id: 2, name: "Percentage" },
];

export const deliveryTimeData = () => {
  let time = [];
  for (let i = 5; i <= 2880; i = i + 5) {
    let temp = { name: "", label: "" };
    if (i > 59) {
      if (i > 1435) {
        let HourData = toHoursAndMinutes(i);
        let converted_time = HourData.hours + ":" + HourData.minutes + " Hour";

        temp.label = converted_time;
        temp.name = i;
        time.push(temp);
      } else {
        let HourData = toHoursAndMinutes(i);
        let converted_time = HourData.hours + ":" + HourData.minutes + " Hour";
        temp.label = converted_time;
        temp.name = i;
        time.push(temp);
      }
    } else {
      let converted_time = i + " Min";
      temp.label = converted_time;
      temp.name = i;
      time.push(temp);
    }
  }

  return time;
};

const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minutes = (totalMinutes % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return { hours, minutes };
};
