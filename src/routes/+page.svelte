<script lang="ts">                                                                // Indicamos que el script usa TypeScript dentro de este componente Svelte
  import { onMount } from 'svelte';                                               // Importamos el hook onMount, que se ejecuta sólo cuando el componente se monta en el cliente
  import column from '$lib/assets/column1.svg';                                   // Importamos el SVG de la columna desde src/lib/assets/column1.svg (Vite lo resuelve como URL)

  onMount(async () => {                                                           // Registramos una función asíncrona que se ejecutará al montar el componente en el navegador
    const gsapModule = await import('gsap');                                      // Importamos dinámicamente el módulo principal de GSAP (sólo en cliente, nunca en SSR)
    const scrollTriggerModule = await import('gsap/ScrollTrigger');               // Importamos dinámicamente el plugin ScrollTrigger de GSAP (también sólo en cliente)

    const gsap = gsapModule.default;                                              // Extraemos la exportación por defecto del módulo GSAP para usarla más cómodamente
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger;                      // Extraemos la clase/objeto ScrollTrigger del módulo importado

    gsap.registerPlugin(ScrollTrigger);                                           // Registramos el plugin ScrollTrigger dentro de GSAP para poder usarlo en las animaciones

    // 1) Primera sección - textos que vienen "desde lejos"
    gsap.from('.section-1 p', {                                                   // Animamos todos los <p> dentro del contenedor con clase .section-1
      opacity: 0,                                                                 // Empiezan completamente transparentes (invisibles)
      y: 80,                                                                      // Empiezan más abajo, como si vinieran desde el fondo de la pantalla
      scale: 0.7,                                                                 // Empiezan más pequeños (70% del tamaño), simulando lejanía
      duration: 3.2,                                                              // La animación dura 1.3 segundos
      ease: 'power3.out',                                                         // Curva de easing más marcada para sensación de "acelerar y frenar"
      stagger: 0.2                                                                // Cada <p> se anima con un pequeño retardo respecto al anterior
    });                                                                           // Fin de la configuración de la animación de la primera sección

    // Pilar SVG que se agranda y se desplaza del centro hacia la derecha
    gsap.fromTo(
      '.pillar1',                                                                 // Seleccionamos el SVG de la columna (clase .pillar)
      {
        opacity: 0,                                                               // Empieza invisible
        x: 0,                                                                     // Empieza en el centro (posición original)
        scale: 0.1                                                                // Empieza pequeño (50% del tamaño)
      },
      {
        opacity: 1,                                                               // Termina visible
        x: 800,                                                                   // Se desplaza 260 px hacia la derecha (ajústalo a gusto)
        scale: 5.7,                                                               // Termina a tamaño normal (100%)
        duration: 3.2,                                                            // Duración total de la animación
        ease: 'power2.out',                                                       // Easing suave
        delay: 0.4                                                                // Empieza un poco después que el texto
      }
    );

        gsap.fromTo(
      '.pillar2',                                                                 // Seleccionamos el SVG de la columna (clase .pillar)
      {
        opacity: 0,                                                               // Empieza invisible
        x: 0,                                                                     // Empieza en el centro (posición original)
        scale: 0.1                                                                // Empieza pequeño (50% del tamaño)
      },
      {
        opacity: 1,                                                               // Termina visible
        x: -800,                                                                  // Se desplaza 260 px hacia la derecha (ajústalo a gusto)
        scale: 5.75,                                                              // Termina a tamaño normal (100%)
        duration: 3.2,                                                            // Duración total de la animación
        ease: 'power2.out',                                                       // Easing suave
        delay: 0.4                                                                // Empieza un poco después que el texto
      }
    );

    // 2) Segunda sección - textos que se "acercan" al hacer scroll
    gsap.from('.section-2 p', {                                                   // Animamos los <p> dentro de la sección .section-2
      scrollTrigger: {                                                            // Configuramos ScrollTrigger para disparar la animación con el scroll
        trigger: '.section-2',                                                    // El trigger (disparador) es el contenedor con clase .section-2
        start: 'top 80%'                                                          // La animación empieza cuando el top de .section-2 alcanza el 80% de la ventana
      },
      opacity: 0,                                                                 // Partimos de opacidad 0
      y: 90,                                                                      // Más desplazamiento vertical para reforzar la sensación de profundidad
      scale: 0.75,                                                                // Empiezan un poco más pequeños
      duration: 3.2,                                                              // La animación dura 1.4 segundos
      ease: 'power3.out',                                                         // Mantenemos el mismo tipo de easing para consistencia
      stagger: 0.2                                                                // Ofrecemos un ligero efecto escalonado entre los distintos <p>
    });                                                                           // Fin de la configuración de la animación de la segunda sección

    // 3) Tercera sección - mismo lenguaje visual para el footer
    gsap.from('.section-3 p', {                                                   // Animamos los <p> dentro de .section-3 (footer / sección final)
      scrollTrigger: {                                                            // ScrollTrigger vuelve a activar esta animación con el scroll
        trigger: '.section-3',                                                    // El disparador es el contenedor con clase .section-3
        start: 'top 80%'                                                          // La animación comienza cuando el top de .section-3 llega al 80% de la ventana
      },
      opacity: 0,                                                                 // Comienza invisible
      y: 90,                                                                      // Comienza más abajo, igual que la segunda sección
      scale: 0.75,                                                                // Comienza más pequeño, para mantener la coherencia visual
      duration: 3.2,                                                              // Duración de la animación: 1.4 segundos
      ease: 'power3.out',                                                         // Mismo easing que en la segunda sección
      stagger: 0.2                                                                // Los elementos <p> se animan uno detrás de otro con pequeño retardo
    });                                                                           // Fin de la configuración de la animación de la tercera sección
  });                                                                             // Fin de la función registrada en onMount (se ejecuta sólo una vez al montar el componente)
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-neutral-800 p-8">
    <div class="section-1 relative flex min-h-screen flex-col items-center justify-center font-semibold text-neutral-400">
    <!-- Pilar "griego" usando el SVG importado. Pon el color beige en el propio SVG (fill="#f5e4c3"). -->
    <img
      src={column}                                                               
      alt="Columna estoica"                                                      
      class="pillar1 absolute top-1/2 left-1/2 h-40 w-auto -translate-x-1/2 -translate-y-1/2"  
    />
        <img
      src={column}                                                               
      alt="Columna estoica"                                                      
      class="pillar2 absolute top-1/2 left-1/2 h-40 w-auto -translate-x-1/2 -translate-y-1/2"  
    />
  <!-- <div class="section-1 relative flex min-h-screen flex-col items-center justify-center font-semibold text-neutral-400"> -->
    <!-- Pilar "griego" sencillo hecho con Tailwind, posicionado en el centro inicialmente -->
    <!-- <div
      class="pillar absolute top-1/2 left-1/2 h-40 w-10 -translate-x-1/2 -translate-y-1/2 rounded-t-lg border border-neutral-500/60 bg-neutral-300/80 shadow-lg"
    ></div> -->

    <!-- Contenido textual de la primera sección, por encima del pilar (z-10) -->
    <div class="z-10 flex flex-col items-center">
      <p class="my-4 w-2/3 text-center text-2xl">
        No pierdas el tiempo en discutir con los estúpidos y los charlatanes: la palabra la tienen todos, el buen juicio sólo unos pocos.
      </p>
      <p class="my-4 w-2/3 text-center text-xl">Catón el Joven</p>
    </div>
  </div>

  <div class="section-2 flex min-h-screen flex-col items-center justify-center font-semibold text-neutral-400">
    <p class="my-4 w-2/3 text-center text-2xl">2026/01/01</p>
    <p class="my-4 w-2/3 text-left text-xl">
      Aun con las mejores intenciones, infinidad de necios rechazarán tus consejos y sabiduría, más aún cuando estos contradicen su estilo de vida o alguno de sus ideales.
      Ni siquiera con pruebas empíricas conseguirás convencerlos. Rechazar una idea con la que llevas tiempo identificándote es algo moralmente muy doloroso; sólo los sabios
      están dispuestos a lidiar con ello.
    </p>
  </div>

  <div class="section-3 flex min-h-screen flex-col items-center justify-center font-semibold text-neutral-400">
    <p class="my-4 w-2/3 text-center text-2xl">Aquí irá el footer y toda la info relacionada.</p>
    <p class="my-4 w-2/3 text-center text-xl">Texto ejemplo</p>
  </div>
</div>
