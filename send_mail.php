<<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    echo json_encode(['success' => false, 'message' => 'Fyll i alla fält.']); // "Заполните все поля."
    exit;
}

$name = htmlspecialchars($data['name']);
$email = htmlspecialchars($data['email']);
$message = htmlspecialchars($data['message']);

$to = "info@diasvision.se"; // Замените на ваш email
$subject = "Meddelande från din webbplats";
$body = "Namn: $name\nE-post: $email\nMeddelande:\n$message";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Tack! Ditt meddelande har skickats.']); // "Ваше сообщение отправлено."
} else {
    echo json_encode(['success' => false, 'message' => 'Ett fel inträffade vid meddelandets avsändning.']); // "Произошла ошибка при отправке сообщения."
}
?>