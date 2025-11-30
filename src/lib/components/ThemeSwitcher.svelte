<script lang="ts">
  import { createSelect, melt } from '@melt-ui/svelte';
  import { theme, type Theme } from '$lib/stores/theme';

  type ThemeOption = { value: Theme; label: string };

  const options: ThemeOption[] = [
    { value: 'stoic', label: 'Stoic' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ];

  const {
    elements: { trigger, menu, option },
    states: { selectedLabel, open }
  } = createSelect();

  const setTheme = (value: Theme) => {
    theme.set(value); // Actualiza store -> html[data-theme] + localStorage
  };
</script>

<!-- Contenedor fijo arriba, centrado -->
<div class="fixed left-1/2 top-4 z-50 -translate-x-1/2">
  <!-- Trigger del select: botón con icono de sol -->
  <button
    type="button"
    use:melt={$trigger}
    class="flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--bg)] px-3 py-2 text-xs font-medium text-[var(--fg)] shadow-lg transition hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
    aria-label="Cambiar tema"
  >
    <!-- Icono de sol -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </svg>

    <!-- Texto del tema seleccionado (o 'Stoic' por defecto) -->
    <span class="hidden sm:inline">
      {$selectedLabel || 'Stoic'}
    </span>
  </button>

  <!-- Menú del select -->
  {#if $open}
    <div
      use:melt={$menu}
      class="mt-2 w-32 overflow-hidden rounded-xl border border-white/10 bg-[var(--bg)]/95 text-sm text-[var(--fg)] shadow-xl backdrop-blur"
    >
      {#each options as opt}
        <button
          type="button"
          use:melt={$option(opt)}
          class="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-[var(--accent)]/15"
          on:m-click={() => setTheme(opt.value)}  
        >
          <span>{opt.label}</span>

          {#if opt.value === 'stoic'}
            <span class="text-[var(--accent)] text-xs">★</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>



<!-- <script lang="ts">
  import { theme, type Theme } from '$lib/stores/theme';

  const setTheme = (value: Theme) => {
    theme.set(value);                                  // Actualiza store -> html[data-theme] + localStorage
  };
</script>

<div class="flex fixed justify-center items-center top-4 gap-2 rounded-full bg-black/40 px-3 py-2 text-xl text-[var(--fg)] backdrop-blur">
  <button
    class="rounded-full px-2 py-1 hover:text-[var(--accent)] cursor-pointer"
    on:click={() => setTheme('stoic')}
  >
    Stoic
  </button>
  <button
    class="rounded-full px-2 py-1 hover:text-[var(--accent)] cursor-pointer"
    on:click={() => setTheme('light')}
  >
    Light
  </button>
  <button
    class="rounded-full px-2 py-1 hover:text-[var(--accent)] cursor-pointer"
    on:click={() => setTheme('dark')}
  >
    Dark
  </button>
</div> -->
