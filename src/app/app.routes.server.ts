import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'politica-de-privacidade', renderMode: RenderMode.Prerender },
  { path: 'validadores', renderMode: RenderMode.Prerender },
  { path: 'validadores/cpf', renderMode: RenderMode.Prerender },
  { path: 'validadores/cnpj', renderMode: RenderMode.Prerender },
  { path: 'geradores', renderMode: RenderMode.Prerender },
  { path: 'geradores/cpf', renderMode: RenderMode.Prerender },
  { path: 'geradores/cnpj', renderMode: RenderMode.Prerender },
  { path: 'conversores', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server },
];
