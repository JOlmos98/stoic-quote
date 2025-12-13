<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { ArrowUp } from 'lucide-svelte';

  let visible = false;
  let threshold = 0; // posición Y a partir de la cual se muestra el botón

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function handleScroll() {
    if (typeof window === 'undefined') return;
    // se muestra cuando hemos pasado más o menos la sección 2
    visible = window.scrollY > threshold - window.innerHeight / 2;
  }

  onMount(() => {
    if (typeof document === 'undefined') return;

    const section2 = document.querySelector('.section-2') as HTMLElement | null;
    if (section2) {
      threshold = section2.offsetTop;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // calcular estado inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<button
  type="button"
  on:click={scrollToTop}
  aria-label="Volver arriba"
  class="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--fg)] bg-[var(--bg)] text-[var(--fg)] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[var(--accent)]"
  class:opacity-0={!visible}
  class:translate-y-4={!visible}
  class:pointer-events-none={!visible}
>
  <ArrowUp class="h-5 w-5" />
</button>
