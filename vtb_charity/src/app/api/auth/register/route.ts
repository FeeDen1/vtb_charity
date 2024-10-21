// app/api/auth/register/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { name, email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ message: "Email и пароль обязательны" }, { status: 400 });
    }

    // Проверка существующего пользователя
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ message: "Пользователь с таким email уже существует" }, { status: 400 });
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "Пользователь успешно зарегистрирован" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Ошибка при создании пользователя" }, { status: 500 });
    }
}
