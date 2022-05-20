import { SlackLogo } from "phosphor-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { BlockchainContext } from "../contexts/BlockchainContexts"

export const Header = () => {
    const { account, connectAccount, isConnected} = useContext(BlockchainContext)

    return (
        <header className="flex py-6 bg-zinc-600 justify-center items-center">
                <div className="flex w-[94%]  justify-between items-center">
                    <SlackLogo size={32} color="#fff" />

                    <ul className="flex  gap-4 justify-center items-center">
                        <Link to=''>Home</Link>
                        <Link to=''>Contract</Link>
                        <Link to=''>Test</Link>
                    </ul>

                    {isConnected ? (
                        <button 
                            className={`flex px-4  h-10 rounded-lg bg-white text-zinc-700 items-center justify-center`}
                            onClick={connectAccount}
                        >
                            {account[0]}
                        </button>
                        ) : (
                        <button 
                            className={`flex px-4  h-10 rounded-lg bg-white text-zinc-700 items-center justify-center`}
                            onClick={connectAccount}
                        >
                            Connect MetaMask
                        </button>
                    )}
                </div>

        </header>
    )
}

