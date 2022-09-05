const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

// swaggerAutogen(outputFile, endpointsFiles)

swaggerAutogen(outputFile, endpointsFiles).then(async () => {
   await import('./index.js'); // Your project's root file
});