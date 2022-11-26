import { useNavigate } from "react-router-dom"
import { useListaParticipantes } from "../state/hook/useListaParticipantes"
import './Rodape.css'

const Rodape = () => {
    const participantes = useListaParticipantes()

    const navegarPara = useNavigate()

    const iniciar = () => {
        navegarPara('/sorteio')
    }

    return (
        <footer>
            <button disabled={participantes.length < 3} onClick={iniciar}>Iniciar Brincadeira</button>
        </footer>
    )
}

export default Rodape