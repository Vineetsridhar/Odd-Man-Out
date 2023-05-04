import { ToastOptions, toast } from "react-toastify";

export const TOAST_CONFIG: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const showErrorToast = (
  message: string,
  overrides: Partial<ToastOptions> = {}
) => {
  return toast.error(message, { ...TOAST_CONFIG, ...overrides });
};
