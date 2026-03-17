# CarMarket Frontend

CarMarket uygulamasının Angular tabanlı frontend’i. JWT ile giriş yapar; araç/marka listeleme, araç detayları, araç ekleme-güncelleme ve sepet (drawer) gibi temel ekranları içerir.

## Teknolojiler

- **Angular 17** (Angular CLI `17.3.17`)
- **Angular Material** (örn. `MatDrawer` ile sepet)
- **Bootstrap 5**
- **RxJS**
- **jwt-decode** (token çözümleme)

## Özellikler

- **Auth**
  - Login ekranı
  - JWT token’ı `localStorage`’a kaydeder (`auth_token`)
  - Kullanıcı rolünü `localStorage`’a kaydeder (`user_role`: `admin` / `user`)
- **Araçlar**
  - Araç listeleme
  - Araç detay
  - Araç ekleme / güncelleme
  - Silme
  - Foto ile araç oluşturma (FormData endpoint’i mevcut)
- **Markalar**
  - Marka listeleme
  - Ekleme / silme / güncelleme
- **Sepet**
  - Sağdan açılır sepet drawer’ı
  - Toplam tutar (TRY)

## Gereksinimler

- **Node.js** (LTS önerilir)
- **Angular CLI** (opsiyonel; projede `npm scripts` ile de çalışır)
- Çalışan bir backend API (aşağıya bakın)

## Kurulum ve Çalıştırma(Server post 4160 olarak)

```bash
npm install
npm run build
npm start
