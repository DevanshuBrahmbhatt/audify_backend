module.exports = {

	/**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     * pm2 deploy ecosystem.config.js production setup
     * pm2 deploy ecosystem.config.js production update
     * pm2 deploy production update
     * pm2 deploy production exec "pm2 restart all"
     */

	apps: [
		{
			name: 'Audify API',
			exec_mode: 'fork',
			script: 'app.js',
			instances: 1,
			autorestart: true,
			restart_delay: 3000,
			watch: false,
			max_memory_restart: '256M',
			env: {
				NODE_ENV: 'development'
			}
		}
	],

	/**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
	deploy: {
		production: {
			name: 'Audify API',
			user: 'ubuntu',
			host: '35.183.77.97',
			ref: 'origin/development',
			repo: 'git@github.com:DevanshuBrahmbhatt/audify_backend.git',
			ssh_options: 'StrictHostKeyChecking=no',
			path: '/home/ubuntu/workspace/audify_backend',
			'post-deploy': '/home/ubuntu/.nvm/versions/node/v12.16.1/bin/npm ci && /usr/local/bin/pm2 startOrRestart ecosystem.config.js --only Portfolio',
			env: {
				NODE_ENV: 'development'
			}
		}
	}
};