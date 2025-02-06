import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';

import {
  useHandleReduxQueryError,
  useHandleReduxQuerySuccess,
} from '../hooks/useHandleReduxQuery';
import {
  useNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from '../api';

const Notifications = () => {
  const [selectedID, setSelectedID] = useState(-1);
  const {
    data: notifications = [],
    error: notificationsError,
    isError: isNotificationsError,
    isLoading: isNotificationsLoading,
  } = useNotificationsQuery();

  const [
    markAsRead,
    {
      error: notificationReadError,
      isError: isNotificationReadError,
      isSuccess: isNotificationReadSuccess,
      isLoading: isNotificationReadLoading,
    },
  ] = useMarkNotificationAsReadMutation();

  const notificationUnread = useMemo(
    () => notifications.some(({ is_read }) => !is_read),
    [notifications]
  );

  useEffect(() => {
    if (selectedID === -1) return;

    markAsRead({ id: selectedID });
    const newNotifications = [...notifications];
    const notificationIndex = newNotifications.findIndex(
      (notification) => notification.id === selectedID
    );

    if (notificationIndex !== -1) {
      newNotifications[notificationIndex].is_read = true;
    }
  }, [selectedID]);

  useHandleReduxQueryError({
    error: notificationsError,
    isError: isNotificationsError,
  });
  useHandleReduxQueryError({
    error: notificationReadError,
    isError: isNotificationReadError,
    onError: () => setSelectedID(-1),
  });
  useHandleReduxQuerySuccess({
    isSuccess: isNotificationReadSuccess,
    onSuccess: () => setSelectedID(-1),
  });

  return (
    <div className="px-20">
      <h2
        className={`text-5xl font-semibold fixed top-8 after:absolute after:w-3 after:h-3 after:bg-red-600 after:rounded-[50%] ${
          notificationUnread || 'after:hidden'
        }`}
      >
        Notifications
      </h2>
      <p hidden={notifications.length > 0} className="text-center">
        You're all caught up. No notifications
      </p>
      <div className="flex flex-col gap-8 mt-20">
        {notifications.map(({ id, message, is_read, created_at }) => (
          <div
            key={id}
            className="p-4 rounded bg-white text-[#0E402D] grid grid-cols-[4fr_2fr_1fr]"
          >
            <p className="font-medium">{message}</p>
            <p>{moment(created_at).format('lll')}</p>
            <input
              type="checkbox"
              defaultChecked={is_read}
              className="accent-[#0E402D]"
              onChange={() => setSelectedID(id)}
              disabled={
                is_read || (isNotificationReadLoading && selectedID === id)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
