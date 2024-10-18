
import { toast } from 'react-toastify';

const useToast = () => {
  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  return {
    notifySuccess,
    notifyError,
  };
};

export default useToast;
