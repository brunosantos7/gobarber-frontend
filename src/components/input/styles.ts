import styled, { css } from "styled-components";

interface InputProps {
    hasError: boolean;
    isFilled: boolean;
    isFocused: boolean;
}

export const Container = styled.div<InputProps>`
    display: flex;
    align-items: center;

    background-color: #232129;
    border-radius: 10px;
    border: 2px solid #232129;
    padding: 16px;
    width: 100%;
    color: #f4ede8;

    ${props =>
        props.hasError &&
        css`
            border: 2px solid red;
        `}

        ${props =>
            props.isFilled &&
            css`
                color: #ff9000;
            `}

        ${props =>
            props.isFocused &&
            css`
                border: 2px solid #ff9000;
                color: #ff9000;
            `}

    & + div {
        margin-top: 8px;
    }

    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: #f4ede8;

        &::placeholder {
            color: #f4ede8;
        }
    }

    svg {
        margin-right: 16px;
    }
`;

export const Error = styled.p`
    display: flex;
    color: red;
    margin-bottom: 10px;
`;
