# g5prepare


โปรเจคมี 2page
users dashboard(เสร็จเเล้ว)
Document (optional) (ยังไม่เสร็จ)
----------------------------
ขอบเขตการทำงาน
users dashboard -สามารถ add edit delete ผู้ใช้
                -sort search
Document -ดูข้อมูล documents
------------------------
โดยโปรเจค ใช้ 
- 🖥️ **Frontend**: Angular 19.2.1
- 🔧 **Backend**: ASP.NET Core Web API (.NET 9.0.201)

โครงสร้าง angular 
src/
└── app/
    ├── components/              
    │   ├── add-user-modal/      # modal สำหรับเพิ่มผู้ใช้
    │   ├── doc-table/           # ตารางเอกสาร (Document Table)
    │   ├── doctoolbar/          # toolbar สำหรับหน้าจัดการเอกสาร
    │   ├── edit-user/           # modal แก้ไขผู้ใช้
    │   ├── header/              # header
    │   ├── sidebar/             # เมนูด้านข้าง
    │   ├── toolbar/             # toolbar หน้าusers dashboard
    │   └── user-table/          # ตารางผู้ใช้งาน
    │
    ├── models/                  # 🔹 interface user 
    │   └── user.model.ts
    │
    ├── pages/                   # 🔹 Route-based pages
    │   ├── dashboard/           # หน้า Dashboard หลัก
    │   └── documents/           # หน้า Document Management
    │
    ├── services/               
    │   ├── user.service.ts         #เรียกapi
    │   ├── user.service.spec.ts
    │   ├── sort-search.service.ts  #sort 
    │   └── sort-search.service.spec.ts


    backend/
├── Controllers/                 # 🌐 API endpoint สำหรับ frontend เรียกใช้
│   ├── HelloController.cs                  #ทดสอบ dependencies inversion
│   ├── NotificationController.cs            #ทดสอบ dependencies inversion
│   ├── PermissionController.cs                
│   ├── RoleController.cs
│   └── UserController.cs
│
├── Data/                        # 🗃️ การเชื่อมต่อกับฐานข้อมูล
│   └── AppDbContext.cs          # DbContext หลักของโปรเจกต์
│
├── DTOs/                        # 📦 Data Transfer Object (ใช้รับ/ส่งข้อมูลระหว่าง API ↔ Frontend)
│   ├── AddNewUserDTO.cs
│   ├── DeleteUserDTO.cs
│   ├── EditUserDTO.cs
│   ├── GetAllPermissionDTO.cs
│   ├── GetAllRoleDTO.cs
│   ├── GetAllUserDTO.cs
│   └── GetUserByIdDTO.cs
│
├── Extensions/
│   └── ServiceExtensions.cs     #  รวมservice ไปregistration ทีเดียว
│
├── Models/                      # 📄 Entity Model ที่แมพกับตาราง DB
│   ├── Notification.cs
│   ├── Permissions.cs
│   ├── Roles.cs
│   ├── User.cs
│   └── UserPermissions.cs
│
├── Services/                    # ⚙️ บริการสำหรับ logic ธุรกิจ (เรียกจาก Controller)  I___Service  คือinterface ที่ต่อcontroller กับ service
│   ├── EmailService.cs
│   ├── HelloService.cs
│   ├── IMessageService.cs
│   ├── IPermissionService.cs
│   ├── IRoleService.cs              
│   ├── IUserService.cs
│   ├── NotificationService.cs
│   ├── PermissionService.cs
│   ├── RoleService.cs
│   └── UserService.cs
│
├── Properties/
│   └── launchSettings.json
├── .gitignore
└── backend.csproj
วิธีการรัน 
1.clone   https://github.com/peerathud/g5prepare.git 
  ติดตั้ง database/initial.sql  เป็นscript databaseพร้อมข้อมูลทดสอบ
2.cd frontend   
3.npm install 
4.cd backend 
5.dotnet restore
6.dotnet run


