<?php
require_once 'vendor/autoload.php';

use Dimsh\React\Filesystem\Monitor\Monitor;
use Dimsh\React\Filesystem\Monitor\MonitorConfigurator;

$monitor = new Monitor(MonitorConfigurator::factory()
    ->setBaseDirectory('/app/app')
    ->setLevel(0)
    ->setFilesToMonitor([
        '*.php','*.twig'
    ]));
$monitor
    ->on(Monitor::EV_CREATE, function ($path, $monitor) {
        echo exec('./spiral  http:reset');
        echo "created:   $path\n";
    })
    ->on(Monitor::EV_MODIFY, function ($path, $monitor) {
        echo exec('./spiral  http:reset');
        echo "modified:  $path\n";
    })
    ->on(Monitor::EV_DELETE, function ($path, $monitor) {
        echo exec('./spiral http:reset');
        echo "deleted:   $path\n";
    })
    ->run();