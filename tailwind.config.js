/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: '#3b82f6', // blue-600
        vibes: {
          'chill': {
            border: '#facc15', // yellow-400
            text: '#854d0e'    // yellow-800
          },
          'silly': {
            border: '#4ade80', // green-400
            text: '#166534'    // green-800
          },
          'sweaty': {
            border: '#f87171', // red-400
            text: '#991b1b'    // red-800
          },
          'talky': {
            border: '#60a5fa', // blue-400
            text: '#1e40af'    // blue-800
          },
          'spontaneous': {
            border: '#c084fc', // purple-400
            text: '#6b21a8'    // purple-800
          }
        },
      },
    },
  },
  plugins: [],
}
