import Card from "../Card"
import Formulario from "../Formulario"
import ListaParticipantes from "../ListaParticipantes"
import Rodape from "../Rodape"

const Configuracao = () => {
    return (
        <Card>
            <section>
                <Formulario />
                <ListaParticipantes />
                <Rodape />
            </section>
        </Card>
    )
}

export default Configuracao