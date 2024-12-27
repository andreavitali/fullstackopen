import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.message;
    case "HIDE":
      return null;
    default:
      return state;
  }
};

const NotificationsContext = createContext();

export const NotificationsContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationsContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationsContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationsContext);
  return notificationAndDispatch[1];
};

export default NotificationsContext;
