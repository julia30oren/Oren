module.exports = {
    apps: [
      {
        name: 'server',
        script: 'npm',
        args: 'run server',
        cwd: './', // Run from the main project root
        watch: ['./index.js'], // Optional: watches server file for changes
      },
      {
        name: 'client',
        script: 'ng',
        args: 'serve',
        cwd: '../client', // Specify the client directory directly
        watch: false, // Set to false as watching Angular files via PM2 is generally unnecessary
      },
    ],
  };