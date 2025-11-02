import React, { createContext, useContext, useState, useCallback, useId } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'recommendation';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  dismissible?: boolean;
}

export interface NotificationContextType {
  notifications: Notification[];
  notify: (notification: Omit<Notification, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  recommend: (title: string, message: string, action?: Notification['action']) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationIdCounter = useId();

  const notify = useCallback(
    (notification: Omit<Notification, 'id'>): string => {
      const id = `${notificationIdCounter}-${Date.now()}`;
      const fullNotification: Notification = {
        ...notification,
        id,
        duration: notification.duration ?? 5000,
        dismissible: notification.dismissible !== false,
      };

      setNotifications(prev => [fullNotification, ...prev]);

      // Auto-dismiss if duration is set
      if (fullNotification.duration) {
        setTimeout(() => {
          dismiss(id);
        }, fullNotification.duration);
      }

      return id;
    },
    [notificationIdCounter]
  );

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const success = useCallback((title: string, message?: string) => {
    notify({ type: 'success', title, message });
  }, [notify]);

  const error = useCallback((title: string, message?: string) => {
    notify({ type: 'error', title, message, duration: 7000 });
  }, [notify]);

  const info = useCallback((title: string, message?: string) => {
    notify({ type: 'info', title, message });
  }, [notify]);

  const warning = useCallback((title: string, message?: string) => {
    notify({ type: 'warning', title, message });
  }, [notify]);

  const recommend = useCallback(
    (title: string, message: string, action?: Notification['action']) => {
      notify({
        type: 'recommendation',
        title,
        message,
        action,
        duration: 10000,
      });
    },
    [notify]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notify,
        dismiss,
        dismissAll,
        success,
        error,
        info,
        warning,
        recommend,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
