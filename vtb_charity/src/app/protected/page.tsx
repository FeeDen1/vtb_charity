import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";

export default async function ProtectedRoute() {
    const session = await getServerSession();
    if (!session) {
        redirect("/auth/login")
    }

    return (
        <div>
            <h1>Здесь будет содержимое защищённой страницы</h1>
        </div>
    )
}