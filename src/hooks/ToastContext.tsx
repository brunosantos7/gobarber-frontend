import React, { createContext, useCallback, useContext, useState } from "react";
import { v4 } from "uuid";
import Toast from "../components/toast";

export interface ToastMessage {
    id: string;
    type?: "success" | "error" | "info";
    title: string;
    description?: string;
}

interface ToastContextData {
    addToast(message: Omit<ToastMessage, "id">): void;
    removeToast(id?: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const removeToast = useCallback((id: string) => {
        setMessages(prevState =>
            prevState.filter(message => message.id !== id),
        );
    }, []);

    const addToast = useCallback(
        ({ type, title, description }: Omit<ToastMessage, "id">) => {
            const id = v4();

            const toast = {
                id,
                type,
                title,
                description,
            };

            setMessages([...messages, toast]);

            setTimeout(() => {
                removeToast(id);
            }, 4000);
        },
        [removeToast, messages],
    );

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <Toast messages={messages} />
        </ToastContext.Provider>
    );
};

const useToast = (): ToastContextData => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("The ToastProvider must be wrapping this component.");
    }

    return context;
};

export { ToastProvider, useToast };
