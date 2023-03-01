import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import RNFetchBlob from "rn-fetch-blob";

export const validateEmail = (email) => {
  let re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const hasArabicCharacters = (text) => {
  var arregex = /[\u0600-\u06FF]/;
  return arregex.test(text);
};

export const dispatchAction = (dispatch, actionType, data) => {
  dispatch({
    type: actionType,
    payload: data,
  });
};

export const dispatchErrorAction = (dispatch, message) => {
  dispatch({ type: "PRE_LOADER_DELIVERY", payload: false });
  dispatch({
    type: "TOAST",
    payload: {
      message: message,
      type: "error",
    },
  });
};

export const dispatchSuccessAction = (dispatch, message) => {
  dispatch({ type: "PRE_LOADER_DELIVERY", payload: false });

  dispatch({
    type: "TOAST",
    payload: {
      message: message,
      type: "success",
    },
  });
};

export const getFromDataJson = (mainArray, selectedData, keyName, language) => {
  if (language) {
    let tempArray = [];
    selectedData.map((element, index) => {
      const temp =
        language == "en"
          ? mainArray.filter((obj) => obj.name == element)
          : mainArray.filter((obj) => obj.name_ar == element);
      if (temp.length !== 0) {
        tempArray.push(keyName + "[" + index + "]");
        tempArray.push(temp[0].id);
      }
    });
    var ob2 = {};
    for (var i = 0; i < tempArray.length; i += 2) {
      ob2[tempArray[i]] = tempArray[i + 1];
    }
    return ob2;
  } else {
    let tempArray = [];
    selectedData.map((element, index) => {
      const temp = mainArray.filter((obj) => obj.name == element);
      if (temp.length !== 0) {
        tempArray.push(keyName + "[" + index + "]");
        tempArray.push(temp[0].id);
      }
    });
    var ob2 = {};
    for (var i = 0; i < tempArray.length; i += 2) {
      ob2[tempArray[i]] = tempArray[i + 1];
    }
    return ob2;
  }
};

export const getDataJsonAvailability = (data, keyname) => {
  let tempArray = [];
  data.map((element, index) => {
    tempArray.push(keyname + "[" + index + "]");
    tempArray.push(element[keyname]);
  });
  var ob2 = {};
  for (var i = 0; i < tempArray.length; i += 2) {
    ob2[tempArray[i]] = tempArray[i + 1];
  }
  return ob2;
};

export const simplifyDateTime = (date, flag) => {
  var DATE = moment(date);
  var REFERENCE = moment();
  var TODAY = REFERENCE.clone().startOf("day");
  var YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");

  if (flag === "time") {
    // If you want only time from date object
    return DATE.format("hh:mm A");
  } else if (flag === "date") {
    // If you want only date from date object
    if (DATE.isSame(REFERENCE, "week")) {
      // Check if date is today, yesterday, weekday or others
      if (DATE.isSame(TODAY, "d")) return DATE.format("hh:mm A");
      else if (DATE.isSame(YESTERDAY, "d")) return "Yesterday";
      else return DATE.format("dddd");
    } else return DATE.format("MM/DD/YYYY");
  } else {
    // If you want only date and time both from date object
    if (DATE.isSame(REFERENCE, "week")) {
      // Check if date is today, yesterday, weekday or others
      if (DATE.isSame(TODAY, "d")) return `Today ${DATE.format("hh:mm A")}`;
      else if (DATE.isSame(YESTERDAY, "d"))
        return `Yesterday ${DATE.format("hh:mm A")}`;
      else return DATE.format("dddd hh:mm A");
    } else return DATE.format("MM/DD/YYYY hh:mm A");
  }
};

const getLocation = (addresss) => {
  return JSON.parse(addresss).address
    ? JSON.parse(addresss).address.replace(/,/g, ";")
    : "";
};

const getMerchantReportData = (report) => {
  let json = [
    {
      "Sr#": "Sr#",
      "Order ID": "Order ID",
      "Order Date": "Order Date",
      Time: "Time",
      "Mode of Payment": "Mode of Payment",
      "Sub Total": "Sub Total",
      Discount: "Discount",
      "Net Amount": "Net Amount",
      Vat: "Vat",
      "Gross Amount": "Gross Amount",
      "Sofra Comissionable Amount": "Sofra Comissionable Amount",
      "Sofra Comission": "Sofra Comission",
      "Sofra Comission Amount": "Sofra Comission Amount",
      "Convenience Fee": "Convenience Fee",
      "Sofra VAT": "Sofra VAT",
      "Sofra Payable Charges (Incl. VAT)": "Sofra Payable Charges (Incl. VAT)",
      "Receivable from Sofra": "Receivable from Sofra",
      "Sattlement Date": "Sattlement Date",
      "Sattlement Reference": "Sattlement Reference",
    },
  ];
  if (report.items.length !== 0) {
    report.items.forEach((element, index) => {
      json.push({
        "Sr#": index + 1,
        "Order ID": element.bookingCode,
        "Order Date": moment(element.created).format("YYYY-MM-DD"),
        Time: moment(element.created).format("hh:mm A"),
        "Mode of Payment": element.paymentType,
        "Sub Total": "AED " + element.itemsPrice,
        Discount: "-AED " + element.discount,
        "Net Amount": "AED " + (element.itemsPrice - element.discount),
        Vat: "AED " + element.vat,
        "Gross Amount":
          "AED " + (element.itemsPrice - element.discount + element.vat),
        "Sofra Comissionable Amount": "AED " + element.itemsPrice,
        "Sofra Comission": "% " + element.comissionPercentage,
        "Sofra Comission Amount": "",
        "Convenience Fee": "",
        "Sofra VAT": "",
        "Sofra Payable Charges (Incl. VAT)": "",
        "Receivable from Sofra": "",
        "Sattlement Date": element.settlementDate,
        "Sattlement Reference": element.settlementReference,
      });
    });
  }
  return json;
};

const getCompanyReportData = (report) => {
  let json = [
    {
      "Sr#": "Sr#",
      Driver: "Driver",
      "Order ID": "Order ID",
      Location: "Location",
      "Mode of Payment": "Mode of Payment",
      "Order Date": "Order Date",
      "Order Value": "Order Value",
      "Deposit To Sofra Account Status": "Deposit To Sofra Account Status",

      "Delivery Duration": "Delivery Duration",
      "Delivery Charges (Vat Inc)": "Delivery Charges (Vat Inc)",
      "Convenient Fee": "Convenient Fee",
      Penalty: "Penalty",
      "Balance to Receive": "Balance to Receive",
      "Settlement Reference": "Settlement Reference",
    },
  ];
  if (report.items.length !== 0) {
    report.items.forEach((element, index) => {
      json.push({
        "Sr#": index + 1,
        Driver: element?.driver?.name,
        "Order ID": element.bookingCode,
        Location: getLocation(element.deliveryAddress),
        "Mode of Payment": element.paymentType,
        "Order Date": moment(element.created).format("YYYY-MM-DD"),
        "Order Value": "AED " + element.totalPrice,
        "Deposit To Sofra Account Status": element.amountDepositedToSofra,
        "Delivery Duration": element.timeSpendForDelivery + " min",
        "Delivery Charges (Vat Inc)":
          "AED " + (element.serviceCharges + element.deliveryVat),
        "Convenient Fee": "AED " + element.convenienceFeeAmount,
        Penalty: "AED " + element.penalty,
        "Balance to Receive": "AED " + element.receiveAbleAmount,
        "Settlement Reference": element.settlementReference,
      });
    });
  }
  return json;
};

export const exportToCsv = (REPORT, reportType, dispatch, user) => {
  try {
    let data =
      user == "company"
        ? getCompanyReportData(REPORT)
        : getMerchantReportData(REPORT);

    const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/Report_${
      reportType == "Settled Report" ? "Settled" : "Un-Settled"
    }_${moment().unix()}.csv`;
    const csvString = `${ConvertToCSV(data)}`;
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, "utf8")
      .then(() => {
        dispatchSuccessAction(
          dispatch,
          "Report downloaded Successfully, Please check your downloads."
        );
      })
      .catch((error) => alert(error));
  } catch (error) {
    console.log(error);
  }
};

const ConvertToCSV = (objArray) => {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";
  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";
      line += array[i][index];
    }
    str += line + "\r\n";
  }
  return str;
};

const getOrderCsvData = (order) => {
  let json = [
    {
      "SR#": "SR#",
      Merchant: "Merchant",
      "Order ID": "Order ID",
      "Total Amount": "Total Amount",
      "Pickup Location": "Pickup Location",
      "Delivery Location": "Delivery Location",
      Driver: "Driver",
      "Date & Time": "Date & Time",
      Status: "Status",
    },
  ];
  if (order.length !== 0) {
    order.forEach((element, index) => {
      json.push({
        "SR#": index + 1,
        Merchant: element.restaurant.name,
        "Order ID": element.bookingCode,
        "Total Amount": "AED " + element.totalPrice,
        "Pickup Location": element.restaurant.location.replace(/,/g, ";"),
        "Delivery Location": element.deliveryAddress
          ? getLocation(element.deliveryAddress)
          : "",
        Driver: element.driver ? element.driver.name : "N/A",
        "Date & Time": moment(element.bookingDate).format("YYYY-MM-DD hh:mm A"),
        Status: element.status,
      });
    });
  }
  return json;
};

const getPickupOrderCsvData = (order) => {
  let json = [
    {
      "SR#": "SR#",
      Merchant: "Merchant",
      "Order ID": "Order ID",
      "Total Amount": "Total Amount",
      "Pickup Location": "Pickup Location",
      "Delivery Location": "Delivery Location",
      "Delivery Date & Time": "Delivery Date & Time",
      Status: "Status",
    },
  ];
  if (order.length !== 0) {
    order.forEach((element, index) => {
      json.push({
        "SR#": index + 1,
        Merchant: element.restaurant.name,
        "Order ID": element.bookingCode,
        "Total Amount": "AED " + element.totalPrice,
        "Pickup Location": element.restaurant.location.replace(/,/g, ";"),
        "Delivery Location": element.deliveryAddress
          ? getLocation(element.deliveryAddress)
          : "",
        "Delivery Date & Time": moment(element.bookingDate).format(
          "YYYY-MM-DD hh:mm A"
        ),
        Status: element.status,
      });
    });
  }
  return json;
};

const getMerchantOrderCsv = (order) => {
  let json = [
    {
      "SR#": "SR#",
      Customer: "Customer",
      ID: "ID",
      Amount: "Amount",
      "Payment Method": "Payment Method",
      "Date & Time": "Date & Time",
      Status: "Status",
      "CREATED AT": "CREATED AT",
    },
  ];
  if (order.length !== 0) {
    order.forEach((element, index) => {
      json.push({
        "SR#": index + 1,
        Customer: element.user.name,
        ID: element.bookingCode,
        Amount: "AED " + element.totalPrice,
        "Payment Method": element.paymentType,
        "Date & Time": moment(element.bookingDate).format("MMM DD YYYY"),
        Status: element.status,
        "CREATED AT": moment(element.created).format("MMM DD YYYY hh:mm A"),
      });
    });
  }
  return json;
};

export const exportToCsvOrder = (order, type, dispatch, name) => {
  try {
    let data =
      type == "active"
        ? getOrderCsvData(order)
        : type == "merchant"
        ? getMerchantOrderCsv(order)
        : getPickupOrderCsvData(order);

    const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/${
      name + moment().unix()
    }.csv`;
    const csvString = `${ConvertToCSV(data)}`;
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, "utf8")
      .then(() => {
        dispatchSuccessAction(
          dispatch,
          "Orders file downloaded Successfully, Please check your downloads."
        );
      })
      .catch((error) => alert(error));
  } catch (error) {
    console.log(error);
  }
};
