import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="mb-4 text-5xl font-bold">
                Welcome to Our Charity Platform
            </h1>
            <h2 className="text-gray-600 mb-6 text-2xl">
                Our mission is to make the world a better place by connecting donors with causes that matter.
            </h2>
            <div className="flex space-x-4 justify-center">
                <Link href="/auth/register">
                    <Button color="primary" size="lg">
                        Get Started
                    </Button>
                </Link>
                <Link href="/auth/login">
                    <Button variant="bordered" color="primary" size="lg">
                        Log In
                    </Button>
                </Link>
            </div>
        </div>
    );
}
