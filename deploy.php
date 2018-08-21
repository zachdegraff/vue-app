<?php
namespace Deployer;
require 'recipe/common.php';
set('git_tty', false);
set('ssh_type', 'native');
set('ssh_multiplexing', false);
set('application', 'app');
set('repository', 'git@github.com:jeffstern/wonderus-app.git');
add('shared_files', ['dist/spa-mat/.htaccess']);
add('shared_dirs', []);
add('writable_dirs', []);// Hosts
set('default_stage', 'dev');
host('dev')
    ->hostname('ec2-18-220-139-147.us-east-2.compute.amazonaws.com')
    ->identityFile('~/.ssh/WonderusAWS.pem')
    ->user('ubuntu')
    ->set('branch', 'dev')
    ->set('deploy_path', '/var/www/development/{{application}}')
    ->set('stage_var', 'APP_STAGE=test');
host('prod')
    ->hostname('ec2-18-220-139-147.us-east-2.compute.amazonaws.com')
    ->identityFile('~/.ssh/WonderusAWS.pem')
    ->user('ubuntu')
    ->set('branch', 'master')
    ->set('deploy_path', '/var/www/wonderus/{{application}}')
    ->set('stage_var', 'APP_STAGE=prod');
task('quasar:build', function () {
    run('cd {{release_path}} && {{stage_var}} quasar build');
});
task('npm:install', function () {
    run('cd {{release_path}} && npm install');
});
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'npm:install',
    'quasar:build',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
]);
// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');