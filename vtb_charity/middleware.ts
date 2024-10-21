// middleware.ts

import { withAuth } from "next-auth/middleware";

export default withAuth(
    (req) => {
        console.log("Middleware защищает маршрут:", req.nextUrl.pathname);
    },
    {
        pages: {
            signIn: "/auth/login",
        },
    }
);

export const config = {
    matcher: [
        "/dashboard/",
        "/analytics/",
        // Добавьте другие защищённые маршруты здесь
    ],
};
