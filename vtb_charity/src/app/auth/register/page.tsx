// app/auth/register/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {Button} from "@nextui-org/react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            // Отправка данных на API-роут для регистрации
            const response = await axios.post("/api/auth/register", { name, email, password });

            if (response.status === 201) {
                // Перенаправление на страницу входа после успешной регистрации
                router.push("/auth/login");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Ошибка регистрации");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4">Регистрация</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-1">Имя</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <Button type="submit" color="primary" variant="solid" fullWidth>
                    Зарегистрироваться
                </Button>
                <div className="text-center mt-4">
                    Уже есть аккаунт?{" "}
                    <Button onClick={() => router.push("/auth/login")} size="sm" color="primary" variant="solid">
                        Войти
                    </Button>
                </div>
            </form>

        </div>
    );
};

export default Register;
