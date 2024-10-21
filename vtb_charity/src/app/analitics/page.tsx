// app/dashboard/page.tsx

"use client";


import {  Spacer } from "@nextui-org/react";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

const Analytycs = async () => {
    const session = await getServerSession()


    {
        if (session) {
            return (

                <div className="p-6">
                    <h1 >Добро пожаловать, {session?.user?.name || session?.user?.email}!</h1>
                    <Spacer y={1} />
                    {/* Здесь будет содержимое защищённой страницы */}
                    <h1>Ваши данные и информация о пожертвованиях будут здесь.</h1>
                </div>
            );
        } else {
            redirect("auth/login")
        }
    }

};

export default Analytycs;
