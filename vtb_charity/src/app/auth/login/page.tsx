// app/auth/login/page.tsx

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {Button} from "@nextui-org/react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError(res.error);
        } else {
            // Перенаправление на защищённую страницу после успешного входа
            router.push("/dashboard");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4">Вход</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
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
                <Button type="submit" variant="solid" fullWidth color="primary">
                    Войти
                </Button>
                <div className="text-center mt-4">
                    Еще нет аккаунта?{" "}
                    <Button onClick={() => router.push("/auth/register")} size="sm" color="primary" variant="solid">
                        Зарегестрироваться
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
