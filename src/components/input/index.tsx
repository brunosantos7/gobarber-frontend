import React, { InputHTMLAttributes, useCallback, useState } from "react";
import { IconBaseProps } from "react-icons";

import { Container, Error } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
    containerStyle?: object;
    register?: any;
    errors?: any;
}

const Input: React.FC<InputProps> = ({
    register,
    errors,
    name,
    containerStyle,
    icon: Icon,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(e => {
        setIsFocused(false);

        setIsFilled(!!e.target.value);
    }, []);

    return (
        <>
            <Container
                style={containerStyle}
                hasError={errors && errors[name]}
                isFilled={isFilled}
                isFocused={isFocused}
                data-testid="input-container-id"
            >
                {Icon && <Icon />}
                <input
                    autoComplete="chrome-off"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    name={name}
                    {...rest}
                    ref={register}
                ></input>
            </Container>
            {errors && errors[name] && <Error>{errors[name].message}</Error>}
        </>
    );
};

export default Input;
