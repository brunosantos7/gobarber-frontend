import React from "react";
import { useTransition } from "react-spring";
import { Container, ToastContainer } from "./styles";
import {
    FiAlertCircle,
    FiXCircle,
    FiCheckCircle,
    FiInfo,
} from "react-icons/fi";
import { ToastMessage } from "../../hooks/ToastContext";
import { useToast } from "../../hooks/ToastContext";

interface ToastProps {
    messages: ToastMessage[];
}

const icons = {
    info: <FiInfo size={20} />,
    error: <FiAlertCircle size={20} />,
    success: <FiCheckCircle size={20} />,
};

const Toast: React.FC<ToastProps> = ({ messages }) => {
    const { removeToast } = useToast();
    const messagesWithTransitions = useTransition(
        messages,
        message => message.id,
        {
            from: { right: "-10%", opacity: 0 },
            enter: { right: "0%", opacity: 1 },
            leave: { right: "-10%", opacity: 0 },
        },
    );

    return (
        <Container>
            {messagesWithTransitions.map(({ item, key, props }) => {
                return (
                    <ToastContainer
                        key={key}
                        type={item.type}
                        hasDescription={Number(!!item.description)}
                        style={props}
                    >
                        {icons[item.type || "info"]}

                        <div>
                            <strong>{item.title}</strong>
                            {item.description && <p>{item.description}</p>}
                        </div>

                        <button type="button">
                            <FiXCircle
                                onClick={() => removeToast(item.id)}
                                size={18}
                            />
                        </button>
                    </ToastContainer>
                );
            })}
        </Container>
    );
};

export default Toast;
