import { createContext, useContext, useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import ToastComponent from "./ToastComponent";

type ToastFunction = (message: string) => void;

export interface Toast {
  type: "info" | "success" | "error";
  text: string;
  duration: number; // seconds
}

interface ToastContext {
  info: ToastFunction;
  success: ToastFunction;
  error: ToastFunction;
}

const ToastContext = createContext<ToastContext>({
  info: (message: string) => {},
  success: (message: string) => {},
  error: (message: string) => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: any) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToast = (message: string, type: Toast["type"]) => {
    setToasts((prev) => [
      ...prev,
      {
        type: type,
        text: message,
        duration: 2,
        fadeAnimation: new Animated.Value(0),
      },
    ]);
  };

  useEffect(() => {
    const i = setInterval(() => {
      setToasts((prev) =>
        prev
          .map((toast) => ({ ...toast, duration: toast.duration - 1 }))
          // Allow 3 seconds for fade out animation before removing
          .filter(({ duration }) => duration > -3)
      );
    }, 1000);

    return () => clearInterval(i);
  }, [toasts]);

  const info = (message: string) => {
    createToast(message, "info");
  };
  const success = (message: string) => {
    createToast(message, "success");
  };
  const error = (message: string) => {
    createToast(message, "error");
  };

  const value = {
    info,
    success,
    error,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View style={style.toastContainer}>
        {toasts.map((toast, i) => {
          return <ToastComponent key={i} toast={toast} />;
        })}
      </View>
    </ToastContext.Provider>
  );
};

const style = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "flex-end",
    top: "95%",
    minWidth: "70%",
    height: "1%",
  },
});
