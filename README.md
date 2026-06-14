# คู่มือการพัฒนาและ Deploy เว็บไซต์เรียนรู้ JavaScript & VS Code

เว็บไซต์นี้พัฒนาด้วยเฟรมเวิร์ก **MkDocs** และใช้ธีม **Material for MkDocs**

---

## 🛠️ การเตรียมเครื่องก่อนเริ่มงาน (Prerequisites)

หากย้ายเครื่องคอมพิวเตอร์หรือยังไม่มีเครื่องมือ ให้ติดตั้ง Python และรันคำสั่งเพื่อติดตั้ง library ที่จำเป็น:
```cmd
pip install -r requirements.txt
```

---

## 💻 การเปิดหน้าเว็บทดสอบในเครื่องตัวเอง (Local Development)

เมื่อทำการเพิ่มหรือแก้ไขไฟล์บทเรียนต่าง ๆ ภายในโฟลเดอร์ `docs/` คุณสามารถเปิดดูผลลัพธ์แบบ Real-time บนเครื่องตัวเองก่อนอัปโหลดขึ้นจริงได้โดย:

1. รันคำสั่งนี้ใน Command Prompt:
   ```cmd
   python -m mkdocs serve
   ```
2. เปิดเว็บเบราว์เซอร์ไปที่ลิงก์: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🚀 ขั้นตอนการ Deploy เมื่อมีการอัปเดตเนื้อหา (Deploy Process)

เมื่อต้องการนำเนื้อหาใหม่ที่แก้ไขเสร็จแล้วอัปเดตขึ้นเว็บไซต์จริง (GitHub Pages) ให้ใช้ขั้นตอนต่อไปนี้ใน **Command Prompt (cmd)**:

```cmd
:: 1. สั่ง Build หน้าเว็บเวอร์ชันล่าสุด
python -m mkdocs build

:: 2. ดึงโค้ดฝั่งเว็บออนไลน์ลงมาในโฟลเดอร์ชั่วคราว
git clone --branch gh-pages https://github.com/Nattawoot4411/knowledge_base.git temp-deploy

:: 3. สร้างโฟลเดอร์ปลายทาง javaScript และย้ายไฟล์ที่ build เข้าไปข้างใน
mkdir temp-deploy\javaScript
xcopy /E /I /Y site temp-deploy\javaScript

:: 4. ทำการบันทึกการแก้ไขและอัปโหลดขึ้น GitHub
cd temp-deploy
git add javaScript
git commit -m "Update content and deploy"
git push origin gh-pages

:: 5. สลับโฟลเดอร์กลับมาข้างนอกเพื่อลบไฟล์ชั่วคราวทิ้ง
cd ..
rmdir /S /Q temp-deploy
```

หลังรันเสร็จสิ้น เว็บไซต์เวอร์ชันใหม่จะพร้อมใช้งานที่:
👉 **[https://nattawoot4411.github.io/knowledge_base/javaScript/](https://nattawoot4411.github.io/knowledge_base/javaScript/)**
