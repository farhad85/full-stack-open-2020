import "./style.css";

const Notification = ({ message, isError }) => {
  if (!message) {
    return null;
  }

  const className = isError ? "error" : "success";

  return <div className={"notification " + className}>{message}</div>;
};

export default Notification;
