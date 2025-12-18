<!-- src/lib/components/ThemeSwitcher.svelte -->
<script lang="ts">
  import { theme, type Theme } from '$lib/stores/theme';
  import { Sun, Moon, Landmark } from 'lucide-svelte';

  // Función que cicla entre los 3 themes: stoic -> light -> dark -> stoic
  const cycleTheme = () => {
    const current = $theme as Theme;

    let next: Theme;
    if (current === 'stoic') {
      next = 'light';
    } else if (current === 'light') {
      next = 'dark';
    } else {
      next = 'stoic';
    }

    theme.set(next); // El store ya se encarga de data-theme + localStorage
  };

  // Etiqueta accesible según el tema actual
  $: ariaLabel = $theme === 'stoic' ? 'Cambiar tema (actual: Stoic)' : $theme === 'light' ? 'Cambiar tema (actual: Light)' : 'Cambiar tema (actual: Dark)';
</script>

<!-- Botón fijo, centrado arriba  rounded-full border border-[var(--fg)] shadow-lg bg-[var(--bg)] hover:bg-[var(--accent)] hover:text-[var(--fg)]-->
<div class="fixed top-4 left-[48%] md:left-1/2 z-50 -translate-x-1/2 mr-8">
  <button
    type="button"
    on:click={cycleTheme}
    class="flex h-10 w-10 items-center justify-center text-[var(--fg)] transition hover:scale-105"
    aria-label={ariaLabel}
  >
    {#if $theme === 'stoic'}
      <!-- Stoic -> icono sol -->
      <Sun class="h-5 w-5" />
    {:else if $theme === 'light'}
      <!-- Light -> icono luna -->
      <Moon class="h-5 w-5" />
    {:else}
      <!-- Dark -> icono landmark -->
      <Landmark class="h-5 w-5" />
    {/if}
  </button>
</div>
