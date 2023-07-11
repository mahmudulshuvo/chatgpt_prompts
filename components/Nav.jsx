"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setProvidersList = async () => {
            const providersList = await getProviders()
            setProviders(providersList)
        }
        setProvidersList()
    }, [])
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    alt="Quick Prompts Logo"
                    className="object-contain"
                />
                <p className="logo_text">Quick Prompts</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden gap-2">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button
                            type="button"
                            className="outline_btn"
                            onClick={signOut}
                        >
                            Sign Out
                        </button>
                        <Link href="/">
                            <Image
                                src={session?.user?.image}
                                width={37}
                                height={37}
                                alt="profile"
                                className="rounded-full object-contain"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    className="outline_btn"
                                    onClick={() => signIn(provider.id)}
                                    key={provider.name}
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user?.image}
                            width={37}
                            height={37}
                            alt="profile"
                            className="rounded-full object-contain"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/"
                                    onClick={() =>
                                        setToggleDropdown((prev) => !prev)
                                    }
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-post"
                                    onClick={() =>
                                        setToggleDropdown((prev) => !prev)
                                    }
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    className="black_btn mt-5 w-full"
                                    onClick={signOut}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    className="outline_btn"
                                    onClick={() => signIn(provider.id)}
                                    key={provider.name}
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
