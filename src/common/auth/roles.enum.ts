export enum UserRole {
  // Staff Roles
  ADMIN = 'Admin',
  PRINCIPAL = 'Principal',
  TEACHER = 'Teacher',
  ACCOUNTANT = 'Accountant',
  CLERK = 'Clerk',
  DRIVER = 'Driver',
  LIBRARIAN = 'Librarian',
  OTHER_STAFF = 'Other',

  // Student Role
  STUDENT = 'Student',

  // Parent Role
  PARENT = 'Parent',
}

export enum UserType {
  STAFF = 'staff',
  STUDENT = 'student',
  PARENT = 'parent',
}
