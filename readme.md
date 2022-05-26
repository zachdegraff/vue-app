# Quasar App

## Install
nvm use  8.9.0
yarn install
yarn quasar dev

## Deploys
We use https://deployer.org/
You have to have the right pem files in your ~/.ssh files. Look at the deploy.php file to see those.

### Deploy Dev
dep --file=deploy.php deploy dev

### Deploy Prod
dep --file=deploy.php deploy dev

