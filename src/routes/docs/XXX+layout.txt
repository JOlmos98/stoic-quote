<!-- src/routes/notes/+layout.svelte -->
<script lang="ts">
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
  import { goto } from '$app/navigation';

  type SidebarLink = { label: string; url: string };

  const links: SidebarLink[] = [
    { label: 'StoicQuote', url: '/' },
    { label: 'Docs', url: '/docs' },
    { label: 'FAQs', url: '/docs/faqs' },
    { label: 'The great stoics', url: 'https://en.wikipedia.org/wiki/Stoicism' },
    { label: 'How to be stoic', url: '/docs/faqs' },
    { label: 'Key words', url: '/docs/faqs' },
    { label: 'Donation', url: 'https://en.wikipedia.org/wiki/Stoicism' },
    { label: 'This proyect', url: 'https://github.com/JOlmos98/stoic-quote' },
    { label: 'J. Olmos', url: 'https://portfolio-4mh1rt9a0-jesus-projects-8116cd3a.vercel.app/en' }
  ];

  const handleClick = (url: string) => {
    goto(url);
  };
</script>

<div class="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
  <!-- Barra superior fija -->
  <header
    class="sticky top-0 z-40 border-b border-[var(--lines)]/30
           bg-[var(--bg)]/90 backdrop-blur"
  >
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
      <button
        type="button"
        class="text-lg font-semibold tracking-wide hover:text-[var(--accent)]"
        on:click={() => handleClick('/')}
      >
        StoicQuote
      </button>

      <ThemeSwitcher />
    </div>
  </header>

  <!-- Contenido principal con sidebar -->
  <div class="mx-auto flex max-w-5xl gap-8 px-4 py-8 md:px-6">
    <!-- SIDEBAR -->
    <aside
      class="sticky top-20 hidden h-fit w-52 flex-col gap-2
             border border-[var(--lines)]/20 bg-[var(--bg)]/80
             px-3 py-4 text-sm shadow-sm md:flex"
    >
      <!-- <p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
        Navegación
      </p> -->

{#each links as link}
  <a
    href={link.url}
    class="mb-1 flex w-full cursor-pointer items-center justify-between rounded-md px-3
           py-2 text-left font-medium
           text-[var(--fg)] transition-colors hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
    rel={link.url.startsWith('http') ? 'noreferrer noopener' : undefined}
    target={link.url.startsWith('http') ? '_blank' : undefined}
  >
    <span>{link.label}</span>
  </a>
{/each}

    </aside>

    <!-- CONTENIDO mdsvex -->
    <main class="flex-1">
      <article
        class="prose max-w-none
               prose-headings:font-semibold
               prose-headings:text-[var(--fg)]
               prose-p:text-[var(--fg)]
               prose-a:text-[var(--accent)]
               prose-a:no-underline
               hover:prose-a:underline
               prose-blockquote:border-l-[3px]
               prose-blockquote:border-[var(--accent)]
               prose-blockquote:text-[var(--fg)]
               prose-strong:text-[var(--fg)]
               prose-em:text-[var(--fg)]
               prose-code:rounded
               prose-code:bg-[color-mix(in_srgb,var(--bg)_85%,var(--fg)_15%)]
               prose-code:px-1.5 prose-code:py-0.5
               prose-code:text-[var(--fg)]
               prose-li:marker:text-[var(--accent)]
               prose-table:text-sm
               prose-thead:border-b-[1px]
               prose-thead:border-[var(--muted)]/40
               prose-th:text-[var(--fg)]
               prose-hr:border-[var(--muted)]/40"
      >
        <slot />
      </article>
    </main>
  </div>
</div>
