# School Management System - TODO List

## Phase 1: إصلاح المشاكل الموجودة ✅
- [x] 1.1 إصلاح Secret Key في auth.middleware.js
- [x] 1.2 تهيئة currentUser في TeacherDashboardComponent
- [x] 1.3 إصلاح Route mismatch (المنافذ)

## Phase 2: تطوير Backend APIs ✅
- [x] 2.1 إنشاء Grade Model (الدرجات والتقييمات)
- [x] 2.2 إنشاء Assignment Model (ربط Students بـ Courses)
- [x] 2.3 إنشاء Grade Controller
- [x] 2.4 إنشاء Assignment Controller
- [x] 2.5 إنشاء Grade Routes
- [x] 2.6 إنشاء Assignment Routes

## Phase 3: Angular Services ✅
- [x] 3.1 إنشاء grade.service.ts
- [x] 3.2 إنشاء assignment.service.ts
- [x] 3.3 إنشاء admin.service.ts
- [x] 3.4 تحديث student.service.ts

## Phase 4: Angular Components ✅
- [x] 4.1 إنشاء student-dashboard component (TS + HTML)
- [x] 4.2 إنشاء parent-dashboard component (TS + HTML)
- [x] 4.3 إنشاء admin-dashboard component
- [x] 4.4 إنشاء search-teachers component
- [x] 4.5 إنشاء grade component

## Phase 5: Backend APIs - Admin & Users ✅
- [x] 5.1 إنشاء Admin Controller
- [x] 5.2 إنشاء Admin Routes
- [x] 5.3 إنشاء Student Controller
- [x] 5.4 إنشاء Teacher Controller (محدث + getAllTeachers, getTeacherById, updateTeacher, deleteTeacher)
- [x] 5.5 إنشاء Parent Controller
- [x] 5.6 إنشاء Parent Routes

## Phase 6: إكمال الـ Routes ✅
- [x] 6.1 إكمال courses.routes.js (إضافة getCourseById, updateCourse, deleteCourse, getCourseByIdTeacher)
- [x] 6.2 إنشاء student.routes.js (محدث + يستخدم Student Controller)
- [x] 6.3 إنشاء parent.routes.js (محدث + يستخدم Parent Controller)

## Phase 7: إكمال Components
- [x] 7.1 Teacher Dashboard (تم تحديثه لعرض الطلاب المسجلين واستخدام API)
- [x] 7.2 Admin Dashboard (✅ مكتمل)
- [x] 7.3 Search Teachers Component (تم تحديثه ليستخدم API)
- [x] 7.4 Grade Component (تم تحديثه ليستخدم API)

## Phase 8: تحديث app.js ✅
- [x] 8.1 إزالة Routes القديمة من app.js
- [x] 8.2 إضافة teacherRoutes, parentRoutes, studentRoutes

## ملاحظات:
- الحفاظ على أسلوب كود بسيط ومفهوم
- استخدام @Input, @Output
- استخدام directives (ngFor, ngIf)
- التحقق من صحة الإدخالات

