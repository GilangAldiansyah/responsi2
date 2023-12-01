<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$pesan = [];

// Ambil dan trim username dan password
$username = trim($data['username']);
$password = md5(trim($data['password']));

// Gunakan parameterized query untuk melindungi dari SQL injection
$query = mysqli_prepare($koneksi, "SELECT * FROM user WHERE username = ? AND password = ?");
mysqli_stmt_bind_param($query, "ss", $username, $password);
mysqli_stmt_execute($query);

// Periksa hasil query dan tangani kesalahan
$result = mysqli_stmt_get_result($query);

if ($result) {
    $jumlah = mysqli_num_rows($result);
    if ($jumlah != 0) {
        $value = mysqli_fetch_object($result);

        // Buat token yang lebih aman
        $token = password_hash(time() . '_' . $value->password, PASSWORD_BCRYPT);

        $pesan['username'] = $value->username;
        $pesan['token'] = $token;
        $pesan['status_login'] = 'berhasil';
    } else {
        $pesan['status_login'] = 'gagal';
    }
} else {
    $pesan['status_login'] = 'gagal';
    $pesan['error'] = mysqli_error($koneksi);
}

echo json_encode($pesan);

// Tutup koneksi
mysqli_close($koneksi);
?>
