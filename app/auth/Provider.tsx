"use client"
import { SessionProvider } from "next-auth/react"
import React, { PropsWithChildren } from "react"

const AuthProvider = ({ children }: PropsWithChildren) => (
    <div>
        <SessionProvider>{children}</SessionProvider>
    </div>
)
export default AuthProvider
