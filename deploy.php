<?php
namespace Deployer;

require 'recipe/common.php';

// Project name
set('application', 'app');

// Project repository
set('repository', 'git@github.com:jeffstern/wonderus-app.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true); 

// Shared files/dirs between deploys 
add('shared_files', ['dist/spa-mat/.htaccess']);
add('shared_dirs', []);

// Writable dirs by web server 
add('writable_dirs', []);

// Hosts
set('deploy_path', '/var/www/wonderus/{{application}}');

host('ec2-18-222-87-169.us-east-2.compute.amazonaws.com')
    ->user('ubuntu')
    ->identityFile('~/.ssh/wonderus.pem');


set('ssh_type', 'native');
set('ssh_multiplexing', true);

// Tasks

task('quasar:build', function () {
    run('cd {{release_path}} && quasar build');
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

