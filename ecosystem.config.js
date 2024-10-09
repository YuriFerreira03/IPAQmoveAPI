module.exports = {
    apps: [
      {
        name: 'IPAQmoveAPI',
        script: './dist/index.js', // arquivo de saída gerado pelo TypeScript
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  