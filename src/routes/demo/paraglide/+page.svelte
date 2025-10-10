<script lang="ts">
  import { setLocale } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages.js';
  import { getLocale } from '$lib/paraglide/runtime';

  const locale = getLocale();
  const localeOn: string = 'rounded-md bg-green-600 px-4 py-2 m-5 text-white transition duration-150 hover:bg-green-700 cursor-pointer';
  const localeOff: string = 'rounded-md bg-blue-600 px-4 py-2 m-5 text-white transition duration-150 hover:bg-blue-700 cursor-pointer';
</script>

<div class="flex max-h-screen max-w-screen flex-col items-center justify-center bg-amber-100 p-8">
  <h1>{m.hello_world({ name: 'SvelteKit User' })}</h1>
  <div>
    <button
      class={locale === 'en' ? localeOn : localeOff}
      onclick={() => setLocale('en')}
    >
      EN
    </button>
    <button
      class={locale === 'es' ? localeOn : localeOff}
      onclick={() => setLocale('es')}
    >
      ES
    </button>
    <button
      class={locale === 'de' ? localeOn : localeOff}
      onclick={() => setLocale('de')}
    >
      DE
    </button>
  </div>
  <p class="text-2xl">{m.example_text()}</p>
  <p>
    If you use VSCode, install the <a
      href="https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension"
      target="_blank"
    >
      Sherlock i18n extension
    </a>
    for a better i18n experience.
  </p>
</div>
