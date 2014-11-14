<?php
/**
 * Created by PhpStorm.
 * User: Toni
 * Date: 2.11.2014.
 * Time: 21:47
 */

if(isset($_POST['value']) && isset($_POST['file']) && isset($_POST['type'])){
    $value = $_POST['value'];
    $file = $_POST['file'];
    $type = $_POST['type'];

    echo $value . " " . $file . " " . $type;

    if($type == "write") {
        $fp = fopen("text_files/" . $file, 'w');
        fwrite($fp, $value);
        fclose($fp);
    }

}