# TODO: Fix "Failed to add category" Error

## Completed Tasks
- [x] Identify the source of the error in AddMenu.jsx
- [x] Add validation for restaurantId before making API call
- [x] Improve error handling to display server-specific error messages
- [x] Change API endpoints from "admin/category" to "admin/categories" to fix "Route not found" error

## Pending Tasks
- [ ] Test the fix by attempting to add a category
- [ ] Verify that the error message is more informative if the issue persists

## Notes
- The error was occurring in the handleAddCategory function due to missing restaurantId or server-side issues.
- Added checks for restaurantId and enhanced error messaging.
- Changed API routes to plural form to match backend expectations.
