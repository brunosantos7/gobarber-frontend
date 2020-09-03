import { yupResolver } from "@hookform/resolvers";
import React, { useCallback, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import Button from "../../components/button";
import Input from "../../components/input";
import { useAuth } from "../../hooks/AuthContext";
import { useToast } from "../../hooks/ToastContext";
import api from "../../services/api";
import { AvatarInput, Container, Content } from "./styles";

const schema = yup.object().shape({
    name: yup.string().required("Nome é um campo obrigatório."),
    email: yup
        .string()
        .email("Entre com um email válido.")
        .required("Email é um campo obrigatório."),
    oldPassword: yup.string(),
    password: yup.string().when("oldPassword", {
        is: val => !!val.length,
        then: yup.string().required("Campo obrigatório"),
        otherwise: yup.string(),
    }),
    password_confirmation: yup
        .string()
        .when("oldPassword", {
            is: val => !!val.length,
            then: yup.string().required("Campo obrigatório"),
            otherwise: yup.string(),
        })
        .oneOf([yup.ref("password"), undefined], "Senhas nao batem"),
});

interface ProfileProps {
    name: string;
    email: string;
    password: string;
    oldPassword: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
    const history = useHistory();
    const { addToast } = useToast();

    const { user, updateUser } = useAuth();

    const { errors, handleSubmit, register } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
        },
        resolver: yupResolver(schema),
    });

    async function handleFormSubmit(data: ProfileProps) {
        const {
            name,
            email,
            password,
            oldPassword,
            password_confirmation,
        } = data;

        const formData = {
            email,
            name,
            ...(oldPassword
                ? {
                    oldPassword,
                    password,
                    password_confirmation,
                }
                : {}),
        };

        await api
            .put("/profile", formData)
            .then(response => {
                updateUser(response.data);

                history.push("/dashboard");
                addToast({
                    title: "Update com sucesso!",
                    description:
                        "A atualização do seu perfil foi feita com sucesso!",
                    type: "success",
                });
            })
            .catch(err => {
                addToast({
                    title: "Erro ao tentar atualizar o seu perfil",
                    description: err.response.data.message
                        ? err.response.data.message
                        : "Sua atualização de perfil nao foi realizada. Tente mais tarde.",
                    type: "error",
                });
            });
    }

    const handleAvatarChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const data = new FormData();
                data.append("avatar", e.target.files[0]);

                api.patch("/users/avatar", data).then(response => {
                    updateUser(response.data);

                    addToast({
                        type: "success",
                        title: "Avatar atualizado",
                    });
                });
            }
        },
        [updateUser, addToast],
    );

    return (
        <Container>
            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>

            <Content>
                <form onSubmit={handleSubmit<ProfileProps>(handleFormSubmit)}>
                    <AvatarInput>
                        <img src={user.avatar_url} alt="Avatar do usuario" />
                        <label htmlFor="avatar">
                            <FiCamera />

                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </AvatarInput>

                    <h1>Meu perfil</h1>

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
                        containerStyle={{ marginTop: 24 }}
                        icon={FiLock}
                        name="oldPassword"
                        type="password"
                        placeholder="Senha atual"
                        register={register}
                        errors={errors}
                    />
                    <Input
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="Nova Senha"
                        register={register}
                        errors={errors}
                    />
                    <Input
                        icon={FiLock}
                        name="password_confirmation"
                        type="password"
                        placeholder="Confirmar senha"
                        register={register}
                        errors={errors}
                    />

                    <Button type="submit">Confirmar mudanças</Button>
                </form>
            </Content>
        </Container>
    );
};

export default Profile;
