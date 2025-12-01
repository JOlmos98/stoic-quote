<script lang="ts">
  import { onMount } from 'svelte';
  import column from '$lib/assets/column1.svg';
  import woman from '$lib/assets/Woman2.svg';
  import asklepios from '$lib/assets/Asklepios.svg';
  import apollo from '$lib/assets/Apollo.svg';
  import poseidon from '$lib/assets/Poseidon.svg';

  onMount(async () => {
    // Import dinámico (cliente-only)
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');

    const gsap = gsapModule.default;
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Flote suave en eje Y para personajes
    // const floatCharacters = (targets: string) => {
    //   gsap.to(targets, {
    //     y: 6,                   // se mueve solo 6px hacia abajo y arriba
    //     duration: 6,            // movimiento muy lento
    //     ease: 'sine.inOut',     // movimiento suave tipo ola
    //     yoyo: true,             // vuelve hacia atrás
    //     repeat: -1              // infinito
    //   });
    // };

    // 1) Textos sección 1 (desde "lejos")
    gsap.from('.section-1 p', { opacity: 0, y: 80, scale: 0.12, duration: 2.5, ease: 'power3.out', stagger: 0.18, delay: 0.45 });

    // 2) Pilares: ya están posicionados con Tailwind en su sitio (final).
    //    Animamos desde un estado inicial (opacidad 0, muy pequeño, y ligero y offset)
    gsap.from('.pillar1', { opacity: 0, scale: 0.12, y: 30, duration: 2.5, ease: 'power2.out', delay: 0.45 });

    gsap.from('.pillar2', { opacity: 0, scale: 0.12, y: 30, duration: 2.5, ease: 'power2.out', delay: 0.45 });

    // 4) Al hacer scroll hacia abajo: texto sube y pilares se abren hacia los lados
    const introScrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-1', // usamos la primera sección como zona de scroll
        start: 'top top', // cuando la parte superior de section-1 toca la parte superior del viewport
        end: 'bottom top', // hasta que el bottom de section-1 llega al top del viewport
        scrub: true // la animación se liga al scroll (sin salto brusco)
      }
    });

    // Texto: sube y se desvanece
    introScrollTl.to(
      '.section-1 p',
      {
        y: -150, // desplaza el texto hacia arriba
        opacity: 0, // lo hacemos desaparecer poco a poco
        ease: 'none'
      },
      0 // las animaciones empiezan todas a la vez en el timeline
    );

    // Pilar izquierdo: se va a la izquierda y se esconde
    introScrollTl.to(
      '.pillar1',
      {
        x: '-40vw', // empujamos el pilar hacia la izquierda (40% del ancho de la ventana)
        opacity: 0, // se desvanece
        ease: 'none'
      },
      0
    );

    // Pilar derecho: se va a la derecha y se esconde
    introScrollTl.to(
      '.pillar2',
      {
        x: '40vw', // empujamos el pilar hacia la derecha
        opacity: 0, // se desvanece
        ease: 'none'
      },
      0
    );

    // 3) Secciones siguientes con ScrollTrigger (mantengo tu lógica)
    gsap.from('.section-2 p', { scrollTrigger: { trigger: '.section-2', start: 'top 80%' }, opacity: 0, y: 90, scale: 0.75, duration: 1.2, ease: 'power3.out', stagger: 0.18 });
    // Figuras de la sección 2 (Asklepios y Woman) aparecen suavemente al entrar la sección
    gsap.from('.asklepios-figure', {
      scrollTrigger: {
        trigger: '.section-2', // cuando la sección 2 entra en pantalla
        start: 'top 80%' // empieza cuando el top de section-2 llega al 80% del viewport
      },
      opacity: 0, // empieza transparente
      y: 40, // un poco más abajo
      scale: 0.8, // ligeramente más pequeña
      duration: 1.4, // animación algo lenta
      ease: 'power2.out' // easing suave
    });

    gsap.from('.woman-figure', {
      scrollTrigger: {
        trigger: '.section-2', // mismo trigger
        start: 'top 80%'
      },
      opacity: 0,
      y: 40,
      scale: 0.8,
      duration: 1.4,
      ease: 'power2.out'
    });

    gsap.from('.section-3 p', { scrollTrigger: { trigger: '.section-3', start: 'top 80%' }, opacity: 0, y: 90, scale: 0.75, duration: 1.2, ease: 'power3.out', stagger: 0.18 });

    gsap.from('.apollo-figure', {
      scrollTrigger: {
        trigger: '.section-3', // cuando entra la sección 3
        start: 'top 80%' // empieza cuando el top de section-3 llega al 80% del viewport
      },
      opacity: 0,
      y: 40,
      scale: 0.8,
      duration: 1.4,
      ease: 'power2.out'
    });

    gsap.from('.poseidon-figure', {
      scrollTrigger: {
        trigger: '.section-3', // a
        start: 'top 80%'
      },
      opacity: 0,
      y: 40,
      scale: 0.8,
      duration: 1.4,
      ease: 'power2.out'
    });

    // Activar flote en todos los personajes
    // floatCharacters('.asklepios-figure');
    // floatCharacters('.woman-figure');
    // floatCharacters('.apollo-figure');
    // floatCharacters('.poseidon-figure');
  });
</script>

<!-- Markup: los pilares están colocados con Tailwind en su posición final bg-[var(--bg)] text-[var(--fg)] -->
<div class="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] p-8">
  <div class="section-1 relative flex min-h-screen flex-col items-center justify-center font-semibold text-[var(--fg)]">
    <!-- Pilar izquierdo: colocado en left-1/4 (posición final definida por Tailwind) -->
    <img
      src={column}
      alt="Columna izquierda"
      class="pillar1 pointer-events-none absolute top-[47%] -left-[18%] z-0 h-250 w-auto -translate-y-1/2"
      aria-hidden="true"
    />

    <!-- Pilar derecho: colocado en right-1/4 (posición final definida por Tailwind) -->
    <img
      src={column}
      alt="Columna derecha"
      class="pillar2 pointer-events-none absolute top-[47%] -right-[18%] z-0 h-250 w-auto -translate-y-1/2"
      aria-hidden="true"
    />

    <!-- Contenido textual (por encima de los pilares) -->
    <div class="z-10 flex flex-col items-center px-4">
      <p class="my-4 w-full text-center text-2xl md:w-2/3">No pierdas el tiempo en discutir con los estúpidos y los charlatanes: la palabra la tienen todos, el buen juicio sólo unos pocos.</p>
      <p class="my-4 w-full text-center text-xl md:w-2/3">Catón el Joven</p>
    </div>
  </div>

  <!-- <div class="section-2 flex min-h-screen flex-col items-center justify-center font-semibold text-[var(--fg)]"> -->
  <div class="section-2 relative flex min-h-screen flex-col items-center justify-center font-semibold text-[var(--fg)]">
    <img
      src={asklepios}
      alt="Asklepios"
      class="asklepios-figure pointer-events-none absolute top-1/2 -right-70 z-0 h-225 w-auto -translate-y-1/2 -rotate-20"
      aria-hidden="true"
    />

    <img
      src={woman}
      alt="Woman"
      class="woman-figure pointer-events-none absolute top-1/2 -left-50 z-0 h-225 w-auto -translate-y-1/2 rotate-20"
      aria-hidden="true"
    />

    <p class="my-4 w-full text-center text-2xl md:w-2/3">2026/01/01</p>
    <p class="my-4 w-full text-left text-xl md:w-2/3">
      Aun con las mejores intenciones, infinidad de necios rechazarán tus consejos y sabiduría, más aún cuando estos contradicen su estilo de vida o alguno de sus ideales. Ni siquiera con pruebas empíricas conseguirás convencerlos. Rechazar una idea
      con la que llevas tiempo identificándote es algo moralmente muy doloroso; sólo los sabios están dispuestos a lidiar con ello.
    </p>
  </div>

  <div class="section-3 relative flex min-h-screen flex-col items-center justify-center font-semibold text-[var(--fg)]">
    <img
      src={apollo}
      alt="Apollo"
      class="apollo-figure pointer-events-none absolute top-1/2 -left-230 z-0 h-225 w-auto -translate-y-1/2 rotate-25"
      aria-hidden="true"
    />

    <img
      src={poseidon}
      alt="Poseidon"
      class="poseidon-figure pointer-events-none absolute top-5/12 -right-230 z-0 h-225 w-auto -translate-y-1/2 -rotate-25"
      aria-hidden="true"
    />

    <p class="my-4 w-full text-center text-2xl md:w-2/3">Aquí irá el footer y toda la info relacionada.</p>
    <p class="my-4 w-full text-center text-xl md:w-2/3">Texto ejemplo</p>
  </div>
</div>

<!-- 
    
          // onComplete: () => floatItems('.section-1 p') -->
