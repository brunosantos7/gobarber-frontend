import { yupResolver } from "@hookform/resolvers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import logoImg from "../../assets/logo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import { useToast } from "../../hooks/ToastContext";
import { AnimatedContainer, Background, Container, Content } from "./styles";
import api from "../../services/api";

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Entre com um email válido.")
        .required("Email é um campo obrigatório."),
});

interface FormAuthenticationData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const { addToast } = useToast();

    const { errors, handleSubmit, register } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Container>
            <Content>
                <AnimatedContainer>
                    <img src={logoImg} alt="Logo do aplicativo"></img>

                    <form
                        onSubmit={handleSubmit(async ({ email }) => {
                            try {
                                setLoading(true)

                                await api.post("/password/forgot", {
                                    email
                                })

                                addToast( {
                                    type:"success",
                                    title: "E-mail de recuperação enviado",
                                    description: "Enviamos um email para você recuperar sua senha. Cheque sua caixa de entrada"
                                })
                            } catch (err) {
                                addToast({
                                    title: "Erro na recuperação de senha",
                                    type: "error",
                                    description:
                                        "Aconteceu algum erro no servidor ao tentar se conectar.",
                                });
                            } finally {
                                setLoading(false)
                            }


                        })}
                    >
                        <h1>Recuperar senha</h1>

                        <Input
                            icon={FiMail}
                            name="email"
                            placeholder="Email"
                            register={register}
                            errors={errors}
                        />

                        <Button loading={loading} type="submit">Receber no email</Button>

                    </form>

                    <Link to="/">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimatedContainer>
            </Content>

            <Background />
        </Container>
    );
};

export default ForgotPassword;
