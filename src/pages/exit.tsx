import { useEffect } from "react"

export default function Exit() {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = "/entry";
        }, 1000)
    }, [])
    return(
        <>
        
            {/* center on screen */}

            <div className="flex justify-center items-center h-screen">

            <svg  xmlns="http://www.w3.org/2000/svg" 
width="120"  height="120"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>

        <h1 className="text-2xl font-bold">
            Saliste
        </h1>
            </div>


        </>
    )
}