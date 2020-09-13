<?php
$_POST = json_decode(file_get_contents('php://input'), true);

// Загружаем данные из файла в строку
$string = file_get_contents('mat_words.json');

// Превращаем строку в объект
$data = json_decode($string, TRUE);



if ($_POST['mat'] && $_POST['mat'] != '') {
	$arr = array('mat' => $_POST['mat']);
	file_put_contents('mat_words.json', json_encode($arr, JSON_UNESCAPED_UNICODE));
	$stringnew = file_get_contents('mat_words.json');
	$datanew = json_decode($stringnew, TRUE);
    echo json_encode($datanew, JSON_UNESCAPED_UNICODE);
} else {
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
}

?>