import '@styles/globals.css'

export const metadata = {
    title: 'Quick Promt',
    description: 'Discover and share prompts',
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout
