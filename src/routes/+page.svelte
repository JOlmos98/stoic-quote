<script lang="ts">                                                                 
  import { onMount } from 'svelte';                                               // Importamos el hook onMount, que se ejecuta sólo cuando el componente se monta en el cliente

  onMount(async () => {                                                           // Registramos una función asíncrona que se ejecutará al montar el componente en el navegador
    const gsapModule = await import('gsap');                                      // Importamos dinámicamente el módulo principal de GSAP (sólo en cliente, nunca en SSR)
    const scrollTriggerModule = await import('gsap/ScrollTrigger');               // Importamos dinámicamente el plugin ScrollTrigger de GSAP (también sólo en cliente)

    const gsap = gsapModule.default;                                              // Extraemos la exportación por defecto del módulo GSAP para usarla más cómodamente
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger;                      // Extraemos la clase/objeto ScrollTrigger del módulo importado

    gsap.registerPlugin(ScrollTrigger);                                           // Registramos el plugin ScrollTrigger dentro de GSAP para poder usarlo en las animaciones

    // 1) Primera sección
    gsap.from('.section-1 p', {                                                   // Animamos todos los <p> dentro del contenedor con clase .section-1
      opacity: 0,                                                                 // Empiezan completamente transparentes (invisibles)
      y: 30,                                                                      // Empiezan desplazados 30px hacia abajo en el eje Y
      duration: 1,                                                                // La animación dura 1 segundo
      ease: 'power2.out',                                                         // Usamos una curva de aceleración/suavizado tipo "power2.out"
      stagger: 0.2                                                                // Cada <p> se anima con un retardo de 0.2s respecto al anterior
    });                                                                           // Fin de la configuración de la animación de la primera sección

    // 2) Segunda sección
    gsap.from('.section-2 p', {                                                   // Animamos los <p> dentro de .section-2
      scrollTrigger: {                                                            // Configuramos ScrollTrigger para disparar esta animación con el scroll
        trigger: '.section-2',                                                    // El trigger (disparador) es el contenedor con clase .section-2
        start: 'top 80%'                                                          // La animación empieza cuando el top de .section-2 llega al 80% de la altura de la ventana
      },
      opacity: 0,                                                                 // De nuevo, iniciamos con opacidad 0 (invisible)
      y: 40,                                                                      // Empiezan 40px más abajo en el eje Y
      // z: 80,                                                                      
      duration: 2.5,                                                              // La animación dura 0.9 segundos
      ease: 'power2.out',                                                         // Misma curva de easing suave que antes
      stagger: 0.15                                                               // Pequeño efecto escalonado entre los distintos <p> de esta sección
    });                                                                           // Fin de la configuración de la animación de la segunda sección

    // 3) Tercera sección
    gsap.from('.section-3 p', {                                                   // Animamos los <p> dentro de .section-3 (footer / sección final)
      scrollTrigger: {                                                            // Volvemos a usar ScrollTrigger para activar al hacer scroll
        trigger: '.section-3',                                                    // El disparador es el contenedor con clase .section-3
        start: 'top 80%'                                                          // La animación comienza cuando el top de .section-3 llega al 80% de la ventana
      },
      opacity: 0,                                                                 // Partimos de opacidad 0 (no visible)
      y: 40,                                                                      // Desplazamos 40px hacia abajo al inicio
      duration: 0.9,                                                              // Duración de la animación: 0.9 segundos
      ease: 'power2.out',                                                         // Mantenemos el mismo easing para consistencia visual
      stagger: 0.15                                                               // Los elementos <p> se animan uno detrás de otro con 0.15s de diferencia
    });                                                                           // Fin de la configuración de la animación de la tercera sección
  });                                                                             // Fin de la función registrada en onMount (se ejecuta sólo una vez al montar el componente)
</script>                                                                         

<div class="flex min-h-screen flex-col items-center justify-center bg-neutral-800 p-8">
  <div class="section-1 flex min-h-screen flex-col items-center justify-center font-semibold text-neutral-400">
    <p class="my-4 w-2/3 text-center text-2xl">
      No pierdas el tiempo en discutir con los estúpidos y los charlatanes: la palabra la tienen todos, el buen juicio sólo unos pocos.
    </p>
    <p class="my-4 w-2/3 text-center text-xl">Catón el Joven</p>
  </div>

  <div class="section-2 flex min-h-screen flex-col items-center justify-center font-semibold text-neutral-400">
    <p class="my-4 w-2/3 text-center text-2xl">2026/01/01</p>
    <p class="my-4 w-2/3 text-left text-xl">
      Aun con las mejores intenciones, infinidad de necios rechazarán tus consejos y sabiduría, más aún cuando estos contradicen su estilo de vida o alguno de sus ideales. Ni siquiera con pruebas empíricas conseguirás convencerlos. Rechazar una idea
      con la que llevas tiempo identificándote es algo moralmente muy doloroso; sólo los sabios están dispuestos a lidiar con ello.
    </p>
  </div>

  <div class="section-3 flex min-h-screen flex-col items-center justify-center font-semibold text-neutral-400">
    <p class="my-4 w-2/3 text-center text-2xl">Aquí irá el footer y toda la info relacionada.</p>
    <p class="my-4 w-2/3 text-center text-xl">Texto ejemplo</p>
  </div>
</div>
