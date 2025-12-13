<script lang="ts">
  import { onMount } from 'svelte';
  import Column from '$lib/components/SVGs/Column.svelte';
  import ScrollToTopButton from '$lib/components/ScrollToTopButton.svelte';
  import { goto } from '$app/navigation';

  type Theme = 'stoic' | 'light' | 'dark';
  type PhilosopherKey = 'seneca' | 'marco_aurelio' | 'zenon';

  // --- Tablas de imágenes por tema ---
  const Marco_Aurelio: Record<Theme, string> = { dark: 'https://i.imgur.com/kRgivLP.png', light: 'https://i.imgur.com/MnnwHb4.png', stoic: 'https://i.imgur.com/4hoP0je.png' };
  const Seneca: Record<Theme, string> = { dark: 'https://i.imgur.com/kErYSv2.png', light: 'https://i.imgur.com/bMsvk8g.png', stoic: 'https://i.imgur.com/X3h6jCZ.png' };
  const Zenon: Record<Theme, string> = { dark: 'https://i.imgur.com/aYk2h1A.png', light: 'https://i.imgur.com/7dMBWrp.png', stoic: 'https://i.imgur.com/YAJCZff.png' };

  const PHILOSOPHERS: Record<PhilosopherKey, Record<Theme, string>> = { seneca: Seneca, marco_aurelio: Marco_Aurelio, zenon: Zenon };
  const ICONS: Record<Theme, string> = { light: 'https://i.imgur.com/euBs7nd.png', dark: 'https://i.imgur.com/5KcCa05.png', stoic: 'https://i.imgur.com/IszGtyr.png' };
  const LAURELS: Record<Theme, string> = { light: 'https://i.imgur.com/0BqUIS6.png', dark: 'https://i.imgur.com/STZpD5E.png', stoic: 'https://i.imgur.com/ku8YVNo.png' };

  const urlDonar = 'https://www.paypal.com/es/home';
  const urlGithub = 'https://github.com/JOlmos98/stoic-quote';
  const urlJOlmos = 'https://portfolio-4mh1rt9a0-jesus-projects-8116cd3a.vercel.app/en';

  // --- Estado reactivo ---
  let currentTheme: Theme = 'stoic';
  let currentPhilosopher: PhilosopherKey = 'marco_aurelio';
  let imageSrc: string;
  let iconImage: string;
  let laurelImage: string;

  //* CREAR VARIABLES PARA LOS TEXTOS PARA MANEJAR POSTERIORMENTE CON PARAGLIDE

  const references = 'Recuenco, J. G., & de Haro, G. (2022). El pequeño libro de la filosofía estoica. Alienta Editorial.';

  // Define la URL de destino
  function goToFAQs() {
    goto('/docs/faqs');
  }
  function goToDocs() {
    goto('/docs');
  }
  function goToTech() {
    goto('/docs/this_project');
  }
  function goToDonar() {
    goto(urlDonar);
  }

  const updateThemeFromDom = () => {
    if (typeof document === 'undefined') return;
    const themeFromDom = document.documentElement.dataset.theme as Theme | undefined;
    currentTheme = themeFromDom ?? 'stoic';
  };

  const pickRandomPhilosopher = () => {
    const randomNum = Math.random();
    if (randomNum < 0.3) currentPhilosopher = 'seneca';
    else if (randomNum < 0.6) currentPhilosopher = 'marco_aurelio';
    else currentPhilosopher = 'zenon';
  };

  // onMount para tema + filósofo aleatorio
  onMount(() => {
    updateThemeFromDom();
    pickRandomPhilosopher();

    // Observa cambios en data-theme (cuando cambies de tema)
    const observer = new MutationObserver(() => {
      updateThemeFromDom();
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  });

  const PHILOSOPHER_LABELS: Record<PhilosopherKey, string> = { seneca: 'Séneca, uno de los máximos exponentes del estoicismo.', marco_aurelio: 'Marco Aurelio, el emperador estoico.', zenon: 'Zenón de Citio, padre del estoicismo.' };

  // Imagen final = filósofo aleatorio + tema actual
  $: imageSrc = PHILOSOPHERS[currentPhilosopher][currentTheme];

  // Texto bajo la imagen según el filósofo actual
  $: captionText = PHILOSOPHER_LABELS[currentPhilosopher];

  $: iconImage = ICONS[currentTheme];

  $: laurelImage = LAURELS[currentTheme];

  onMount(async () => {
    // Import dinámico (cliente-only)
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');

    const gsap = gsapModule.default;
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

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
        y: -300, // desplaza el texto hacia arriba
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

    // Imagen de la sección 2
    gsap.from('.section-2-image', { scrollTrigger: { trigger: '.section-2', start: 'top 80%' }, opacity: 0, y: 40, scale: 0.5, duration: 1.4, ease: 'power2.out' });

    gsap.from('.section-3 p', { scrollTrigger: { trigger: '.section-3', start: 'top 80%' }, opacity: 0, y: 90, scale: 0.75, duration: 1.2, ease: 'power3.out', stagger: 0.18 });

    // Icono de la sección 3: aparece y crece al hacer scroll
    gsap.from('.footer-icon', {
      scrollTrigger: {
        trigger: '.section-3',
        start: 'top 50%', // cuando la sección 3 empieza a entrar
        end: 'center center', // hasta mitad de viewport
        scrub: true // ligado al scroll (crece progresivamente)
      },
      opacity: 0,
      scale: 0.5,
      y: 60,
      ease: 'power2.out'
    });

    // Corona de laurel sección 3 (animación independiente)
    gsap.fromTo(
      '.laurel-icon',
      { opacity: 0, scale: 2, y: 700 },
      {
        scrollTrigger: {
          trigger: '.section-3',
          start: 'top bottom', // cuando la parte de arriba de section-3 toca la parte de abajo del viewport
          end: 'bottom bottom', // hasta que llegas al final de la sección 3
          scrub: true // ligado al scroll, como las columnas
        },
        opacity: 1,
        scale: 1.2,
        y: 0,
        ease: 'none'
      }
    );

    // Textos del footer (todos a la vez, fade-in al final del scroll)
    gsap.from('.footer-link', {
      scrollTrigger: {
        trigger: '.section-3',
        start: 'bottom bottom', // cuando el final de section-3 llega al final del viewport
        toggleActions: 'play none none reverse'
        // sin scrub -> animación normal, no ligada al avance del scroll
      },
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out'
      // SIN stagger: todos aparecen a la vez
    });
  });
</script>

<!-- Markup: los pilares están colocados con Tailwind en su posición final bg-[var(--bg)] text-[var(--fg)] -->
<div class="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] p-8">
  <div class="section-1 relative flex min-h-screen flex-col items-center justify-center font-semibold text-[var(--fg)]">
    <!-- Pilar izquierdo -->
    <Column className="pillar1 pointer-events-none absolute top-[47%] -left-[18%] z-0 h-250 w-auto -translate-y-1/2" />

    <!-- Pilar derecho -->
    <Column className="pillar2 pointer-events-none absolute top-[47%] -right-[18%] z-0 h-250 w-auto -translate-y-1/2" />

    <!-- Contenido textual (por encima de los pilares) -->
    <div class="z-10 flex flex-col items-center px-4 transition-transform duration-900 hover:scale-120">
      <p class="my-4 w-full text-center text-2xl md:w-2/3">No pierdas el tiempo en discutir con los estúpidos y los charlatanes: la palabra la tienen todos, el buen juicio sólo unos pocos.</p>
      <p class="my-4 w-full text-center text-xl md:w-2/3">Catón el Joven</p>
    </div>
  </div>

  <!-- <div class="section-2 flex min-h-screen flex-col items-center justify-center font-semibold text-[var(--fg)]"> -->
  <div class="section-2 relative flex min-h-screen flex-col items-center justify-center gap-10 font-semibold text-[var(--fg)] md:flex-row md:gap-16">
    <!-- Imagen + caption izquierda -->
    <div class="group section-2-image flex flex-col items-center gap-5">
      <img
        src={imageSrc}
        alt="Philosopher"
        class="pointer-events-none h-64 w-auto transition-transform duration-800 ease-out group-hover:scale-105 md:h-130"
        aria-hidden="true"
      />
      <p class="text-md text-[var(--bg)] transition-colors duration-800 ease-out group-hover:scale-105 group-hover:text-[var(--fg)] md:text-base">
        {captionText}
      </p>
    </div>

    <!-- Texto derecha -->
    <div class="section-2-text flex max-w-xl flex-col text-left">
      <p class="my-4 w-full text-left text-2xl">2026/01/01</p>
      <p class="my-4 w-full text-left text-xl">
        Aun con las mejores intenciones, infinidad de necios rechazarán tus consejos y sabiduría, más aún cuando estos contradicen su estilo de vida o alguno de sus ideales. Ni siquiera con pruebas empíricas conseguirás convencerlos. Rechazar una
        idea con la que llevas tiempo identificándote es algo moralmente muy doloroso; sólo los sabios están dispuestos a lidiar con ello.
      </p>
      <p class="my-4 w-full text-left text-xl">Referencias de la cita:</p>
      {references}
    </div>
  </div>
  <div class="section-3 relative flex min-h-screen flex-col items-center justify-center font-semibold text-[var(--fg)]">
    <div class="relative flex items-center justify-center">
      <!-- Corona de laurel -->
      <img
        src={laurelImage}
        alt="laurel"
        class="laurel-icon pointer-events-none z-10 h-180"
        aria-hidden="true"
      />

      <!-- FAQs -->
      <button
        type="button"
        class="footer-link absolute top-[25%] left-[18%] z-20 cursor-pointer
         text-3xl tracking-wide text-[var(--muted)]
         transition-colors duration-500 hover:text-[var(--bg)] md:text-4xl"
        on:click={() => goToFAQs()}
      >
        FAQs
      </button>

      <!-- Doc -->
      <button
        type="button"
        class="footer-link absolute top-[46%] left-[15%] z-20 -translate-y-1/2 cursor-pointer
         text-3xl tracking-wide text-[var(--muted)]
         transition-colors duration-500 hover:text-[var(--bg)] md:text-4xl"
        on:click={() => goToDocs()}
      >
        Docs
      </button>

      <!-- Tech -->
      <button
        type="button"
        class="footer-link absolute top-[61%] left-[20%] z-20 cursor-pointer
         text-3xl tracking-wide text-[var(--muted)]
         transition-colors duration-500 hover:text-[var(--bg)] md:text-4xl"
        on:click={() => console.log('Click en Tech')}
      >
        Tech
      </button>
      <!-- Donation -->
      <button
        type="button"
        class="footer-link absolute top-[25%] right-[17%] z-20 cursor-pointer
         text-3xl tracking-wide text-[var(--muted)]
         transition-colors duration-500 hover:text-[var(--bg)] md:text-4xl"
        on:click={() => console.log('Click en Donar')}
      >
        Donar
      </button>
      <!-- GitHub -->
      <a
        href={urlGithub}
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link absolute top-[45%] right-[12%] z-20 -translate-y-1/2 cursor-pointer
         text-3xl tracking-wide text-[var(--muted)]
         transition-colors duration-500 hover:text-[var(--bg)] md:text-4xl"
      >
        GitHub
      </a>
      <!-- J. Olmos -->
      <a
        href={urlJOlmos}
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link absolute top-[61%] right-[15%] z-20 cursor-pointer
         text-3xl tracking-wide text-[var(--muted)]
         transition-colors duration-500 hover:text-[var(--bg)] md:text-4xl"
      >
        J. Olmos
      </a>
    </div>
  </div>
  <ScrollToTopButton />
</div>
