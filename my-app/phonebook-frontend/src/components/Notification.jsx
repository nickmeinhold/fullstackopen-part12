import { ResponseStatus } from "../constants/constants";

const NotificationMessage = ({ message, responseStatus }) => {
  let messageStyle = {
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  if (responseStatus == ResponseStatus.SUCCESS) {
    messageStyle.color = "green";
  } else {
    messageStyle.color = "red";
  }

  if (!message) {
    return null;
  }

  return <div style={messageStyle}>{message}</div>;
};

export default NotificationMessage;
