// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                // Поиск пользователя в базе данных
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && credentials.password) {
                    // Сравнение паролей
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (isValid) {
                        // Возврат объекта пользователя без пароля
                        const { password, ...userWithoutPassword } = user;
                        return userWithoutPassword;
                    }
                }

                // Если аутентификация не удалась
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
        newUser: "/auth/register",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
