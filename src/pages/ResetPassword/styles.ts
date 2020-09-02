import styled, { keyframes } from "styled-components";
import { shade } from "polished";
import SignInBackgroundImg from "../../assets/sign-in-background.png";

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 800px;
`;

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-10px)
    }
    to{
        opacity: 1;
        transform: translateX(0)
    }
`;

export const AnimatedContainer = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    animation: ${appearFromLeft} 1.5s;

    form {
        display: flex;
        flex-direction: column;
        text-align: center;

        width: 340px;

        h1 {
            margin-bottom: 24px;
        }

        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;

            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, "#f4ede8")};
            }
        }
    }

    > a {
        display: flex;
        align-items: center;

        color: #ff9000;
        margin-top: 24px;
        text-decoration: none;

        transition: color 0.2s;

        &:hover {
            color: ${shade(0.2, "#ff9000")};
        }

        svg {
            margin-right: 10px;
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${SignInBackgroundImg}) no-repeat center;
    background-size: cover;
`;