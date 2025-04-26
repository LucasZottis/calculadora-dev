export interface MenuConversor {
    id: string;
    nome: string;
    icone: string;
    rotaLayout: string;
    rotas: { nome: string, rota: string }[];
}