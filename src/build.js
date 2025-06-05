const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['lambda.ts'],
    bundle: true,
    platform: 'node',
    target: 'node18',
    outfile: 'dist/index.js',
    external: ['aws-sdk'],
})
