import { act, fireEvent, render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Formulario from './Formulario'

describe('Comportamento Formulário.tsx', () => {
    test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {
        // Renderizar o componente a ser testado
        render(<RecoilRoot><Formulario /></RecoilRoot>)
        // Encontrar elemento pelo placeholder
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // Encontrar um elemento pela função (botão)
        const botao = screen.getByRole('button')
        // garantir que o input está no documento
        expect(input).toBeInTheDocument()
        // garantir que o botão está desabilitado
        expect(botao).toBeDisabled()
    })

    test('Adicionar um participante caso exista um nome preenchido', () => {
        render(<RecoilRoot><Formulario /></RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')

        // Inserir num valor no imput
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })

        //Clicar no botão
        fireEvent.click(botao)

        // Garantir que o input esteja com o foco ativo
        expect(input).toHaveFocus()

        //Garantir que o input não tenha valor
        expect(input).toHaveValue("")
    })

    test('Nomes duplicados não podem ser adicionados na lista', () => {
        render(<RecoilRoot><Formulario /></RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })

        fireEvent.click(botao)

        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })

        fireEvent.click(botao)
        const mensagemDeErro = screen.getByRole('alert')

        expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
    })

    test('A Mensagem de erro deve subir após os timers', () => {
        jest.useFakeTimers()
        render(<RecoilRoot><Formulario /></RecoilRoot>)
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })

        fireEvent.click(botao)

        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })

        fireEvent.click(botao)
        let mensagemDeErro = screen.queryByRole('alert')
        expect(mensagemDeErro).toBeInTheDocument()

        //esperar N segundos
        act(() => {
            jest.runAllTimers()
        });

        mensagemDeErro = screen.queryByRole('alert')
        expect(mensagemDeErro).toBeNull()
    })
})

