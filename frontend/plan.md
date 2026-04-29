Act as an experienced frontend developer with strong knowledge of React, React Router, JavaScript/TypeScript, and modern frontend architecture.

Objective:
Completely remove the “Auth Center” () page from the current frontend.

Current Situation:
The frontend currently has an Auth Center page connected through routing. This page should no longer be accessible or used in the application.

Task Plan:
1. First, carefully analyze how the current routing system works.
2. Track where the Auth Center page is imported, registered, linked, or referenced.
3. Remove only the Auth Center route from the router configuration.
4. Remove any navigation links, buttons, redirects, or menu items that point to the Auth Center page.
5. Do not delete or modify unrelated authentication logic such as login, register, Firebase auth, user state, protected routes, layouts, or other pages.
6. Do not change the existing UI design, styling, components, or page structure unless they are directly related to the Auth Center route.
7. Make sure the app runs without broken imports, console errors, or routing errors after removing the Auth Center page.
8. If the Auth Center component file becomes completely unused, leave it untouched unless it is safe to remove and does not affect anything else.

Important:
Be careful and minimal. Only remove the Auth Center page routing and its direct references. Do not touch any other working features.

Expected Result:
The Auth Center page should be fully removed from the frontend navigation and routing flow, while the rest of the React application continues working exactly as before.