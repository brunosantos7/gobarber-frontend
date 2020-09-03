import { yupResolver } from "@hookform/resolvers";
import React from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import { Background, Container, Content, AnimatedContainer } from "./styles";

import api from "../../services/api";

import { useToast } from "../../hooks/ToastContext";


const schema = yup.object().shape({
    name: yup.string().required("Nome é um campo obrigatório."),
    email: yup
        .string()
        .email("Entre com um email válido.")
        .required("Email é um campo obrigatório."),
    password: yup.string().min(6, "No minimo 6 digitos"),
});

interface SignUpProps {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const history = useHistory();
    const { addToast } = useToast();

    const { errors, handleSubmit, register } = useForm({
        resolver: yupResolver(schema),
    });

    async function handleFormSubmit(data: SignUpProps) {
        await api
            .post("/users", data)
            .then(() => {
                history.push("/");
                addToast({
                    title: "Cadastrado com sucesso!",
                    description:
                        "Seu cadatro foi realizado, agora você pode fazer o seu logon.",
                    type: "success",
                });
            })
            .catch(err => {
                addToast({
                    title: "Erro ao tentar se cadastrar",
                    description: err.response.data.message
                        ? err.response.data.message
                        : "Seu cadatro nao foi realizado. Tente mais tarde.",
                    type: "error",
                });
            });
    }

    return (
        <Container>
            <Background />
            <Content>
                <AnimatedContainer>
                    <img src={logoImg} alt="Logo do aplicativo" />

                    <form
                        onSubmit={handleSubmit<SignUpProps>(handleFormSubmit)}
                    >
                        <h1>Faça seu cadastro</h1>

                        <Input
                            icon={FiUser}
                            name="name"
                            placeholder="Nome"
                            register={register}
                            errors={errors}
                        />
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

                        <Button type="submit">Cadastrar</Button>
                    </form>

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para pagina de Login
                    </Link>
                </AnimatedContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
