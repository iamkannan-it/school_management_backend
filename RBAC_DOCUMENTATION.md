# Role-Based Access Control (RBAC) Documentation

## Overview
This school management system implements a comprehensive RBAC system with role-based permissions across all modules.

## User Roles

### Staff Roles
- **Admin** - Full system access
- **Principal** - Administrative access to all school operations
- **Teacher** - Access to academic records (grades, attendance)
- **Accountant** - Fee management and financial records
- **Clerk** - Basic CRUD operations for students, parents, classes
- **Driver** - Limited access
- **Librarian** - Limited access
- **Other** - Limited access

### Student Role
- **Student** - Access to own records only (future implementation)

### Parent Role
- **Parent** - Access to children's records only (future implementation)

## Role Permissions by Module

### Staff Module (`/staff`)
| Endpoint | Method | Roles Allowed |
|----------|--------|---------------|
| Create staff | POST /staff | Admin, Principal |
| Get all staff | GET /staff | Admin, Principal, Clerk |
| Get staff by ID | GET /staff/:id | Admin, Principal, Clerk |
| Update staff | PATCH /staff/:id | Admin, Principal |

### Class Module (`/class`)
| Endpoint | Method | Roles Allowed |
|----------|--------|---------------|
| Create class | POST /class | Admin, Principal |
| Get all classes | GET /class | Admin, Principal, Teacher, Clerk |
| Get class by ID | GET /class/:id | Admin, Principal, Teacher, Clerk |
| Update class | PATCH /class/:id | Admin, Principal |
| Delete class | DELETE /class/:id | Admin, Principal |

### Student Module (`/student`)
| Endpoint | Method | Roles Allowed |
|----------|--------|---------------|
| Create student | POST /student | Admin, Principal, Clerk |
| Get all students | GET /student | Admin, Principal, Teacher, Clerk |
| Get student by ID | GET /student/:id | Admin, Principal, Teacher, Clerk |
| Update student | PATCH /student/:id | Admin, Principal, Clerk |
| Delete student | DELETE /student/:id | Admin, Principal |

### Parent Module (`/parent`)
| Endpoint | Method | Roles Allowed |
|----------|--------|---------------|
| Create parent | POST /parent | Admin, Principal, Clerk |
| Get all parents | GET /parent | Admin, Principal, Clerk |
| Get parent by ID | GET /parent/:id | Admin, Principal, Clerk |
| Update parent | PATCH /parent/:id | Admin, Principal, Clerk |
| Delete parent | DELETE /parent/:id | Admin, Principal |

### Attendance Module (`/attendance`)
| Endpoint | Method | Roles Allowed |
|----------|--------|---------------|
| Mark attendance | POST /attendance | Admin, Principal, Teacher |
| Get all attendance | GET /attendance | Admin, Principal, Teacher |
| Get attendance by ID | GET /attendance/:id | Admin, Principal, Teacher |
| Update attendance | PATCH /attendance/:id | Admin, Principal, Teacher |
| Delete attendance | DELETE /attendance/:id | Admin, Principal |

### Grade Module (`/grade`)
| Endpoint | Method | Roles Allowed |
|----------|--------|---------------|
| Create grade | POST /grade | Admin, Principal, Teacher |
| Get all grades | GET /grade | Admin, Principal, Teacher |
| Get grade by ID | GET /grade/:id | Admin, Principal, Teacher |
| Update grade | PATCH /grade/:id | Admin, Principal, Teacher |
| Delete grade | DELETE /grade/:id | Admin, Principal |

### Fee Module (`/fee`)
| Endpoint | Method | Roles Allowed |
|----------|--------|---------------|
| Create fee | POST /fee | Admin, Principal, Accountant |
| Get all fees | GET /fee | Admin, Principal, Accountant, Clerk |
| Get fee by ID | GET /fee/:id | Admin, Principal, Accountant, Clerk |
| Add payment | POST /fee/:id/payment | Admin, Principal, Accountant |
| Update fee | PATCH /fee/:id | Admin, Principal, Accountant |
| Delete fee | DELETE /fee/:id | Admin, Principal |

## Authentication Flow

### 1. Login
Users login through their respective endpoints:
- **Staff**: `POST /auth/login` with `staffId` and `password`
- **Student**: `POST /student-auth/login` with `username` and `password`
- **Parent**: `POST /parent-auth/login` with `username` and `password`

### 2. Token Generation
On successful login, the system returns:
```json
{
  "user": { /* user data without password */ },
  "accessToken": "jwt-token-here",
  "refreshToken": "refresh-token-here"
}
```

### 3. JWT Payload
The JWT token contains:
```json
{
  "sub": "user_mongodb_id",
  "email": "user@example.com",
  "role": "Admin", // UserRole enum value
  "userType": "staff", // staff, student, or parent
  "staffId": "STF001" // or studentId/parentId based on userType
}
```

### 4. Authorization
For protected endpoints:
1. Client sends JWT token in Authorization header: `Bearer <token>`
2. `AuthGuard('jwt')` validates the token
3. `RolesGuard` checks if user's role is in the allowed roles list
4. If authorized, request proceeds; otherwise, returns 403 Forbidden

## Implementation Details

### Guards
- **AuthGuard('jwt')** - Validates JWT token and extracts user info
- **RolesGuard** - Checks if user has required role(s)

### Decorators
- **@Roles(...roles)** - Specifies which roles can access an endpoint
- **@CurrentUser()** - Injects authenticated user into controller method

### Example Usage
```typescript
@Post()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
@ApiBearerAuth()
async createStudent(@Body() dto: CreateStudentDto) {
  return this.studentService.create(dto);
}
```

## File Structure
```
src/
├── common/
│   ├── auth/
│   │   └── roles.enum.ts          # Role definitions
│   ├── decorators/
│   │   ├── roles.decorator.ts     # @Roles decorator
│   │   └── user.decorator.ts      # @CurrentUser decorator
│   └── guards/
│       └── roles.guard.ts         # RolesGuard implementation
├── staff/
│   └── services/
│       └── jwt.strategy.ts        # Staff JWT strategy
├── student/
│   └── services/
│       └── student-jwt.strategy.ts # Student JWT strategy
└── parent/
    └── services/
        └── parent-jwt.strategy.ts  # Parent JWT strategy
```

## Adding New Roles

To add a new role:

1. Add to `UserRole` enum in `src/common/auth/roles.enum.ts`:
```typescript
export enum UserRole {
  // ...
  NEW_ROLE = 'NewRole',
}
```

2. Apply to endpoints using `@Roles()` decorator:
```typescript
@Roles(UserRole.NEW_ROLE)
```

## Testing RBAC

### Test as Admin
```bash
# Login as admin
POST /auth/login
{
  "staffId": "ADMIN001",
  "password": "password"
}

# Use returned token
GET /staff
Authorization: Bearer <admin-token>
# ✓ Success - Admin has access
```

### Test as Teacher
```bash
# Login as teacher
POST /auth/login
{
  "staffId": "TEACHER001",
  "password": "password"
}

# Use returned token
POST /staff
Authorization: Bearer <teacher-token>
# ✗ Forbidden - Teacher cannot create staff
```

## Future Enhancements

1. **Resource-level permissions**: Students/Parents can only access their own data
2. **Dynamic permissions**: Store permissions in database
3. **Permission inheritance**: Role hierarchies
4. **Audit logging**: Track who accessed what and when
5. **IP-based restrictions**: Limit access by location
6. **Two-factor authentication**: Enhanced security
