import { useEffect } from 'react';

const useHandleReduxQueryError = ({ error, isError, onError }) => {
  useEffect(() => {
    if (isError && error && 'status' in error) {
      if (error.status === 'FETCH_ERROR') {
        alert('Server unreachable. Please try again later');
      } else if (error.status === 'TIMEOUT_ERROR') {
        alert('Check your internet connection and try again');
      } else if (error.status === 'PARSING_ERROR') {
        if ([401, 403].includes(error.originalStatus)) {
          alert('Your session has expired');
          location.href = '/login';
          return;
        }
        alert('An error has occurred. Please try again');
      } else if ([401, 403].includes(error.status)) {
        alert('Your session has expired');
        location.href = '/login';
      } else if (error.data) {
        // we expect erroneous data response to be either a string or an object
        if (typeof error.data === 'object' && !Array.isArray(error.data)) {
          const { message } = error.data;
          alert(message);
        } else if (typeof error.data === 'string') {
          alert(error.data);
        }
      } else {
        alert('An error has occurred. Please try again');
      }
      console.error(error);
      onError?.();
    }
  }, [isError, error]);
};

const useHandleReduxQuerySuccess = ({ isSuccess, onSuccess }) => {
  useEffect(() => {
    if (isSuccess) onSuccess?.();
  }, [isSuccess]);
};

export { useHandleReduxQueryError, useHandleReduxQuerySuccess };
