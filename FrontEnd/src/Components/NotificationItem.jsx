import React from "react";

const NotificationItem = ({ notification, onMarkRead }) => {
  return (
    <div
      className={`p-4 rounded-xl shadow-sm border flex justify-between items-center transition-all ${
        notification.read ? "bg-gray-100" : "bg-purple-50 border-purple-400"
      }`}
    >
      <div>
        <p className="font-semibold text-gray-800">{notification.type}</p>
        <p className="text-gray-600 text-sm">{notification.content}</p>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(notification.createdAt).toLocaleString()}
        </p>
      </div>

      {!notification.read && (
        <button
          onClick={() => onMarkRead(notification._id)}
          className="text-sm px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg"
        >
          Mark as Read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;
