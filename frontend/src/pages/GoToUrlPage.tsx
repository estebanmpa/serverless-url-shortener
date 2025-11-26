import { useNavigate } from "@tanstack/react-router"

export default function GoToUrlPage() {
    const navigate = useNavigate()

    navigate({ to: '/' })

    return <></>
}