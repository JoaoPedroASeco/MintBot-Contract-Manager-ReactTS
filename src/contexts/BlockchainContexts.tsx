import { createContext, ReactNode, useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers"
import ContractABI from '../ContractABI.json'
const ContractAddress = "0x40db304D343A151a6f247a9E53BFa9CFDe523a31"

export type BlockchainContextProps = {
    children: ReactNode
}

export type handleGiftType = {
    quantity: Array<string>
    address: Array<string>
}

export type handleChangeStateRevealedType = {
    _state: boolean
}

export type handleChangeStatePausedType = {
    _state: boolean
}

export type BlockchainContextType = {
    handleSetWhitelistUsers: (_users: Array<string>) => void
    setAccount: (account: string) => string
    handleCheckIsWhitelisted: (_wallet: string) => void
    handleIncrement: () => void
    handleDecrement: () => void
    connectAccount: () => void
    handleMint: () => void
    getIsPaused: () => boolean,
    handleGift: ({ quantity, address }: handleGiftType) => void
    handleChangeStateRevealed: ({ _state }: handleChangeStateRevealedType) => void
    handleChangeStatePaused: ({ _state }: handleChangeStatePausedType) => void
    handleChangeStateOnlyWhitelisted: ({ _state }: handleChangeStatePausedType) => void
    handleReloadAllContractDta: () => void
    isConnected: boolean
    mintAmount: number
    account: string[]
    isPaused: undefined
    whitelistState: undefined
    isReveled: undefined
    preSaleCost: undefined
    publicSaleCost: undefined
    maxSupply: undefined
    totalSupply: undefined
    isLoading: boolean,
}

const initialValue = { 
    handleSetWhitelistUsers: (_users: Array<string>) => {},
    handleCheckIsWhitelisted: () => {},
    handleIncrement: () => {},
    handleDecrement: () => {},
    connectAccount: () => {},
    setMintAmount: () => {},
    setAccount: () => [],
    handleMint: () => {},
    getIsPaused: () => {},
    handleGift: ({ quantity, address }: handleGiftType) => {},
    handleChangeStateRevealed: ({ _state }: handleChangeStateRevealedType) => {},
    handleChangeStatePaused: ({ _state }: handleChangeStatePausedType) => {},
    handleChangeStateOnlyWhitelisted: ({ _state }: handleChangeStatePausedType) => {},
    handleReloadAllContractDta: () => {},
    isConnected: false,
    isPaused: undefined,
    isWhitelisted: undefined,
    isReveled: undefined,
    totalSupply: undefined,
    maxSupply: undefined,
    whitelistState: undefined,
    mintAmount: 1,
    account: [],
    isLoading: false,
}

export const BlockchainContext = createContext<BlockchainContextType>(initialValue)

export const BlockchainContextProvider = ({children}: BlockchainContextProps) => {
    const [account, setAccount] = useState([])
    const [isConnected, setIsConnected] = useState(initialValue.isConnected)
    const [mintAmount, setMintAmount] = useState(initialValue.mintAmount)
    const [isPaused, setIsPaused] = useState(initialValue.isPaused)
    const [whitelistState, setWhitelistState] = useState(initialValue.isWhitelisted)
    const [isReveled, setIsReveled] = useState(initialValue.isReveled)
    const [totalSupply, setTotalSupply] = useState(initialValue.totalSupply)
    const [maxSupply, setMaxSupply] = useState(initialValue.maxSupply)
    const [preSaleCost, setPreSaleCost] = useState()
    const [publicSaleCost, setPublicSaleCost] = useState()
    const [isLoading, setIsLoading] = useState(initialValue.isLoading)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
        ContractAddress,
        ContractABI.abi,
        signer
    )

    // Get Informations of contract

    const getPreSaleCost = async () => {
        setIsLoading(true)

        try {
            const response = await contract.costPre()
            const cost = ethers.utils.formatEther(response)

            setPreSaleCost(cost)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getPublicSaleCost = async () => {
        setIsLoading(true)

        try {
            const response = await contract.cost()
            const cost = ethers.utils.formatEther(response)
            
            setPublicSaleCost(cost)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getIsPaused = async () => {
        setIsLoading(true)

        try {
            const response = await contract.paused()

            setIsPaused(response)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getIsMaxSupply = async () => {
        setIsLoading(true)

        try {
            const response = await contract.maxSupply()
            const value = ethers.BigNumber.from(response).toNumber()

            setMaxSupply(value)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getIsTotalSupply = async () => {
        setIsLoading(true)

        try {
            const response = await contract.totalSupply()
            const value = ethers.BigNumber.from(response).toNumber()

            setTotalSupply(value)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getIsIsReveled = async () => {
        setIsLoading(true)

        try {
            const response = await contract.revealed()

            setIsReveled(response)
            setIsLoading(falseq)
        } catch (error) {
            console.log(error)
        }
    }

    const getWhitelistState  = async () => {
        setIsLoading(true)

        try {
            const response = await contract.onlyWhitelisted()

            setWhitelistState(response)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    // Handle Functions

    // Mint
    const handleMint = async () => {
        setIsLoading(true)

        try {  
            if(whitelistState === true ) {
                const response = await contract.costPre()
                const preSaleCost: number = parseFloat(ethers.utils.formatEther(response))

                const mint_response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((preSaleCost * mintAmount).toString()),
                })

                setIsLoading(false)
                console.log({mint_response})
            }else {
                const response = await contract.cost()
                const publicSaleCost: number = parseFloat(ethers.utils.formatEther(response))

                const mint_response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((publicSaleCost * mintAmount).toString()),
                })
                
                setIsLoading(false)
                console.log({mint_response})
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Gift
    const handleGift = async ({ quantity, address }) => {
        setIsLoading(true)

        try {
            const mint_response = await contract.airDrop(JSON.parse(quantity), JSON.parse(address))

            setIsLoading(false)
            console.log({mint_response})
        } catch (error) {
            console.log(error)
        }
    }

    // change state revealed
    const handleChangeStateRevealed = async ({ _state }) => {
        setIsLoading(true)

        try {
            const mint_response = await contract.changeStateRevealed( _state )

            setIsLoading(false)
            console.log({mint_response})
        } catch (error) {
            console.log(error)
        }
    }

    // change state pause
    const handleChangeStatePaused = async ({ _state }) => {
        setIsLoading(true)

        try {
            const mint_response = await contract.changeStatePaused( _state )
            
            setIsLoading(false)
            console.log({mint_response})
        } catch (error) {
            console.log(error)
        }

    }

    // change state only whitelisted
    const handleChangeStateOnlyWhitelisted = async ({ _state }) => {
        setIsLoading(true)

        try {
            const mint_response = await contract.setOnlyWhitelisted( _state )

            setIsLoading(false)
            console.log({ mint_response })
        } catch (error) {
            console.log(error)
        }
    }

    // set users array of userWallets on Whitelist
    const handleSetWhitelistUsers = async (_users) => {
        setIsLoading(true)

        try {
            const mint_response = await contract.setWhitelistUsers(JSON.parse(_users))

            setIsLoading(false)
            console.log({mint_response})
        } catch (error) {
            console.log(error)
        }
    }

    // check if userWallet is on Whitelist
    const handleCheckIsWhitelisted  = async (_wallet: string) => {
        setIsLoading(true)

        try {
            const mint_response = await contract.isWhitelisted(_wallet)

            setIsLoading(false)
            console.log({mint_response})
        } catch (error) {
            console.log(error)
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return
        setMintAmount(mintAmount - 1)
    }

    const handleIncrement = () => {
        if (mintAmount >= 4) return
        setMintAmount(mintAmount + 1)
    }

    // Metamask Login

    const connectAccount = async () => {
        setIsLoading(true)

        if(window.ethereum) {
            const account = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            setAccount(account)
            setIsConnected(true)
            setIsLoading(false)
        } else {
            console.log('install metamask')
        }
    }

    // Reload Contract Data 
    const handleReloadAllContractDta = async () => {
        await getPreSaleCost()
        await getPublicSaleCost()
        await getIsPaused()
        await getIsMaxSupply()
        await getIsTotalSupply()
        await getIsIsReveled()
        await getWhitelistState()
    }

    useEffect(() => {
        const functionMustBeCalled = async () => {
            if(!preSaleCost) await getPreSaleCost()
            if(!publicSaleCost) await getPublicSaleCost()
            if(isPaused === undefined) await getIsPaused()
            if(maxSupply === undefined) await getIsMaxSupply()
            if(totalSupply === undefined) await getIsTotalSupply()
            if(isReveled === undefined) await getIsIsReveled()
            if(whitelistState === undefined) await getWhitelistState()
        }

        functionMustBeCalled()
    })

    return (
        <BlockchainContext.Provider 
            value={{
                setAccount,
                connectAccount,
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
                account,
                preSaleCost,
                publicSaleCost,
                maxSupply,
                totalSupply,
                isReveled,
                whitelistState,
                isPaused,
                isLoading,
            }}
        >
            {children}
        </BlockchainContext.Provider>
    )
}

export default BlockchainContextProvider

