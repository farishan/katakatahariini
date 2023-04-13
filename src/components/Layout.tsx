import { PropsWithChildren } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <header className="fixed w-full left-0 top-0 bg-white bg-opacity-90 z-50">
                <div className="container py-8 flex items-center">
                    <h1 className="text-sm font-light tracking-widest text-neutral-800">Kata Kata Hari Ini</h1>
                </div>
            </header>
            <main className={`${inter.className} relative`}>
                {children}
            </main>
        </>
    )
}