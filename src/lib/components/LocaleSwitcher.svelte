<!-- src/lib/components/LanguageSwitcher.svelte -->
<script lang="ts">
  import { setLocale, getLocale } from '$lib/paraglide/runtime';
  import { Languages } from 'lucide-svelte';

  type Locale = 'en' | 'es';

  let locale = getLocale() as Locale;

  const toggleLocale = () => {
    const next: Locale = locale === 'es' ? 'en' : 'es';
    setLocale(next);
    locale = next;
  };

  $: ariaLabel = locale === 'es' ? 'Switch language (current: ES)' : 'Cambiar idioma (actual: EN)';
  $: label = locale.toUpperCase();
</script>

<div class="fixed top-4 left-[48%] md:left-1/2 z-50 ml-8 -translate-x-1/2">
  <button
    type="button"
    on:click={toggleLocale}
    class="flex h-10 w-10 items-center justify-center text-[var(--fg)] transition hover:scale-105"
    aria-label={ariaLabel}
  >
    <Languages class="h-5 w-5" />
  </button>
</div>
