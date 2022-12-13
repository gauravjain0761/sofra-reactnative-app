import Colors from "../Themes/Colors";

export const orderStatusData = [
  { title: "Pending", color: Colors.pink, type: "PENDING" },
  { title: "Accepted", color: Colors.green, type: "ACCEPTED" },
  { title: "Prepare", color: Colors.blueTag, type: "PREPARING" },
  { title: "Ready to pick up", color: Colors.purple, type: "READY_FOR_PICKUP" },
  { title: "Delivered", color: Colors.green, type: "DELIVERED" },
  { title: "Picked", color: Colors.green, type: "PICKED_UP" },
  { title: "Canceled", color: Colors.red, type: "CANCELED_USER" },
  { title: "Rejected", color: Colors.rejected, type: "REJECTED" },
];
