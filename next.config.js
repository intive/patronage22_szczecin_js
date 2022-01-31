const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  pageExtensions: ['page.js'],
  experimental: {
    styledComponents: true
  },
  publicRuntimeConfig: {
    branchName: process.env.VERCEL_GIT_COMMIT_REF
  }
}
