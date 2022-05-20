import { CircleNotch } from "phosphor-react"

export const Loading = () => {
    return (
        <div>
            <CircleNotch weight="bold" className="w-6 h-6 flex items-center justify-center overflow-hidden animate-spin"/>
        </div>
    )
}