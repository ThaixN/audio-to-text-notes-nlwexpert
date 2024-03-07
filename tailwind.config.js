/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // coloca quais elementos da html podem ser tailwind (conter classes)
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
        // se não for possivel colocar a inter, troca por sans serif.
      }
    }
  },
  plugins: [],
}

