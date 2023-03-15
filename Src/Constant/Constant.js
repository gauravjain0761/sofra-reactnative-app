import Colors from "../Themes/Colors";
import { strings } from "../Config/I18n";
export const orderStatusData = [
  {
    title: strings("orders.lateralEntry.all"),
    color: Colors.green,
    type: "ALL",
  },
  { title: strings("orders.pending"), color: "#f3b902", type: "PENDING" },
  { title: strings("orders.accepted"), color: Colors.green, type: "ACCEPTED" },
  {
    title: strings("orders.lateralEntry.preparing"),
    color: Colors.blueTag,
    type: "PREPARING",
  },
  {
    title: strings("orders.ready_to_pick_up"),
    color: "#292ce0",
    type: "READY_FOR_PICKUP",
  },
  { title: strings("orders.picked"), color: "#81d742", type: "PICKED_UP" },
  { title: strings("orders.delivered"), color: "#dd9a32", type: "DELIVERED" },
  {
    title: strings("orders.lateralEntry.canceled_by_user"),
    color: "#ab1600",
    type: "CANCELED_USER",
  },
  {
    title: strings("orders.Rejected"),
    color: Colors.rejected,
    type: "REJECTED",
  },
];
