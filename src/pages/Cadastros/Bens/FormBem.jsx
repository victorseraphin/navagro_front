import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";

export default function FormBem({ onSalvar, onCancelar, registro }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      descricao: "",
      criterio: "",
      dataInicial: "",
      centro_custo: "",
      valor_novo: "",
      valor_sucata: ""
    },
  });

  // Preenche o formulário em modo edição
  useEffect(() => {
    if (registro) {
      setValue("descricao", registro.descricao || "");
      setValue("criterio", registro.criterio || "");
      setValue("dataInicial", registro.dataInicial || "");
      setValue("centro_custo", registro.centro_custo || "");
      setValue("valor_novo", registro.valor_novo || "");
      setValue("valor_sucata", registro.valor_sucata || "");
    } else {
      reset(); // limpa se for inclusão
    }
  }, [registro, setValue, reset]);

  const onSubmit = (data) => {
    const novoRegistro = {
      id: registro?.id || Date.now(),
      descricao: data.descricao,
      criterio: data.criterio,
      dataInicial: data.dataInicial,
      centro_custo: data.centro_custo,
      valor_novo: parseFloat(data.valor_novo),
      valor_sucata: parseFloat(data.valor_sucata),
    };

    onSalvar(novoRegistro);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-auto">
      {/* Barra superior */}
      <div className="flex items-center justify-between h-14 border-b shadow-sm sticky top-0 bg-emerald-600 z-10 text-white">
        <button
          onClick={onCancelar}
          className="h-full aspect-square flex items-center justify-center hover:bg-emerald-700"
          aria-label="Fechar"
        >
          <FiX className="text-red-500 text-2xl" />
        </button>

        <h2 className="text-base font-semibold text-white">
          {registro ? "Editar Bens" : "Cadastrar Bens"}
        </h2>

        <button
          onClick={handleSubmit(onSubmit)}
          className="h-full px-6 flex items-center justify-center text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Salvar
        </button>
      </div>

      {/* Conteúdo do formulário */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <form className="w-full flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          {/* Linha: Descrição e Critério */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="w-full lg:w-2/3">
              <label className="block text-sm font-medium text-gray-600 mb-1">Descrição</label>
              <input
                type="text"
                {...register("descricao", { required: "Descrição obrigatória" })}
                className="w-full border border-gray-300 px-3 py-1 rounded text-sm"
                placeholder="Digite a descrição"
              />
              {errors.descricao && (
                <p className="text-sm text-red-500 mt-1">{errors.descricao.message}</p>
              )}
            </div>

            <div className="w-full lg:w-1/3">
              <label className="block text-sm font-medium text-gray-600 mb-1">Critério</label>
              <select
                {...register("criterio", { required: "Critério obrigatório" })}
                className="w-full border border-gray-300 px-3 py-1 rounded text-sm bg-white"
              >
                <option value="">Selecione...</option>
                <option value="UN">UN - (FIXO)</option>
                <option value="KM">KM</option>
                <option value="HR">HR</option>
              </select>
              {errors.criterio && (
                <p className="text-sm text-red-500 mt-1">{errors.criterio.message}</p>
              )}
            </div>

            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-600 mb-1">Data Inicial</label>
              <input
                type="date"
                {...register("dataInicial", { required: "Data Inicial obrigatória" })}
                className="w-full border border-gray-300 px-3 py-1 rounded text-sm"
              />
              {errors.dataInicial && (
                <p className="text-sm text-red-500 mt-1">{errors.dataInicial.message}</p>
              )}
            </div>
          </div>

          {/* Linha: Valor */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full lg:w-1/3">
              <label className="block text-sm font-medium text-gray-600 mb-1">Centro de Custo</label>
              <select
                {...register("centro_custo", { required: "Centro de custo obrigatório" })}
                className="w-full border border-gray-300 px-3 py-1 rounded text-sm bg-white"
              >
                <option value="">Selecione...</option>
                <option value="UN">UN - (FIXO)</option>
                <option value="KM">KM</option>
                <option value="HR">HR</option>
              </select>
              {errors.centro_custo && (
                <p className="text-sm text-red-500 mt-1">{errors.centro_custo.message}</p>
              )}
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-600 mb-1">Valor novo</label>
              <input
                type="number"
                step="0.01"
                {...register("valor_novo", {
                  required: "Valor novo obrigatório",
                  min: { value: 0.01, message: "Valor deve ser maior que zero" },
                })}
                className="w-full border border-gray-300 px-3 py-1 rounded text-sm"
                placeholder="Ex: 199.90"
              />
              {errors.valor_novo && (
                <p className="text-sm text-red-500 mt-1">{errors.valor_novo.message}</p>
              )}
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-600 mb-1">Valor Sucata</label>
              <input
                type="number"
                step="0.01"
                {...register("valor_sucata", {
                  required: "Valor sucata obrigatório",
                  min: { value: 0.01, message: "Valor deve ser maior que zero" },
                })}
                className="w-full border border-gray-300 px-3 py-1 rounded text-sm"
                placeholder="Ex: 199.90"
              />
              {errors.valor_sucata && (
                <p className="text-sm text-red-500 mt-1">{errors.valor_sucata.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
