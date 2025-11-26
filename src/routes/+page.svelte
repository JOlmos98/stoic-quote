<script lang="ts">
  import { onMount } from 'svelte';
  import column from '$lib/assets/column1.svg';

  onMount(async () => {
    // Import dinámico (cliente-only)
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');

    const gsap = gsapModule.default;
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // 1) Textos sección 1 (desde "lejos")
    gsap.from('.section-1 p', {
      opacity: 0,
      y: 80,
      scale: 0.7,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.18
    });

    // 2) Pilares: ya están posicionados con Tailwind en su sitio (final).
    //    Animamos desde un estado inicial (opacidad 0, muy pequeño, y ligero y offset)
    gsap.from('.pillar1', {
      opacity: 0,
      scale: 0.12,
      y: 30,
      duration: 1.3,
      ease: 'power2.out',
      delay: 0.35
    });

    gsap.from('.pillar2', {
      opacity: 0,
      scale: 0.12,
      y: 30,
      duration: 1.3,
      ease: 'power2.out',
      delay: 0.45
    });

    // 3) Secciones siguientes con ScrollTrigger (mantengo tu lógica)
    gsap.from('.section-2 p', {
      scrollTrigger: {
        trigger: '.section-2',
        start: 'top 80%'
      },
      opacity: 0,
      y: 90,
      scale: 0.75,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.18
    });

    gsap.from('.section-3 p', {
      scrollTrigger: {
        trigger: '.section-3',
        start: 'top 80%'
      },
      opacity: 0,
      y: 90,
      scale: 0.75,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.18
    });
  });
</script>

<!-- Markup: los pilares están colocados con Tailwind en su posición final -->
<div class="flex min-h-screen flex-col items-center justify-center bg-neutral-800 p-8">
  <div class="section-1 relative flex min-h-screen flex-col items-center justify-center font-semibold text-neutral-400">
    <!-- Pilar izquierdo: colocado en left-1/4 (posición final definida por Tailwind) -->
    <img
      src={column}
      alt="Columna izquierda"
      class="pillar2 absolute top-[47%] -left-[18%] -translate-y-1/2 h-250 w-auto z-0 pointer-events-none"
      aria-hidden="true"
    />

    <!-- Pilar derecho: colocado en right-1/4 (posición final definida por Tailwind) -->
    <img
      src={column}
      alt="Columna derecha"
      class="pillar2 absolute top-[47%] -right-[18%] -translate-y-1/2 h-250 w-auto z-0 pointer-events-none"
      aria-hidden="true"
    />

    <!-- Contenido textual (por encima de los pilares) -->
    <div class="z-10 flex flex-col items-center px-4">
      <p class="my-4 w-full md:w-2/3 text-center text-2xl">
        No pierdas el tiempo en discutir con los estúpidos y los charlatanes: la palabra la tienen todos, el buen juicio sólo unos pocos.
      </p>
      <p class="my-4 w-full md:w-2/3 text-center text-xl">Catón el Joven</p>
    </div>
  </div>

  <div class="section-2 flex min-h-screen flex-col items-center justify-center font-semibold text-neutral-400">
    <p class="my-4 w-full md:w-2/3 text-center text-2xl">2026/01/01</p>
    <p class="my-4 w-full md:w-2/3 text-left text-xl">
      Aun con las mejores intenciones, infinidad de necios rechazarán tus consejos y sabiduría, más aun cuando estos contradicen su estilo...
    </p>
  </div>

  <div class="section-3 flex min-h-screen flex-col items-center justify-center font-semibold text-neutral-400">
    <p class="my-4 w-full md:w-2/3 text-center text-2xl">Aquí irá el footer y toda la info relacionada.</p>
    <p class="my-4 w-full md:w-2/3 text-center text-xl">Texto ejemplo</p>
  </div>
</div>
