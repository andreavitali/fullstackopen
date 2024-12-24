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

const Notification = ({ message }) => {
  return message ? (
    <div id="notification" style={message.includes("ERROR") ? error : success}>
      {message}
    </div>
  ) : null;
};

export default Notification;
