# LiveChat APP

## 📌 About Project
Livechat application is a real-time communication application designed to facilitate interaction between users. This system allows users to chat directly, either individually or in groups, to support collaboration, discussions, and customer service needs.

## ✨ Core Feature
- **User Management**: Registration, authentication, and user roles (admin, mentor, participant).
- **Authentication & User Management**: Login, registrasi, dan manajemen profil pengguna.
- **1-on-1 Chat**: Kirim dan terima pesan secara langsung dengan pengguna lain.
- **Group Chat**: Buat grup diskusi dengan banyak anggota.
- **Realtime Messaging**: Pesan dikirim dan diterima secara instan menggunakan WebSocket/Socket.IO.
- **Read Receipts**: Tandai pesan sudah dibaca atau belum.
- **Online Status**: Tampilkan status online/offline pengguna.
- **File Sharing (optional)**: Kirim gambar atau dokumen melalui chat.
- **Notifications**: Notifikasi real-time untuk pesan baru.

## 🛠️ Tech Stack
React Vite, Typescript, Tailwind CSS

## 📂 Project Structure
```
📦 learning-management-system📦 livechat-app
├── 📁 src
│   ├── 📁 core
│   │   ├── 📁 models
│   │   ├── 📁 service
│   │   ├── 📁 config
│   ├── 📁 entries
│   │   ├── 📄 app.tsx
│   │   ├── 📄 index.css
│   ├── 📁 feature
│   │   ├── 📁 components
│   │   │   ├── ⚛ ChatBox.tsx
│   │   │   ├── ⚛ MessageBubble.tsx
│   │   ├── 📁 hooks
│   │   │   ├── ⚛ useChat.ts
│   │   ├── 📁 views
│   │   │   ├── ⚛ ChatRoomView.tsx
├── 📄 index.html
├── 📄 README.md

```

## 🚀 How to run?
### Requirement
- Node.js & npm/yarn

### Step by step
#### 1️⃣ Clone Repository
```bash
git clone https://github.com/LitbangHimtiUMT/learning-management-system.git
cd learning-management-system
```

#### 3️⃣ Setup Environment
```bash
touch .env
# Edit file .env sesuai konfigurasi API backend

# Install dependency
yarn install

# Jalankan aplikasi
yarn dev
```

## 🤝 Contributions
We welcome contributions from anyone! Please feel free to fork this repository, create new branches, and submit pull requests.

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---
🚀 Built with ❤️ by **[Litbang/HIMTI-UMT]**

