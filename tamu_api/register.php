<?php
require 'koneksi.php';

$pesan = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $username = trim($data['username']);
    $password = password_hash(trim($data['password']), PASSWORD_BCRYPT); // Hash kata sandi untuk keamanan

    $query = "INSERT INTO user (username, password) VALUES (?, ?)";
    $stmt = mysqli_prepare($koneksi, $query);
    mysqli_stmt_bind_param($stmt, "ss", $username, $password);

    if (mysqli_stmt_execute($stmt)) {
        $pesan['status'] = 'berhasil';
        $pesan['message'] = 'Registrasi berhasil.';
    } else {
        $pesan['status'] = 'gagal';
        $pesan['message'] = 'Registrasi gagal: ' . mysqli_error($koneksi);
    }

    mysqli_stmt_close($stmt);
} else {
    $pesan['status'] = 'gagal';
    $pesan['message'] = 'Metode HTTP tidak valid.';
}

echo json_encode($pesan);

mysqli_close($koneksi);
?>
