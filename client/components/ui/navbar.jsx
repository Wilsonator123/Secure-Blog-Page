'use client'

import { useUserStore } from "@/context/UserContext";
import { updateUser } from "@/hooks/user";
import React, { useState, useEffect } from "react";

export default function NavBar() {
    const [showHeader, setShowHeader] = useState(false)

    useEffect(() => {
        async function fetchUser() {
            await updateUser().then(
                setShowHeader(true)
            )
        }
        fetchUser()
    }, [])

    const user = useUserStore((state) => state.user)

    return (
        <section className="flex h-16 w-full bg-primary border-b border-secondary justify-between items-center">
            <h1 className="text-text ml-8 content-center">CryptoBros Logo</h1>
            {showHeader &&
                <div className="relative rounded">
                    <div className="flex text-white p-2 text-lg items-center">
                        {user ? <h1 className="self-center font-semibold text-xl"> Hello {user.fname} </h1> : <h1 className="font-semibold self-center text-xl">Hello Guest</h1>}
                    </div>
                </div>
            }
        </section>
    )
}