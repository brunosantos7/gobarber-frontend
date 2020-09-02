import { yupResolver } from "@hookform/resolvers";
import React from "react";
import { useForm } from "react-hook-form";
import { FiLock } from "react-icons/fi";
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from "yup";
import logoImg from "../../assets/logo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import { useToast } from "../../hooks/ToastContext";
import api from "../../services/api";
import { AnimatedContainer, Background, Container, Content } from "./styles";

const schema = Yup.object().shape({
    password: Yup.string().required("A senha é um campo obrigatório."),
    password_confirmation: Yup.string().oneOf([Yup.ref("password"), undefined], "Senhas nao batem")
});


const ResetPassword: React.FC = () => {
    const { addToast } = useToast();
    const history = useHistory();
    const location = useLocation();

    const { errors, handleSubmit, register } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Container>
            <Content>
                <AnimatedContainer>
                    <img src={logoImg} alt="Logo do aplicativo"></img>

                    <form
                        onSubmit={handleSubmit(async ({ password, password_confirmation }) => {
                            try {

                                const token = location.search.replace('?token=', '');

                                if (!token) {
                                    throw new Error("Token nao esta presente.")
                                }

                                api.post("/password/reset", {
                                    password,
                                    password_confirmation,
                                    token
                                });

                                history.push("/");
                            } catch (err) {
                                addToast({
                                    title: "Erro ao resetar senha",
                                    type: "error",
                                    description:
                                        "Aconteceu algum erro no servidor ao tentar se conectar.",
                                });
                            }
                        })}
                    >
                        <h1>Crie uma nova senha</h1>

                        <Input
                            icon={FiLock}
                            name="password"
                            type="password"
                            placeholder="Nova senha"
                            register={register}
                            errors={errors}
                        />

                        <Input
                            icon={FiLock}
                            name="password_confirmation"
                            type="password"
                            placeholder="Confirme a senha"
                            register={register}
                            errors={errors}
                        />

                        <Button type="submit">Alterar senha</Button>
                    </form>
                </AnimatedContainer>
            </Content>

            <Background />
        </Container>
    );
};

export default ResetPassword;
