<?php
if( ! empty($_POST) ){

$data = (object) $_POST;
// Ваш ключ доступа к API (из Личного Кабинета)
$api_key = "***";
// Данные о новом контакте
$user_email = $data->email;
$user_name = urlencode("$data->name");
$user_lists = "16094605";
$user_tag = urlencode("Added using API");
// Создаём GET-запрос
$api_url = "https://api.unisender.com/ru/api/subscribe?format=json".
           "&api_key=$api_key&list_ids=$user_lists".
           "&fields[email]=$user_email&fields[Name]=$user_name".
           "&tags=$user_tag&double_optin=3";
// Делаем запрос на API-сервер
$result = file_get_contents($api_url);
if ($result) {
  // Раскодируем ответ API-сервера
  $jsonObj = json_decode($result);
  if(null===$jsonObj) {
    // Ошибка в полученном ответе
    echo "Invalid JSON";
  }
  elseif(!empty($jsonObj->error)) {
    // Ошибка добавления пользователя
    echo "An error occured: " . $jsonObj->error . "(code: " . $jsonObj->code . ")";
  } else {
    // Новый пользователь успешно добавлен
    echo "Added. ID is " . $jsonObj->result->person_id;
  }
} else {
  // Ошибка соединения с API-сервером
  echo "API access error";
}
}

?>