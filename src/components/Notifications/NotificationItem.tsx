import React from 'react';
import { Notification } from '@/context/NotificationContext';
import { useNotification } from '@/context/NotificationContext';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { dismiss } = useNotification();

  const styles = {
    success: {
      container: 'bg-green-500/10 border-green-500/30',
      icon: 'text-green-400',
      title: 'text-green-100',
      message: 'text-green-100/70',
    },
    error: {
      container: 'bg-red-500/10 border-red-500/30',
      icon: 'text-red-400',
      title: 'text-red-100',
      message: 'text-red-100/70',
    },
    info: {
      container: 'bg-blue-500/10 border-blue-500/30',
      icon: 'text-blue-400',
      title: 'text-blue-100',
      message: 'text-blue-100/70',
    },
    warning: {
      container: 'bg-yellow-500/10 border-yellow-500/30',
      icon: 'text-yellow-400',
      title: 'text-yellow-100',
      message: 'text-yellow-100/70',
    },
    recommendation: {
      container: 'bg-[#a24df6]/10 border-[#a24df6]/30',
      icon: 'text-[#a24df6]',
      title: 'text-[#a24df6]/90',
      message: 'text-[#a24df6]/70',
    },
  };

  const style = styles[notification.type];

  const icons = {
    success: <CheckCircle2 className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    recommendation: <Lightbulb className="w-5 h-5" />,
  };

  return (
    <div
      className={cn(
        'border rounded-lg backdrop-blur-xl p-4 pointer-events-auto animate-in slide-in-from-right-5 fade-in',
        style.container,
      )}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className={cn('flex-shrink-0 mt-0.5', style.icon)}>
          {icons[notification.type]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn('font-semibold text-sm', style.title)}>
            {notification.title}
          </h3>
          {notification.message && (
            <p className={cn('text-sm mt-1', style.message)}>
              {notification.message}
            </p>
          )}

          {/* Action Button */}
          {notification.action && (
            <button
              onClick={() => {
                notification.action!.onClick();
                dismiss(notification.id);
              }}
              className={cn(
                'mt-3 inline-block text-sm font-semibold px-3 py-1 rounded',
                notification.type === 'recommendation'
                  ? 'bg-[#a24df6]/20 text-[#a24df6] hover:bg-[#a24df6]/30'
                  : 'bg-white/10 text-white/80 hover:bg-white/20',
              )}
            >
              {notification.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        {notification.dismissible && (
          <button
            onClick={() => dismiss(notification.id)}
            className={cn(
              'flex-shrink-0 text-white/40 hover:text-white/60 transition-colors',
              style.icon,
            )}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
