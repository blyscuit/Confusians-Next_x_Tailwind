module.exports = {
  theme: {
    extend: {
    },
    maxHeight: {
           '0': '0',
           '1/4': '25%',
           '1/2': '50%',
           '3/4': '75%',
           'full': '100%',
          }
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    translate: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [],
}
