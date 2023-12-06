import tailwindConfig from './tailwind.config';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

module.exports = {
  plugins: [
    tailwindcss(tailwindConfig),
    autoprefixer,
  ]
}