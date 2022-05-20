import { FormEvent, useContext } from "react"
import { BlockchainContext } from "../contexts/BlockchainContexts"
import { ContractData } from "./ContractData/ContractData"

export const MainMint = () => {
    const { 
        handleDecrement, 
        handleIncrement, 
        handleMint, 
        handleSetWhitelistUsers,
        handleCheckIsWhitelisted,
        handleGift,
        handleChangeStateRevealed,
        handleChangeStatePaused,
        handleChangeStateOnlyWhitelisted,
        handleReloadAllContractDta,
        isConnected, 
        mintAmount, 
        isPaused,
        whitelistState,
        isReveled,
    } = useContext(BlockchainContext)

    return (
        <div>
            <ContractData />

            {isConnected ? (
                <div>
                    <div>
                        <h2>Handle Mint: {whitelistState ? 'PreSale is ON' : 'PublicSale is ON'}</h2>
                        <div>
                            <button onClick={handleDecrement}>-</button>
                            <input type="number" value={mintAmount} />
                            <button onClick={handleIncrement}>+</button>
                        </div>
                        <button onClick={handleMint} className='mb-2'>Mint Now</button>
                    </div>


                    <form onSubmit={(e: FormEvent) => {
                        e.preventDefault()
                        handleSetWhitelistUsers(e.target._users.value)
                    }}>
                        <h2>Set Users On Whitelist</h2>
                        <input type="text" name="_users"/>
                        <button type="submit">Set users in Whitelist</button>
                    </form>

                    <form onSubmit={(e: FormEvent) => {
                        e.preventDefault()
                        handleCheckIsWhitelisted(e.target._wallet.value)
                    }}>
                        <h2>Check if you are Whitelisted</h2>
                        <input type="text" name="_wallet"/>
                        <button type="submit">check if you are whitelisted</button>
                    </form>

                    <form onSubmit={(e: FormEvent) => {
                        e.preventDefault()
                        handleGift({
                            quantity: e.target._quantity.value,
                            address: e.target._address.value,
                         })
                    }}>
                        <h2>Gift</h2>
                        <input type="text" name="_quantity"/>
                        <input type="text" name="_address"/>
                        <button type="submit">Gift</button>
                    </form>

                    <div>
                        <h3>Change State Revealed</h3>
                        {isReveled ? (
                            <div>
                                <button 
                                    type="button" 
                                    onClick={() => handleChangeStateRevealed({_state: false})}
                                >
                                    Set False
                                </button>
                                <button 
                                    type="button" 
                                    unselectable="on"
                                    disabled={true}
                                >
                                    Set True
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button 
                                    type="button" 
                                    unselectable="on"
                                    disabled={true}
                                >
                                    Set False
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleChangeStateRevealed({_state: true})}
                                >
                                    Set True
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <h3>Change State Paused</h3>
                        {isPaused ? (
                            <div>
                                <button 
                                    type="button" 
                                    onClick={() => handleChangeStatePaused({_state: false})}
                                >
                                    Set False
                                </button>
                                <button 
                                    type="button" 
                                    unselectable="on"
                                    disabled={true}
                                >
                                    Set True
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button 
                                    type="button" 
                                    unselectable="on"
                                    disabled={true}
                                >
                                    Set False
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleChangeStatePaused({_state: true})}
                                >
                                    Set True
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <h3>Change State OnlyWhitelist</h3>
                        {whitelistState ? (
                            <div>
                                <button 
                                    type="button" 
                                    onClick={() => handleChangeStateOnlyWhitelisted({_state: false})}
                                >
                                    Set False
                                </button>
                                <button 
                                    type="button" 
                                    unselectable="on"
                                    disabled={true}
                                >
                                    Set True
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button 
                                    type="button" 
                                    unselectable="on"
                                    disabled={true}
                                >
                                    Set False
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleChangeStateOnlyWhitelisted({_state: true})}
                                >
                                    Set True
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            ): (
                <>You must be connected to mint.</>
            )}
        </div>
    )
}