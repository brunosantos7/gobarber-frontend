import { yupResolver } from "@hookform/resolvers";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";
import * as Yup from "yup";
import logoImg from "../../assets/logo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import { useAuth } from "../../hooks/AuthContext";
import { useToast } from "../../hooks/ToastContext";
import { Background, Container, Content, AnimatedContainer } from "./styles";
import { Link } from "react-router-dom";

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Entre com um email válido.")
        .required("Email é um campo obrigatório."),
    password: Yup.string().required("A senha é um campo obrigatório."),
});

interface FormAuthenticationData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const { signIn } = useAuth();
    const { addToast } = useToast();

    const { errors, handleSubmit, register } = useForm({
        resolver: yupResolver(schema),
    });

    const formSubmit = useCallback(async ({ email, password }) => {
        try {
            await signIn({ email, password });
        } catch (err) {
            addToast({
                title: "Erro na autencicacao",
                type: "error",
                description:
                    "Aconteceu algum erro no servidor ao tentar se conectar.",
            });
        }
    }, [])

    return (
        <Container>
            <Content>
                <AnimatedContainer>
                    <img src={logoImg} alt="Logo do aplicativo"></img>

                    <form
                        onSubmit={handleSubmit(formSubmit)}
                    >
                        <h1>Faça seu logon</h1>

                        <Input
                            icon={FiMail}
                            name="email"
                            placeholder="Email"
                            register={register}
                            errors={errors}
                        />

                        <Input
                            icon={FiLock}
                            name="password"
                            type="password"
                            placeholder="Senha"
                            register={register}
                            errors={errors}
                        />

                        <Button type="submit">Entrar</Button>

                        <Link to="/forgot-password">Esqueci minha senha</Link>
                    </form>

                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimatedContainer>
            </Content>

            <Background />
        </Container>
    );
};

export default SignIn;
