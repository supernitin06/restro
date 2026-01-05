# TODO: Fix Add New Category Save Issue

- [x] Analyze the AddMenu.jsx component to understand the handleAddCategory function
- [x] Identify issues: No user feedback on success/failure, no auto-selection of new category, no refresh of categories list
- [x] Add success alert when category is added successfully
- [x] Add error alert when category addition fails
- [x] Auto-select the newly added category in the dropdown
- [x] Reset the form fields after successful addition
- [x] Refresh the categories list after adding a new category
- [x] Test the functionality to ensure save works properly

# TODO: Fix 404 Errors for Categories and Schemes Endpoints

- [x] Change category endpoints from "admin/category" to "admin/categories" in menuApi.js
- [x] Remove schemes endpoint and related UI from AddMenu.jsx since it's not available on the server
- [x] Remove useGetSchemesQuery import and usage
- [x] Remove schemes state variables and JSX section
- [x] Update exports in menuApi.js to exclude useGetSchemesQuery

# TODO: Update API Base URL

- [x] Update baseURL in src/api/services/baseApi.js from "https://sog.bitmaxtest.com/api/v1/" to "https://resto-grandma.onrender.com/api/v1/"
