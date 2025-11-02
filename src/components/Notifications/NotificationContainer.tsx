import React from 'react';
import { useNotification } from '@/context/NotificationContext';
import NotificationItem from './NotificationItem';

/**
 * Container component that displays all active notifications
 * Should be placed near the top of your app component tree
 */
export const NotificationContainer = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-6 right-6 z-50 max-w-md space-y-3 pointer-events-none">
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;
