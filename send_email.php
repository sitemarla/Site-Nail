<?php
header('Content-Type: text/html; charset=utf-8'); // Garante que o output seja UTF-8 para evitar caracteres estranhos

// Função para depuração - MANTENHA COMENTADA EM PRODUÇÃO!
function debug_log($message) {
    file_put_contents('debug.log', date('Y-m-d H:i:s') . ' - ' . $message . PHP_EOL, FILE_APPEND);
}

// Verifica se a requisição é do tipo POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    debug_log("Requisição POST recebida."); // <-- DESCOMENTE

    // Coleta e sanitiza os dados do formulário
    $name = isset($_POST['name']) ? filter_var($_POST['name'], FILTER_SANITIZE_STRING) : '';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $subject = isset($_POST['subject']) ? filter_var($_POST['subject'], FILTER_SANITIZE_STRING) : '';
    $message = isset($_POST['message']) ? filter_var($_POST['message'], FILTER_SANITIZE_STRING) : '';

    debug_log("Dados coletados: Name={$name}, Email={$email}, Subject={$subject}"); // <-- DESCOMENTE

    // Validação básica
    $errors = [];
    if (empty($name)) {
        $errors[] = "O nome é obrigatório.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "O e-mail é inválido ou obrigatório.";
    }
    if (empty($subject)) {
        $errors[] = "O assunto é obrigatório.";
    }
    if (empty($message)) {
        $errors[] = "A mensagem é obrigatória.";
    }

    if (!empty($errors)) {
        debug_log("Erros de validação: " . implode(", ", $errors)); // <-- DESCOMENTE
        $error_msg = urlencode(implode(" ", $errors));
        header("Location: index.html?status=error&msg={$error_msg}");
        exit;
    }

    // Endereço de e-mail que receberá a mensagem
    $to = "contato@marlasakamoto.art.br"; // CONFIRA ESSE ENDEREÇO
    
    // Assunto do e-mail
    $email_subject = "Novo Contato do Site Marla Sakamoto: " . $subject;

    // Cabeçalhos do e-mail
    $headers = "From: " . $name . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Conteúdo do e-mail em HTML
    $email_content = "
    <html>
    <head>
        <title>Novo Contato - Marla Sakamoto</title>
    </head>
    <body>
        <p><strong>Nome:</strong> {$name}</p>
        <p><strong>E-mail:</strong> {$email}</p>
        <p><strong>Assunto:</strong> {$subject}</p>
        <p><strong>Mensagem:</strong><br>" . nl2br($message) . "</p>
    </body>
    </html>
    ";

    debug_log("Tentando enviar e-mail para: {$to} com assunto: {$email_subject}. Remetente: {$email}"); // <-- DESCOMENTE
    // Tenta enviar o e-mail
    if (mail($to, $email_subject, $email_content, $headers)) {
        debug_log("E-mail enviado com sucesso (função mail() retornou TRUE)."); // <-- DESCOMENTE
        // Sucesso: Redireciona para a página inicial com status de sucesso
        header("Location: index.html?status=success");
    } else {
        debug_log("Falha ao enviar e-mail (função mail() retornou FALSE)."); // <-- DESCOMENTE
        // Falha: Redireciona para a página inicial com status de erro
        header("Location: index.html?status=error&msg=Erro%20ao%20enviar%20mensagem.%20Por%20favor,%20tente%20novamente%20mais%20tarde%20ou%20use%20o%20WhatsApp.");
    }
    exit;

} else {
    debug_log("Requisição não é POST. Redirecionando para index.html"); // <-- DESCOMENTE
    // Se não for uma requisição POST, redireciona para a página inicial
    header("Location: index.html");
    exit;
}
?>