import { useContext, useEffect } from "react"
import { BlockchainContext } from "../../contexts/BlockchainContexts"
import { Loading } from "../Loading"
import "./styles.css"
import { contractData } from "./ContractDataMock" 

export const ContractData = () => {
    const { handleReloadAllContractDta, isLoading } = useContext(BlockchainContext)
    const blockchainContext = useContext(BlockchainContext)
    blockchainContext['isPaused']
    return (
        <div className="flex bg-zinc-500 flex-col p-6 max-w-[20%] mx-6 mt-3 rounded-lg items-center">
            <h1 className="text-3xl mb-5">Contract Informations</h1>
            
            {
                isLoading
                ? 
                    <ul className="contract_info">
                        {contractData.map(item => {
                            return (
                                <li key={item?.id}>
                                    <p>{item?.name}</p>
                                    <Loading />
                                </li>
                            )
                        })}
                    </ul>
                :
                    <ul className="contract_info">
                        {contractData.map((item) => {
                            
                            if(item.id <= 2) {
                                return (
                                    <li key={item?.id}>
                                        <p>{item?.name}</p>
                                        <p>{blockchainContext[`${item?.value}`]?.toString()}</p>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={item?.id}>
                                        <p>{item?.name}</p>
                                        <p>{blockchainContext[`${item?.value}`]}</p>
                                    </li>
                                )
                            }
                        })}
                    </ul>
            }
                    
            <button onClick={handleReloadAllContractDta}>Reload Contract Data</button>
        </div>
    )
}