// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'stoic' | 'light' | 'dark';

// 1) Leemos el tema almacenado SÓLO en el cliente
const getInitialTheme = (): Theme => {
  if (!browser) return 'stoic';                                // En SSR siempre devolvemos "stoic"
  const stored = localStorage.getItem('theme');                // Miramos si el usuario ya eligió tema
  if (stored === 'light' || stored === 'dark' || stored === 'stoic') {
    return stored;
  }
  return 'stoic';                                              // Si no hay nada válido, usamos "stoic"
};

export const theme = writable<Theme>(getInitialTheme());       // Creamos el store con el tema inicial

// 2) Cuando cambie el theme, actualizamos <html data-theme="..."> y localStorage
if (browser) {
  theme.subscribe((value) => {
    document.documentElement.dataset.theme = value;            // <html data-theme="stoic|light|dark">
    localStorage.setItem('theme', value);                      // Persistimos la elección del usuario
  });
}
