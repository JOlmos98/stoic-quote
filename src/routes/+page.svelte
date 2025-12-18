<script lang="ts">
  import { onMount } from 'svelte';
  import Column from '$lib/components/SVGs/Column.svelte';
  import ScrollToTopButton from '$lib/components/ScrollToTopButton.svelte';
  import { goto } from '$app/navigation';
  import { m } from '$lib/paraglide/messages.js';
  import { getDayOfYearInTZ } from '$lib/dayOfYear';

  const tz = 'Europe/Madrid';

  let doy = 1;
  let key = '2026_001';
  let date = '';

  function formatYMDInTZ(dateObj: Date, timeZone: string) {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(dateObj);

    const y = parts.find((p) => p.type === 'year')!.value;
    const m = parts.find((p) => p.type === 'month')!.value;
    const d = parts.find((p) => p.type === 'day')!.value;
    return `${y}/${m}/${d}`;
  }

  $: doy = getDayOfYearInTZ(new Date(), tz);
  $: key = `2026_${String(doy).padStart(3, '0')}`;
  $: date = formatYMDInTZ(new Date(), tz);

  const fallbackKey = '2026_004';

  $: dailyQuote = (m as any)[`quotes_${key}_quote`]?.() ?? (m as any)[`quotes_${fallbackKey}_quote`]?.() ?? '';
  $: dailyAuthor = (m as any)[`quotes_${key}_author`]?.() ?? (m as any)[`quotes_${fallbackKey}_author`]?.() ?? '';
  $: dailyReflection = (m as any)[`quotes_${key}_reflection`]?.() ?? (m as any)[`quotes_${fallbackKey}_reflection`]?.() ?? '';
  $: dailyReference = (m as any)[`quotes_${key}_reference`]?.() ?? (m as any)[`quotes_${fallbackKey}_reference`]?.() ?? '';

  type Theme = 'stoic' | 'light' | 'dark';
  type PhilosopherKey = 'seneca' | 'marco_aurelio' | 'zenon';

  const Marco_Aurelio: Record<Theme, string> = { dark: 'https://i.imgur.com/kRgivLP.png', light: 'https://i.imgur.com/MnnwHb4.png', stoic: 'https://i.imgur.com/4hoP0je.png' };
  const Seneca: Record<Theme, string> = { dark: 'https://i.imgur.com/kErYSv2.png', light: 'https://i.imgur.com/bMsvk8g.png', stoic: 'https://i.imgur.com/X3h6jCZ.png' };
  const Zenon: Record<Theme, string> = { dark: 'https://i.imgur.com/aYk2h1A.png', light: 'https://i.imgur.com/7dMBWrp.png', stoic: 'https://i.imgur.com/YAJCZff.png' };

  const PHILOSOPHERS: Record<PhilosopherKey, Record<Theme, string>> = { seneca: Seneca, marco_aurelio: Marco_Aurelio, zenon: Zenon };
  const LAURELS: Record<Theme, string> = { light: 'https://i.imgur.com/0BqUIS6.png', dark: 'https://i.imgur.com/STZpD5E.png', stoic: 'https://i.imgur.com/ku8YVNo.png' };

  const urlDonar = 'https://www.paypal.com/es/home';
  const urlGithub = 'https://github.com/JOlmos98/stoic-quote';
  const urlJOlmos = 'https://portfolio-4mh1rt9a0-jesus-projects-8116cd3a.vercel.app/en';

  let currentTheme: Theme = 'stoic';
  let currentPhilosopher: PhilosopherKey = 'marco_aurelio';
  let imageSrc: string;
  let laurelImage: string;
  let enableGsap = false;

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

    const mq = window.matchMedia('(min-width: 768px)'); // md
    const setBreakpoint = () => (enableGsap = mq.matches);
    setBreakpoint();
    mq.addEventListener('change', setBreakpoint);

    // Observa cambios en data-theme (cuando cambies de tema)
    const observer = new MutationObserver(() => {
      updateThemeFromDom();
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
      mq.removeEventListener('change', setBreakpoint);
    };
  });

  $: imageSrc = PHILOSOPHERS[currentPhilosopher][currentTheme];
  const fallbackPhilosopher: PhilosopherKey = 'marco_aurelio';
  $: captionText = (m as any)[currentPhilosopher]?.() ?? (m as any)[fallbackPhilosopher]?.() ?? '';
  $: laurelImage = LAURELS[currentTheme];
  $: shortQuote = (dailyQuote?.length ?? 0) < 90;

  onMount(async () => {
    if (!enableGsap) return;

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
    {#if enableGsap}
      <!-- Pilar izquierdo -->
      <Column className={shortQuote ? 'pillar1 pointer-events-none absolute top-[47%] -left-[100%] z-0 h-250 w-auto -translate-y-1/2' : 'pillar1 pointer-events-none absolute top-[47%] -left-[8%] z-0 h-250 w-auto -translate-y-1/2'} />
      <!-- Pilar derecho -->
      <Column className={shortQuote ? 'pillar2 pointer-events-none absolute top-[47%] -right-[100%] z-0 h-250 w-auto -translate-y-1/2' : 'pillar2 pointer-events-none absolute top-[47%] -right-[8%] z-0 h-250 w-auto -translate-y-1/2'} />
    {/if}
    <!-- Contenido textual (por encima de los pilares)  transition-transform duration-900 hover:scale-120 -->
    <div class="z-10 flex flex-col items-center px-4">
      <p class="my-4 w-full text-center text-2xl md:w-2/3">{dailyQuote}</p>
      <p class="my-4 w-full text-center text-xl md:w-2/3">{dailyAuthor}</p>
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
      <p class="my-4 w-full text-left text-2xl">{date}</p>
      <p class="my-4 w-full text-left text-xl">{dailyReflection}</p>
      <p class="my-4 w-full text-left text-xl">{m.quoteReferencesTitle()}</p>
      <p class="text-md my-4 w-full text-left">{dailyReference}</p>
    </div>
  </div>
  <div class="section-3 relative flex min-h-screen flex-col items-center justify-center font-semibold text-[var(--fg)]">
    <div class="relative flex items-center justify-center">
      <!-- Corona de laurel -->
      <img
        src={laurelImage}
        alt="laurel"
        class="laurel-icon pointer-events-none z-10 h-140 md:h-180"
        aria-hidden="true"
      />
      <!-- Doc -->
      <button
        type="button"
        class="footer-link text-md absolute top-[32%] left-[22%] z-20 -translate-y-1/2
   cursor-pointer tracking-wide text-[var(--muted)]
   transition-colors duration-500 hover:text-[var(--bg)]
   md:top-[28%] md:left-[18%] md:text-4xl"
        on:click={() => goToDocs()}
      >
        Docs
      </button>

      <!-- FAQs -->
      <button
        type="button"
        class="footer-link text-md absolute top-[44%] left-[20%] z-20
   cursor-pointer tracking-wide text-[var(--muted)]
   transition-colors duration-500 hover:text-[var(--bg)]
   md:top-[43%] md:left-[14%] md:text-4xl"
        on:click={() => goToFAQs()}
      >
        FAQs
      </button>

      <!-- Tech -->
      <button
        type="button"
        class="footer-link text-md absolute top-[60%] left-[24%] z-20
   cursor-pointer tracking-wide text-[var(--muted)]
   transition-colors duration-500 hover:text-[var(--bg)]
   md:top-[61%] md:left-[20%] md:text-4xl"
        on:click={() => goToTech()}
      >
        Tech
      </button>

      <!-- Donation -->
      <a
        href={urlDonar}
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link text-md absolute top-[30%] right-[21%] z-20
   cursor-pointer tracking-wide text-[var(--muted)]
   transition-colors duration-500 hover:text-[var(--bg)]
   md:top-[25%] md:right-[15%] md:text-4xl"
        on:click={() => console.log('Click en Donar')}
      >
        {m.footerDonate()}
      </a>

      <!-- GitHub -->
      <a
        href={urlGithub}
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link text-md absolute top-[47%] right-[17%] z-20 -translate-y-1/2
   cursor-pointer tracking-wide text-[var(--muted)]
   transition-colors duration-500 hover:text-[var(--bg)]
   md:top-[45%] md:right-[12%] md:text-4xl"
      >
        GitHub
      </a>
      <!-- J. Olmos -->
      <a
        href={urlJOlmos}
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link text-md absolute top-[60%] right-[20%] z-20
         cursor-pointer tracking-wide text-[var(--muted)]
         transition-colors duration-500 hover:text-[var(--bg)]
         md:top-[61%] md:right-[15%] md:text-4xl"
      >
        J. Olmos
      </a>
    </div>
  </div>
  <ScrollToTopButton />
</div>
