// The configuration is referred to
// https://pm2.keymetrics.io/docs/tutorials/capistrano-like-deployments
module.exports = {
  apps: [
    {
      name: 'pingcap.github.io-migration',

      // Provide the relative address otherwise PM2 cannot identify the next command
      script: 'node_modules/.bin/http-server',
      args: './dist -p 9900 -a 127.0.0.1 -d false -i false',

      // `cwd` is used for resolving a symlink related issue mentioned below:
      // https://pm2.keymetrics.io/docs/tutorials/capistrano-like-deployments#the-main-issue
      // Otherwise, PM2 will readlink first and break the server reload.
      cwd: process.env.PWD,
      instances: 2,
      exec_mode: 'cluster',
    },
  ],
}
