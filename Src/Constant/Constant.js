import Colors from "../Themes/Colors";

export const orderStatusData = [
  { title: "All", color: Colors.green, type: "ALL" },
  { title: "Pending", color: Colors.pink, type: "PENDING" },
  { title: "Accepted", color: Colors.green, type: "ACCEPTED" },
  { title: "Preparing", color: Colors.blueTag, type: "PREPARING" },
  { title: "Ready to pick up", color: Colors.purple, type: "READY_FOR_PICKUP" },
  { title: "Picked", color: Colors.green, type: "PICKED_UP" },
  { title: "Delivered", color: Colors.green, type: "DELIVERED" },
  { title: "Canceled by User", color: Colors.red, type: "CANCELED_USER" },
  { title: "Rejected", color: Colors.rejected, type: "REJECTED" },
];
