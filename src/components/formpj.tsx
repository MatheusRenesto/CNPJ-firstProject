"use client";

import { exampleSchema } from "@/validators/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

export default function MyForm() {
  const form = useForm({ resolver: zodResolver(exampleSchema) });
  const {
    setValue,
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = form;

  async function onValid(data: any) {
    const cnpj = data.cnpj;

    if (!cnpj) {
      console.error("CNPJ is missing");
      return;
    }
    try {
      const response = await axios.get(
        `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
      );
      console.log("API response:", response.data);
      console.log("Your own data:", data);
    } catch (error) {
      console.log("Failed to Get CNPJ Data:", error);
    }
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex flex-col items-center justify-center gap-2 min-h-svh"
    >
      <div className="border p-4 border-gray-600 bg-blend-soft-light ">
        <h1 className="flex opacity-95 gap-2 text-black mb-3">
          Informações Empresariais <Info className="text-purple-600" />
        </h1>
        <div className="border border-purple-600 w-50 mt-[-10px] mb-3"></div>
        <div className="flex gap-2.5 mb-8">
          <fieldset className="flex flex-col ">
            <label className="text-black opacity-80 text-[15px]" htmlFor="">
              CNPJ:
            </label>
            <input
              id="cnpj"
              placeholder="00.000.000/0000-00"
              type="text"
              className="text-black  h-[34.4px] hover:bg-gray-300 transition-all  focus:bg-gray-300  outline-0 border opacity-40 p-1 focus:text-black"
              {...register("cnpj")}
            />
            {errors?.cnpj && (
              <span className="text-xs text-red-500">
                {errors.cnpj?.message}
              </span>
            )}
          </fieldset>

          <motion.button
            type="button"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 8px rgba(128, 90, 213, 0.7)",
            }}
            whileTap={{ scale: 0.85, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={async () => {
              const cnpjOnly = getValues("cnpj");

              if (!cnpjOnly) {
                console.error("CNPJ is missing or invalid");
                return;
              }

              try {
                const response = await axios.get(
                  `https://brasilapi.com.br/api/cnpj/v1/${cnpjOnly}`
                );
                console.log("API response:", response.data);

                setValue("razao_social", response.data.razao_social || "");
                setValue("nome_fantasia", response.data.nome_fantasia || "");
                setValue("cep", response.data.cep || "");
                setValue("uf", response.data.uf || "");
                setValue("municipio", response.data.municipio || "");
                setValue("bairro", response.data.bairro || "");
                setValue("logradouro", response.data.logradouro || "");
                setValue("numero", response.data.numero || "");
                setValue("complemento", response.data.complemento || "");

                // reset();
              } catch (error) {
                console.error("Failed to Get CNPJ Data:", error);
              }
            }}
            className="cursor-pointer border-purple-600 text-purple-900  focus:bg-purple-300 transition-all hover:border-purple-400 focus:border-purple-400 hover:bg-purple-300 w-54 hover:text-black focus:text-black outline-0 border p-1 mt-[23px]  h-[34.4px]"
          >
            Buscar Informações
          </motion.button>

          <fieldset className="flex flex-col ">
            <label className="text-black opacity-80 text-[15px]" htmlFor="">
              Razão Social:
            </label>
            <input
              type="text"
              className="text-black hover:bg-gray-300 transition-all  focus:bg-gray-300  outline-0 border opacity-40 p-1 focus:text-black h-[34.4px]"
              {...register("razao_social")}
            />
            {errors?.razao_social && (
              <span className="text-xs text-red-500">
                {errors.razao_social?.message}
              </span>
            )}
          </fieldset>

          <fieldset className="flex flex-col ">
            <label className="text-black opacity-80 text-[15px]" htmlFor="">
              Nome Fantasia:
            </label>
            <input
              type="text"
              className="text-black hover:bg-gray-300 transition-all  focus:bg-gray-300  outline-0 border opacity-40 p-1 focus:text-black h-[34.4px]"
              {...register("nome_fantasia")}
            />
            {errors?.nome_fantasia && (
              <span className="text-xs text-red-500">
                {errors.nome_fantasia?.message}
              </span>
            )}
          </fieldset>
        </div>
        <h1 className="flex opacity-95 gap-2 text-black mb-3">
          Informações Geográficas <Info className="text-purple-600" />
        </h1>
        <div className="border border-purple-600 w-50 mb-3 mt-[-10px]"></div>
        <div>
          <div className="flex gap-2">
            <fieldset className="flex flex-col ">
              <label className="text-black opacity-80 text-[15px]" htmlFor="">
                CEP:
              </label>
              <input
                type="text"
                className="text-black hover:bg-gray-300 transition-all  focus:bg-gray-300  outline-0 border opacity-40 p-1 focus:text-black h-[34.4px]"
                {...register("cep")}
              />
              {errors?.cep && (
                <span className="text-xs text-red-500">
                  {errors.cep?.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col ">
              <label className="text-black opacity-80 text-[15px]" htmlFor="">
                Estado:
              </label>
              <input
                type="text"
                className="text-black h-[34.4px] hover:bg-gray-300 transition-all  focus:bg-gray-300 outline-0 border opacity-40 p-1"
                {...register("uf")}
              />
              {errors?.uf && (
                <span className="text-xs text-red-500">
                  {errors.uf?.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col ">
              <label className="text-black opacity-80 text-[15px]" htmlFor="">
                Cidade:
              </label>
              <input
                type="text"
                className="text-black hover:bg-gray-300 transition-all  focus:bg-gray-300  outline-0 border opacity-40 p-1 focus:text-black h-[34.4px]"
                {...register("municipio")}
              />
              {errors?.municipio && (
                <span className="text-xs text-red-500">
                  {errors.municipio?.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col ">
              <label className="text-black opacity-80 text-[15px]" htmlFor="">
                Bairro
              </label>
              <input
                type="text"
                className="text-black hover:bg-gray-300 transition-all  focus:bg-gray-300  outline-0 border opacity-40 p-1 focus:text-black h-[34.4px]"
                {...register("bairro")}
              />
              {errors?.bairro && (
                <span className="text-xs text-red-500">
                  {errors.bairro?.message}
                </span>
              )}
            </fieldset>
          </div>
          <div className="flex gap-2">
            <fieldset className="flex flex-col ">
              <label className="text-black opacity-80 text-[15px]" htmlFor="">
                Endereço
              </label>
              <input
                type="text"
                className="text-black hover:bg-gray-300 transition-all  focus:bg-gray-300  outline-0 border opacity-40 p-1 focus:text-black h-[34.4px]"
                {...register("logradouro")}
              />
              {errors?.logradouro && (
                <span className="text-xs text-red-500">
                  {errors.logradouro?.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col ">
              <label className="text-black opacity-80 text-[15px]" htmlFor="">
                Número:
              </label>
              <input
                type="text"
                className="text-black hover:bg-gray-300 transition-all  focus:bg-gray-300  outline-0 border opacity-40 p-1 focus:text-black h-[34.4px]"
                {...register("numero")}
              />
              {errors?.numero && (
                <span className="text-xs text-red-500">
                  {errors.numero?.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col ">
              <label className="text-black opacity-80 text-[15px]" htmlFor="">
                Complemento:
              </label>
              <input
                type="text"
                className="text-black hover:bg-gray-300 transition-all  focus:bg-gray-300  outline-0 border opacity-40 p-1 focus:text-black h-[34.4px]"
                {...register("complemento")}
              />
              {errors?.complemento && (
                <span className="text-xs text-red-500">
                  {errors.complemento?.message}
                </span>
              )}
            </fieldset>

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 8px rgba(128, 90, 213, 0.7)",
              }}
              whileTap={{ scale: 0.85, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="cursor-pointer border-purple-600 text-purple-900  focus:bg-purple-300 transition-all hover:border-purple-400 focus:border-purple-400 hover:bg-purple-300 w-54 hover:text-black focus:text-black outline-0 border p-1 mt-[23px] h-[34.2px]"
            >
              Enviar
            </motion.button>
          </div>{" "}
        </div>
      </div>
    </form>
  );
}
