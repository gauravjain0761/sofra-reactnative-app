import moment from "moment";
import { strings } from "./I18n";
export const ItemTypeData = [
  { id: 1, name: "Normal" },
  { id: 2, name: "Cold" },
];

export const CurrentDeliverData = [
  { id: 1, name: "Yes", name_ar: "نعم" },
  { id: 2, name: "No", name_ar: "لا" },
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
  { id: 1, name: strings("report_screen.lateralEntry.settled_report") },
  { id: 2, name: strings("report_screen.lateralEntry.unSettled_report") },
];

export const driverTypeData = [
  { id: 1, name: "Inside City" },
  { id: 2, name: "Cross Border" },
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

export const language = [
  { id: 1, name: "English" },
  { id: 2, name: "عربي" },
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

export const dateFilterData = [
  {
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    id: 0,
    name: moment().format("MM/DD/YYYY") + " - " + moment().format("MM/DD/YYYY"),
    label: strings("lateral_entry.days.today"),
  },
  {
    startDate: moment().subtract(1, "day").format("YYYY-MM-DD"),
    endDate: moment().subtract(1, "day").format("YYYY-MM-DD"),
    id: 1,
    name:
      moment().subtract(1, "day").format("MM/DD/YYYY") +
      " - " +
      moment().subtract(1, "day").format("MM/DD/YYYY"),
    label: strings("lateral_entry.days.yesterday"),
  },
  {
    startDate: moment().subtract(6, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    id: 2,
    name:
      moment().subtract(6, "days").format("MM/DD/YYYY") +
      " - " +
      moment().format("MM/DD/YYYY"),
    label: strings("lateral_entry.days.last7days"),
  },
  {
    startDate: moment().subtract(29, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    id: 2,
    name:
      moment().subtract(29, "day").format("MM/DD/YYYY") +
      " - " +
      moment().format("MM/DD/YYYY"),
    label: strings("lateral_entry.days.last30days"),
  },
  {
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
    id: 0,
    name:
      moment().startOf("month").format("MM/DD/YYYY") +
      " - " +
      moment().endOf("month").format("MM/DD/YYYY"),
    label: strings("lateral_entry.days.this_month"),
  },
  {
    startDate: moment()
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD"),
    endDate: moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
    id: 0,
    name:
      moment().subtract(1, "month").startOf("month").format("MM/DD/YYYY") +
      " - " +
      moment().subtract(1, "month").endOf("month").format("MM/DD/YYYY"),
    label: strings("lateral_entry.days.last_month"),
  },
  { startDate: "", endDate: "", id: 0, name: "CUSTOM", label: "Custom Range" },
];
