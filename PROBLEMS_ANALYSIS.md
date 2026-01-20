# Project Problems Analysis

## 🔴 Critical Issues

### 1. **Hardcoded SECRET_KEY**
**File:** `backend/middleware/auth.middleware.js`
- **Problem:** Secret key is hardcoded in plain text
- **Impact:** Security vulnerability - should be in environment variables
- **Status:** Documented but not fixed

### 2. **Port Mismatch Between Frontend and Backend**
**Backend:** Port 5206 (`server.js`)
**Frontend Services:** Port 5206 (`auth.service.ts`, `teacher-dashboard.component.ts`, etc.)
- **Problem:** Frontend services hardcoded to port 5206
- **Impact:** May not work in production or different environments
- **Recommendation:** Use environment variables or proxy configuration

### 3. **Teacher Signup - Missing CV Upload Implementation**
**File:** `src/app/components/signup/teacher-signup/teacher-signup.component.html`
- **Problem:** CV upload field exists in HTML but no file upload handling in TS
- **Impact:** CV upload feature will not work
- **Details:**
  - HTML has file input with `accept=".pdf"`
  - TypeScript doesn't handle file upload
  - Backend route doesn't use upload middleware (`auth.routes.js`)
- **Status:** UI exists but functionality missing

### 4. **Teacher Signup - Missing Address Field**
**File:** `src/app/components/signup/teacher-signup/teacher-signup.component.ts`
- **Problem:** Form includes `address` field validation but it's not in the submitted data
- **Impact:** Address is collected but never sent to backend
- **Current Code:**
  ```typescript
  address: ['', [Validators.required, Validators.minLength(10)]], // Validated in form
  // But not in teacherData object
  ```
- **Fix needed:** Add `address` to the `teacherData` object

### 5. **Teacher Signup - Address Not Saved in Backend**
**File:** `backend/controllers/auth.controller.js`
- **Problem:** Teacher model doesn't have address field
- **Impact:** Even if frontend sends address, it won't be saved
- **Current Teacher Model:** Only has `userId`, `specialty`, `cv`, `isValidated`
- **Fix needed:** Add `address` field to Teacher model or save in User model

## 🟡 Medium Priority Issues

### 6. **Password Validation - `passwordMismatch` Property Access**
**File:** `src/app/components/signup/teacher-signup/teacher-signup.component.html`
- **Problem:** Accessing `teacherForm.errors?.['passwordMismatch']` directly
- **Impact:** May not work as expected with Angular reactive forms
- **Recommendation:** Use `teacherForm.getError('passwordMismatch')` or check password fields individually

### 7. **MongoDB Connection String**
**File:** `backend/app.js`
- **Problem:** MongoDB connection hardcoded to `mongodb://127.0.0.1:27017/schoolEdustageDB`
- **Impact:** Not flexible for different environments
- **Recommendation:** Use environment variables

### 8. **CORS Configuration**
**File:** `backend/app.js`
- **Problem:** CORS enabled for all origins (`app.use(cors())`)
- **Impact:** Security concern in production
- **Recommendation:** Restrict to specific domains in production

### 9. **Missing Error Handling in Services**
- **Problem:** Several services don't have proper error handling
- **Examples:** `auth.service.ts`, `admin.service.ts`
- **Impact:** Poor user experience on errors

### 10. **Missing Loading States**
- **Problem:** Some components don't show loading indicators
- **Impact:** Poor UX during API calls

## 🟢 Low Priority / Improvements

### 11. **Inconsistent Naming Conventions**
- Some files use camelCase, others use kebab-case inconsistently
- Routes use different patterns (`dashboardAdmin` vs `dashboardStudent`)

### 12. **Missing Input Validation on Backend**
- **Problem:** Backend controllers don't validate input data
- **Impact:** Potential security issues with malformed data

### 13. **No Rate Limiting**
- **Problem:** No rate limiting on authentication endpoints
- **Impact:** Vulnerable to brute force attacks

### 14. **Missing Password Hashing Validation**
- **Problem:** Can't verify if password meets complexity requirements

### 15. **Inconsistent Error Response Format**
- Some endpoints return `{msg: string, isAdded: boolean}`
- Others return `{msg: string}` or different formats
- **Impact:** Frontend has to handle different response structures

## 📋 Recommended Fixes Priority

### High Priority (Security & Core Functionality)
1. Fix teacher signup CV upload functionality
2. Fix teacher signup address field handling
3. Move SECRET_KEY to environment variables
4. Add proper file upload handling for teacher CV

### Medium Priority (User Experience)
5. Add proper error handling in all services
6. Add loading states to all components
7. Standardize API response formats

### Low Priority (Best Practices)
8. Add rate limiting
9. Add input validation on backend
10. Use environment variables for all configuration

## 🔧 Specific Code Changes Needed

### Fix 1: Teacher Signup - Add Address to Submitted Data
**File:** `src/app/components/signup/teacher-signup/teacher-signup.component.ts`
```typescript
signup() {
  // ... existing code
  const teacherData = {
    firstName: this.teacherForm.value.firstName,
    lastName: this.teacherForm.value.lastName,
    email: this.teacherForm.value.email,
    tel: this.teacherForm.value.tel,
    address: this.teacherForm.value.address, // ADD THIS LINE
    password: this.teacherForm.value.password,
    specialty: this.teacherForm.value.specialty,
    cv: this.teacherForm.value.cv,
  };
  // ... rest of code
}
```

### Fix 2: Teacher Signup - Add CV Upload
**File:** `src/app/components/signup/teacher-signup/teacher-signup.component.ts`
```typescript
import { HttpClient } from '@angular/common/http';

// Add file handling
selectedCV: File | null = null;

onCVSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedCV = file;
    this.teacherForm.patchValue({ cv: file });
  }
}

signup() {
  if (this.teacherForm.invalid) {
    this.errorMessage = 'Please check the form and upload your CV';
    return;
  }

  const formData = new FormData();
  formData.append('firstName', this.teacherForm.value.firstName);
  formData.append('lastName', this.teacherForm.value.lastName);
  formData.append('email', this.teacherForm.value.email);
  formData.append('tel', this.teacherForm.value.tel);
  formData.append('address', this.teacherForm.value.address);
  formData.append('password', this.teacherForm.value.password);
  formData.append('specialty', this.teacherForm.value.specialty);
  
  if (this.selectedCV) {
    formData.append('cv', this.selectedCV);
  }

  this.authService.signupTeacher(formData).subscribe((data) => {
    // ... existing code
  });
}
```

### Fix 3: Update Auth Service for FormData
**File:** `src/app/services/auth.service.ts`
```typescript
signupTeacher(obj: any) {
  // Check if FormData
  if (obj instanceof FormData) {
    return this.http.post<{ msg: string; isAdded: boolean }>(
      this.URL + '/signup/teacher',
      obj
    );
  }
  return this.http.post<{ msg: string; isAdded: boolean }>(
    this.URL + '/signup/teacher',
    obj
  );
}
```

### Fix 4: Update Auth Routes for CV Upload
**File:** `backend/routes/auth.routes.js`
```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const upload = require('../middleware/upload.middleware');

router.post('/login', authController.login);
router.post('/signup/student', upload, authController.signupStudent);
router.post('/signup/teacher', upload, authController.signupTeacher); // ADD upload middleware
router.post('/signup/parent', authController.signupParent);
module.exports = router;
```

### Fix 5: Update Teacher Model
**File:** `backend/models/teacher.js`
```javascript
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: String, // ADD address field
  specialty: String,
  cv: String, // ADD CV path
  isValidated: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
```

### Fix 6: Update Teacher Controller for File Upload
**File:** `backend/controllers/auth.controller.js`
```javascript
exports.signupTeacher = (req, res) => {
  let user = req.body;
  let cvPath = null;

  // Check if file was uploaded
  if (req.file) {
    cvPath = '/uploads/cvs/' + req.file.filename;
    console.log('CV uploaded:', cvPath);
  }

  User.findOne({ email: user.email }).then((data) => {
    if (data) {
      console.log("Here is data after search user by email", data);
      res.json({ msg: "Email already exists", isAdded: false });
    } else {
      bcrypt.hash(user.password, 10).then((cryptedPassword) => {
        console.log("Here is crypted password", cryptedPassword);

        let userObj = new User({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          tel: user.tel,
          password: cryptedPassword,
          role: "teacher",
        });

        userObj.save().then((savedUser) => {
          let teacherObj = new Teacher({
            userId: savedUser._id,
            address: user.address, // SAVE address
            specialty: user.specialty,
            cv: cvPath, // SAVE CV path
            isValidated: false,
          });

          teacherObj.save().then(() => {
            res.json({ msg: "Signup request sent to Admin!", isAdded: true });
          });
        });
      });
    }
  });
};
```

## 📊 Summary

| Issue Category | Count | Severity |
|---------------|-------|----------|
| Security | 4 | High |
| Missing Functionality | 3 | High |
| User Experience | 5 | Medium |
| Best Practices | 5 | Low |

**Total Issues Identified:** 15

**Recommended Actions:**
1. Priority 1: Fix teacher signup (CV upload + address)
2. Priority 2: Security improvements (env variables, CORS)
3. Priority 3: Add error handling and loading states
4. Priority 4: Code standardization and best practices

