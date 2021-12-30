
  
  module.exports = {
    env: {
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
      GOOGLE_ANALYTIC_KEY: process.env.GOOGLE_ANALYTIC_KEY
    },
    i18n: {
      // These are all the locales you want to support in
      // your application
      locales: ['en-US'],
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: 'en-US',
    },
  }
  