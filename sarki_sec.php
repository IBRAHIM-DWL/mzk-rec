<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "mysql22";
$dbname = "sarki_secim";

$baglantiMysSql = new mysqli($servername, $username, $password, $dbname);

if ($baglantiMysSql->connect_error) {
    die(json_encode(['error' => "Bağlantı hatası: " . $baglantiMysSql->connect_error]));
}

$data = json_decode(file_get_contents('php://input'), true);
$masa_no = $data['masa_no'];
$sarki_adi = $data['sarki_adi'];

$stmt = $baglantiMysSql->prepare("SELECT COUNT(*) FROM sarkilar WHERE masa_no=? and calindi=0");
$stmt->bind_param("i", $masa_no); 
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();

if($count > 2) {
    $stmt->close();
    $stmt = $baglantiMysSql->prepare("SELECT id FROM sarkilar WHERE masa_no=?");
    $stmt->bind_param("i", $masa_no); 
    $stmt->execute();
    $stmt->bind_result($sira);
    $stmt->fetch();
    $stmt->close();
    $stmt = $baglantiMysSql->prepare("SELECT id FROM sarkilar ORDER BY id ASC");
    $stmt->execute();
    $stmt->bind_result($sirafarki);
    $stmt->fetch();
    $stmt->close();
    $sirafarki = $sira - $sirafarki + 1;
    echo json_encode(['error' => "Sırada bekleyen şarkınız vardır. Sıranız: $sirafarki"]);
} else {
    $stmt->close();
    $stmt = $baglantiMysSql->prepare("INSERT INTO sarkilar (masa_no, sarki_adi) VALUES (?, ?)");
    $stmt->bind_param("ss", $masa_no, $sarki_adi);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => "Hata: " . $stmt->error]);
    }
}

$baglantiMysSql->close();
?>
