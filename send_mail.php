<?php
// Устанавливаем заголовки для обработки JSON
header('Content-Type: application/json');

// Получаем данные из запроса
$data = json_decode(file_get_contents('php://input'), true);

// Проверяем наличие всех полей
if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    echo json_encode(['success' => false, 'message' => 'Заполните все поля.']);
    exit;
}

$name = htmlspecialchars($data['name']);
$email = htmlspecialchars($data['email']);
$message = htmlspecialchars($data['message']);

// Ваш email, на который будут отправляться сообщения
$to = "avdoiand@gmail.com"; // Замените на ваш реальный адрес
$subject = "Сообщение с вашего сайта";
$body = "Имя: $name\nE-mail: $email\nСообщение:\n$message";

// Заголовки для отправки письма
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

// Отправка письма
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Сообщение отправлено.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки сообщения.']);
}
?>