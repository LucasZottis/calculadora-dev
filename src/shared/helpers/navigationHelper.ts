// src/shared/helpers/navigation-helper.ts

/**
 * Facilita a navegação por âncoras na página
 * Adiciona rolagem suave e destaque temporário
 */
export class NavigationHelper {
    /**
     * Configura a navegação por âncoras na página
     */
    public static setupAnchorNavigation(): void {
      // Esperar o DOM carregar completamente
      setTimeout(() => {
        // Verificar fragmento de URL inicial
        const hash = window.location.hash;
        if (hash) {
          NavigationHelper.scrollToElement(hash);
        }
  
        // Adicionar listener para links de âncora dentro da página
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = anchor.getAttribute('href');
            if (target) {
              NavigationHelper.scrollToElement(target);
              // Atualizar URL sem recarregar a página
              history.pushState(null, '', target);
            }
          });
        });
      }, 100);
    }
  
    /**
     * Rola a página até o elemento especificado
     * @param selector Seletor CSS do elemento alvo
     */
    public static scrollToElement(selector: string): void {
      const element = document.querySelector(selector);
      if (element) {
        // Rolagem suave até o elemento
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
  
        // Adicionar classe de destaque temporário
        element.classList.add('highlight-section');
        setTimeout(() => {
          element.classList.remove('highlight-section');
        }, 2000);
      }
    }
  
    /**
     * Mostra ou esconde a navegação rápida em dispositivos móveis
     * @param navElement Elemento de navegação rápida
     * @param visible Estado de visibilidade
     */
    public static toggleQuickNavigation(navElement: HTMLElement, visible: boolean): void {
      if (visible) {
        navElement.classList.add('visible');
      } else {
        navElement.classList.remove('visible');
      }
    }
  
    /**
     * Seta o evento de observação de rolagem para exibir/esconder navegação
     * @param threshold Limite de rolagem para mostrar a navegação
     */
    public static setupScrollWatch(threshold: number = 300): void {
      const quickNav = document.querySelector('.quick-navigation') as HTMLElement;
      
      if (!quickNav) return;
      
      window.addEventListener('scroll', () => {
        if (window.scrollY > threshold) {
          quickNav.classList.add('sticky');
        } else {
          quickNav.classList.remove('sticky');
        }
      });
    }
  }