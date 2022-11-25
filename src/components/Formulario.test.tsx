import { render, screen } from '@testing-library/react'
import Formulario from './Formulario'

test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {
    // Renderizar o componente a ser testado
    render(<Formulario />)
    // Encontrar elemento pelo placeholder
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    // Encontrar um elemento pela função (botão)
    const botao = screen.getByRole('button')
    // garantir que o input está no documento
    expect(input).toBeInTheDocument()
    // garantir que o botão está desabilitado
    expect(botao).toBeDisabled()
}) 