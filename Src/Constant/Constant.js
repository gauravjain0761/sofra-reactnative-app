import Colors from "../Themes/Colors";
import {strings} from '../Config/I18n';
export const orderStatusData = [
  { title: "All", color: Colors.green, type: "ALL" },
  { title: strings('orders.pending'), color: Colors.pink, type: "PENDING" },
  { title: strings('orders.accepted'), color: Colors.green, type: "ACCEPTED" },
  { title: strings('orders.lateralEntry.preparing'), color: Colors.blueTag, type: "PREPARING" },
  { title: strings('orders.ready_to_pick_up'), color: Colors.purple, type: "READY_FOR_PICKUP" },
  { title: strings('orders.picked'), color: Colors.green, type: "PICKED_UP" },
  { title: strings('orders.delivered'), color: Colors.green, type: "DELIVERED" },
  { title: strings('orders.lateralEntry.canceled_by_user'), color: Colors.red, type: "CANCELED_USER" },
  { title: strings('orders.Rejected'), color: Colors.rejected, type: "REJECTED" },
];
