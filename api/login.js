export default function handler(req, res) {
    // Pastikan ini adalah permintaan pengiriman data (POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Mengambil ketikan email dan pin dari halaman depan (HTML)
    const { email, pin } = req.body;

    // MENGAMBIL KUNCI RAHASIA DARI VERCEL ENVIRONMENT VARIABLES (.env)
    // Jika tidak diatur di Vercel, maka akan menggunakan default di sebelah kanan
    const adminEmail = process.env.LOGIN_EMAIL || "kepsek@tk.com";
    const adminPin = process.env.LOGIN_PIN || "123456";

    // Pengecekan Keamanan Tertutup (Tidak terlihat di browser)
    if (email === adminEmail && pin === adminPin) {
        // Jika COCOK, berikan izin masuk
        res.status(200).json({
            success: true,
            user: { 
                nama: "Kepala Sekolah", 
                jabatan: "Akses Penuh" 
            }
        });
    } else {
        // Jika SALAH, tolak akses
        res.status(401).json({ 
            success: false, 
            message: "Email atau PIN salah!" 
        });
    }
}
