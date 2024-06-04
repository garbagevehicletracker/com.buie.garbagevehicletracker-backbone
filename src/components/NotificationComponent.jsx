// components/NotificationComponent.js

// eslint-disable-next-line react/prop-types
const NotificationComponent = ({ message }) => {
  return (
    <div className="notification-item">
      <p>{message}</p>
    </div>
  );
};

export default NotificationComponent;
