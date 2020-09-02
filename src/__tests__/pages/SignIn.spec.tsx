import React from 'react';
import SignIn from '../../pages/SignIn'
import { render, fireEvent, wait } from '@testing-library/react'


jest.mock("react-router-dom", () => {
    return {
        Link: ({ children }: { children: React.ReactNode }) => children
    }
})


const mockedSignIn = jest.fn();
jest.mock("../../hooks/AuthContext", () => {
    return {
        useAuth: () => ({
            signIn: mockedSignIn
        })
    }
})

const mockedAddToast = jest.fn();
jest.mock("../../hooks/ToastContext", () => {
    return {
        useToast: () => ({
            addToast: mockedAddToast
        })
    }
})

describe("SignInPage", () => {
    beforeEach(() => {
        mockedSignIn.mockClear();
        mockedAddToast.mockClear();
    })


    it("should be able to sign-in", async () => {
        const { getAllByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getAllByPlaceholderText("Email");
        const passwordField = getAllByPlaceholderText("Senha");

        fireEvent.change(emailField[0], { target: { value: "johndoe@example.com" } });
        fireEvent.change(passwordField[0], { target: { value: "123456" } });

        const buttonElement = getByText("Entrar");

        fireEvent.click(buttonElement)

        await wait(() => {
            expect(mockedSignIn).toHaveBeenCalled();
        })
    })

    it("should NOT be able to sign-in with bad credentials", async () => {
        const { getAllByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getAllByPlaceholderText("Email");
        const passwordField = getAllByPlaceholderText("Senha");

        fireEvent.change(emailField[0], { target: { value: "not-valid-email" } });
        fireEvent.change(passwordField[0], { target: { value: "123456" } });

        const buttonElement = getByText("Entrar");

        fireEvent.click(buttonElement)

        await wait(() => {
            expect(mockedSignIn).not.toHaveBeenCalled();
        })
    })

    it("should display an error if login fail", async () => {
        mockedSignIn.mockImplementation(() => {
            throw new Error();

        })



        const { getAllByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getAllByPlaceholderText("Email");
        const passwordField = getAllByPlaceholderText("Senha");

        fireEvent.change(emailField[0], { target: { value: "test@email.com" } });
        fireEvent.change(passwordField[0], { target: { value: "123456" } });

        const buttonElement = getByText("Entrar");

        fireEvent.click(buttonElement)

        await wait(() => {
            expect(mockedAddToast).toHaveBeenCalled();
        })
    })
})
