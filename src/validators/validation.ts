import z from "zod";

export const exampleSchema = z.object({
  cnpj: z.coerce.number().min(9999999999999, "pelo menos 14 caracters(número)"),
  razao_social: z.string().min(1, "não deixe esse campo vazio"),
  nome_fantasia: z.string().min(1, "não deixe esse campo vazio"),
  cep: z.coerce.number().min(8, "pelo menos 8 caracters(número)"),
  uf: z.string().min(1, "não deixe esse campo vazio"),
  municipio: z.string().min(1, "não deixe esse campo vazio"),
  bairro: z.string().min(1, "não deixe esse campo vazio"),
  logradouro: z.string().min(1, "não deixe esse campo vazio"),
  numero: z.coerce.number().min(1, "não deixe esse campo vazio(número)"),
  complemento: z.string().min(1, "não deixe esse campo vazio"),
});
