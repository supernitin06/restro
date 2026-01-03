# TODO: Convert AddMenu Modal to Standalone Page

## Steps to Complete:
1. Add a new route in approuter.jsx for /menu-management/add that renders the AddMenu component.
2. Modify MenuManagement.jsx to navigate to the new page instead of opening a modal, and remove modal-related code.
3. Update AddMenu.jsx to handle navigation (back button and save functionality) using React Router.
4. Test the changes to ensure the Add Menu functionality opens as a full page.

---

# Import Fixes TODO

## Completed Tasks
- [x] Fix import in src/pages/Usermanagement.jsx: Change `import UserTable from '../components/ui/Table';` to `import UserTable from '../components/ui/UserTable';`
- [x] Fix import in src/components/support/TicketsTable.jsx: Change `import Table from '../ui/Table';` to `import Table from '../ui/UserTable';`
- [x] Fix import in src/components/offers/OffersTable.jsx: Change `import Table from "../ui/Table";` to `import Table from "../ui/UserTable";`

## Notes
- src/components/offers/CouponsTable.jsx already had the correct import.
- All import errors related to the non-existent "../components/ui/Table" or "../ui/Table" paths have been resolved.
