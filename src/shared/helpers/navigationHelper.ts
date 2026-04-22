export class NavigationHelper {
    public static setupAnchorNavigation(): void {
      if (typeof window === 'undefined') return;

      setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
          NavigationHelper.scrollToElement(hash);
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = anchor.getAttribute('href');
            if (target) {
              NavigationHelper.scrollToElement(target);
              history.pushState(null, '', target);
            }
          });
        });
      }, 100);
    }

    public static scrollToElement(selector: string): void {
      if (typeof document === 'undefined') return;

      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        element.classList.add('highlight-section');
        setTimeout(() => {
          element.classList.remove('highlight-section');
        }, 2000);
      }
    }

    public static toggleQuickNavigation(navElement: HTMLElement, visible: boolean): void {
      if (visible) {
        navElement.classList.add('visible');
      } else {
        navElement.classList.remove('visible');
      }
    }

    public static setupScrollWatch(threshold: number = 300): void {
      if (typeof document === 'undefined' || typeof window === 'undefined') return;

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
