<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Включаем отладку
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Читаем JSON из запроса
$data = json_decode(file_get_contents('php://input'), true);

// Проверяем, что все поля заполнены
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    echo json_encode(["success" => false, "message" => "Fyll i alla fält."]);
    exit;
}

$name = htmlspecialchars($data['name']);
$email = htmlspecialchars($data['email']);
$message = htmlspecialchars($data['message']);

$mail = new PHPMailer(true);

try {
    // Настройки SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Если используешь Gmail
    $mail->SMTPAuth = true;
    $mail->Username = 'info@diasvision.se'; // Твой email
    $mail->Password = 'apple12345?'; // Пароль приложения
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // От кого и кому
    $mail->setFrom($email, $name);
    $mail->addAddress('info@diasvision.se'); // Заменить на твой email

    // Тема письма
    $mail->Subject = 'Meddelande från din webbplats';
    $mail->Body = "Namn: $name\nE-post: $email\nMeddelande:\n$message";

    // Отправка
    $mail->send();
    echo json_encode(["success" => true, "message" => "Meddelandet har skickats."]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Fel vid skickande av meddelandet: {$mail->ErrorInfo}"]);
}
?>