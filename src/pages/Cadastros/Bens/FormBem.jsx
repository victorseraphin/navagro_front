import { useState } from "react";
import { FiX } from "react-icons/fi"; // ícone X preto

export default function FormBem({ onSalvar, onCancelar }) {
    const [descricao, setDescricao] = useState("");
    const [criterio, setCriterio] = useState("");
    const [valor, setValor] = useState("");

    const handleSalvar = () => {
        if (!descricao || !criterio || !valor) {
            alert("Preencha todos os campos.");
            return;
        }

        const novoBem = {
            id: Date.now(),
            descricao,
            criterio,
            valor: parseFloat(valor),
        };

        onSalvar(novoBem);
    };

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-auto">
            {/* Barra superior preta */}
            <div className="flex items-center justify-between px-4 py-3 border-b shadow-sm sticky top-0 bg-black z-10 text-white">
                {/* Botão X com texto vermelho */}
                <button
                    onClick={onCancelar}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-gray-900"
                    aria-label="Fechar"
                >
                    <FiX className="text-white text-xl bg-black p-0.1 hover:bg-gray-900" />
                </button>

                {/* Título centralizado */}
                <h2 className="text-base font-semibold text-white">Novo Bem</h2>

                {/* Botão Salvar com fundo preto (igual à barra) */}
                <button
                    onClick={handleSalvar}
                    className="text-sm font-medium bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-900"
                >
                    Salvar
                </button>
            </div>

            {/* Conteúdo do formulário */}
            <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-6 max-w-3xl w-full mx-auto">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Descrição</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Critério</label>
                    <input
                        type="text"
                        value={criterio}
                        onChange={(e) => setCriterio(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Valor</label>
                    <input
                        type="number"
                        step="0.01"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                </div>
            </form>
        </div>
    );
}
