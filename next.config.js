const path = require('path')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
    },
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
    // images: {
    //     loader: 'imgix',
    //     path: '',
    // },
    trailingSlash: true,
})
