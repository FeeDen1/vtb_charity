"use client"

import Link from 'next/link'
import {signIn, signOut, useSession} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";


function AuthButton() {
    const {data: session} = useSession();
    const router = useRouter()
    if (session) {
        return (
            <>
                {session?.user?.name}
                <button onClick={() => signOut()}>Sign out</button>;
            </>
        )
    }
    return <button onClick={() => router.push("/auth/login")}>Sign in</button>;
}

export default function NavMenu() {
    return (
        <div>
            <AuthButton/>
        </div>
    )
}