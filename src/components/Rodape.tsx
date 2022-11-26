import { useNavigate } from "react-router-dom"
import { useListaParticipantes } from "../state/hook/useListaParticipantes"
import { useSorteador } from "../state/hook/useSorteador"
import './Rodape.css'

const Rodape = () => {
    const participantes = useListaParticipantes()

    const navegarPara = useNavigate()

    const sortear = useSorteador()

    const iniciar = () => {
        sortear()
        navegarPara('/sorteio')
    }

    return (
        <footer>
            <button disabled={participantes.length < 3} onClick={iniciar}>Iniciar Brincadeira</button>
        </footer>
    )
}

export default Rodape