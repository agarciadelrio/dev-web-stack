<?php
set_time_limit(0);
ini_set('memory_limit', '4096M');
ini_set('max_execution_time', 0);
if(file_exists(__DIR__ . '/public_html' . $_SERVER['SCRIPT_NAME'])) return false;
require './public_html/index.php';