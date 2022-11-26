import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";
import Rodape from "./Rodape";

jest.mock('../state/hook/useListaParticipantes', () => {
    return {
        useListaParticipantes: jest.fn()
    }
})

const mockNavegacao = jest.fn()

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavegacao
    }
})

describe('Quando não existe participantes suficientes', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([])
    })

    test('A brincadeira não pode ser iniciada', () => {
        render(<RecoilRoot><Rodape /></RecoilRoot>)
        const botao = screen.getByRole('button')
        expect(botao).toBeDisabled()
    })
})

describe('Quando existe participantes suficientes', () => {
    const participantes = ['Ana', 'Catarina','Rafael', 'Denise']
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
    })

    test('A brincadeira pode ser iniciada', () => {
        render(<RecoilRoot><Rodape /></RecoilRoot>)
        const botao = screen.getByRole('button')
        expect(botao).not.toBeDisabled()
    })

    test('A brincadeira foi iniciada', () => {
        render(<RecoilRoot><Rodape /></RecoilRoot>)
        const botao = screen.getByRole('button')
        fireEvent.click(botao)
        expect(mockNavegacao).toHaveBeenCalledTimes(1)
        expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
    })
})