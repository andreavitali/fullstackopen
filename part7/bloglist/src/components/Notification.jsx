import { useSelector } from "react-redux";
import { NotificationTypes } from "../reducers/notificationReducer";

const error = {
  color: "red",
  background: "lightgrey",
  font_size: 20,
  border_style: "solid",
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
};

const success = {
  color: "green",
  background: "lightgrey",
  font_size: 20,
  border_style: "solid",
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
};

const Notification = () => {
  const notification = useSelector(state => state.notification);

  return notification.message ? (
    <div id="notification" style={notification.type === NotificationTypes.ERROR ? error : success}>
      {notification.message}
    </div>
  ) : null;
};

export default Notification;
