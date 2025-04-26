export interface MenuConversor {
    id: string;
    nome: string;
    icone: string;
    rotas: { nome: string, rota: string }[];
}