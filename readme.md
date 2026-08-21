# ZeSchool

## Overview

ZeSchool is a parent and teacher school connection platform. The project is designed to bring parent communication, student information, academic records, reports, schedules, calendar events, transportation information, and AI-assisted analysis into one focused workspace.

The current repository contains a functional frontend prototype with parent and teacher dashboards. The dashboards use local JavaScript data to demonstrate the planned product flows. The backend is currently a starter Express and MongoDB structure and is not yet connected to the frontend features.

Children are represented as school data records connected to parents and teachers. They do not have accounts, login access, or separate dashboards.

## Current Project Status

The project is currently in the frontend prototype and interface development stage.

| Area | Current status |
|---|---|
| Frontend | Implemented with React and Vite. Parent and teacher dashboard screens are available. |
| Parent experience | Includes dashboard navigation for chat, calendar, grades, reports, bus and map information, smartwatch information, and AI analysis. |
| Teacher experience | Includes chat, classes, calendar, reports, and AI analysis views. |
| Styling | Uses CSS Modules with a dark ZeSchool theme, shared layout styles, system font inheritance, and responsive layouts. |
| Material UI | Installed in the client and available for future shared components. Current dashboard screens mainly use project CSS Modules. |
| Data | Current screens use local JavaScript data files for prototype behavior. |
| Backend | Express, CORS, dotenv, and Mongoose dependencies are installed, but the server implementation is not connected to the current frontend. |
| Authentication | Login and registration screens exist in the frontend, but complete server authentication and authorization are not implemented yet. |
| External services | Maps, transportation tracking, AI provider connections, and smartwatch integrations are represented as planned or prototype features. |

## Product Goals

ZeSchool is intended to improve communication between parents and teachers, centralize student-related information, help families understand academic progress, and provide teachers with focused tools for class and student management.

The platform should protect information about children and should only show a user the records allowed by their role and relationships. AI output should support human decisions rather than replace parents, teachers, or school administrators.

## Implemented Parent Experience

The parent dashboard uses the shared dashboard shell and supports child selection through the parent view. The current frontend includes the following areas:

| Parent area | Current implementation |
|---|---|
| Chat | Parent conversations and message composition using local prototype data. |
| Calendar | Shared calendar view with month navigation, event display, event creation, colors, and selected dates. |
| Grades | Grade and academic performance screens using the existing grade data. |
| Reports | Student report viewing using the existing report data. |
| Bus and map | Transportation information and map-oriented screens using prototype data. |
| Smartwatch | Optional smartwatch information using prototype activity and health-related data. |
| AI analysis | Parent AI analysis page with analysis period selection, data-source filters, a generated performance report area, metrics, recommendations, and follow-up questions. |

## Implemented Teacher Experience

The teacher dashboard is organized around a left page rail, a top class switcher, a main content area, and a shared dark theme.

### Teacher Chat

The teacher chat view includes parent conversations, a parent search input, conversation history, message composition, student context, and message status indicators. The teacher parent search input uses the same 60px height requested for the parent view.

### Teacher Classes

The Classes page displays one class card per row. Selecting a class updates the adjacent selected-class panel and the teacher schedule panel.

The selected-class panel shows the class name, student count, student avatars, parent names, student status, and selected student state. The schedule panel shows the teaching days and lecture times for the selected class. The schedule rows are synchronized with the student rows, and secondary subject and room text was removed to keep both columns aligned.

A compact footer-style class workspace summary is displayed below the main class panels. It shows a short reminder for the selected class, the number of students, and the number of weekly lectures without adding another large dashboard card section.

### Teacher Calendar

The teacher Calendar page reuses the same `CalendarPage` component as the parent view. This means both roles use the same calendar layout, dimensions, spacing, controls, event form, colors, and behavior.

### Teacher Reports

The teacher Reports page provides a report creation form with the following fields:

| Field | Purpose |
|---|---|
| Choose class | Selects the class related to the report. |
| Choose student | Selects a student from the selected class. |
| Report date | Sets the date of the report. |
| Report type | Selects academic progress, behavior and participation, or attendance. |
| Description | Provides the main report text in a multiline field. |
| Publish report | Adds the new report to the local report history. |

The right side of the page contains report history rather than a parent preview. Existing and newly published reports show the student, class where available, date or period, report type, and description.

### Teacher AI Analysis

The teacher AI page was redesigned as a focused assistant workspace instead of a large collection of dashboard cards.

The page supports two analysis modes:

| Mode | Purpose |
|---|---|
| Student analysis | Reviews the selected student's available grades, attendance, and teacher reports. |
| Class analysis | Reviews the selected class's available grade entries, attendance entries, teacher reports, and student statuses. |

The teacher can select data sources including grades, attendance, reports, and calendar context. The page then presents a large AI response area containing a summary, available record counts, a recommended next step, and a follow-up question field.

The current analysis responses are local prototype responses derived from the existing teacher data. No external AI service is connected yet.

## Visual Design Decisions

The frontend follows a consistent dark dashboard design based on the supplied wireframes and reference images.

| Design area | Decision |
|---|---|
| Font | Uses `system-ui, sans-serif` consistently through the global stylesheet. |
| Theme | Uses dark charcoal backgrounds with lighter panel surfaces and blue-purple action colors. |
| Navigation | Uses a left page rail for dashboard navigation and a top teacher class switcher. |
| Buttons | Uses compact rounded controls with clear selected and hover states. |
| Logout control | Uses a transparent logout button consistently in both parent and teacher dashboard views. |
| Styling approach | Uses CSS Modules for page-level styles and shared dashboard shell styles. |
| Code readability | Uses straightforward React components, local data modules, descriptive names, and minimal comments. No emojis are used in the project interface. |
| Responsive behavior | Main grids stack on smaller screens, and forms reduce to one column where necessary. |

## Repository Structure

```text
ZeSchool/
├── client/
│   ├── src/
│   │   ├── data/
│   │   │   ├── aiAnalysisData.js
│   │   │   ├── busData.js
│   │   │   ├── chatData.js
│   │   │   ├── gradeData.js
│   │   │   ├── reportsWatchData.js
│   │   │   └── teacherData.js
│   │   ├── pages/
│   │   │   ├── AIAnalysisPage.jsx
│   │   │   ├── BusPage.jsx
│   │   │   ├── CalendarPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── ChildSetupPage.jsx
│   │   │   ├── GradesPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ParentDashboardPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ReportsPage.jsx
│   │   │   ├── SmartwatchPage.jsx
│   │   │   ├── TeacherAIAnalysisPage.jsx
│   │   │   └── TeacherDashboardPage.jsx
│   │   ├── styles/
│   │   │   ├── ai-analysis.module.css
│   │   │   ├── app.module.css
│   │   │   ├── bus.module.css
│   │   │   ├── calendar.module.css
│   │   │   ├── chat.module.css
│   │   │   ├── dashboard-shell.module.css
│   │   │   ├── grades.module.css
│   │   │   ├── reports.module.css
│   │   │   ├── smartwatch.module.css
│   │   │   ├── teacher-ai-analysis.module.css
│   │   │   ├── teacher-dashboard.module.css
│   │   │   └── teacher-pages.module.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   └── package.json
├── server/
│   ├── config/
│   │   └── mongoose.config.js
│   ├── controllers/
│   │   └── product.controller.js
│   ├── models/
│   │   └── product.model.js
│   ├── routes/
│   │   └── product.routes.js
│   ├── server.js
│   └── package.json
└── readme.md
```

## Technology Stack

| Layer | Current technology |
|---|---|
| Frontend framework | React 19 |
| Frontend build tool | Vite 8 |
| Frontend language | JavaScript with JSX |
| Routing | React Router DOM 7 |
| UI library | Material UI 9 is installed for future use |
| Styling | CSS Modules and shared CSS |
| HTTP client | Axios |
| Maps | Leaflet and React Leaflet |
| Backend framework | Express 5 dependency |
| Database library | Mongoose 9 dependency |
| Database | MongoDB is planned through Mongoose configuration |
| Configuration | dotenv dependency is available on the server |
| Cross-origin support | CORS dependency is available on the server |

## Installation and Usage

### Client

From the repository root, install and start the frontend:

```bash
cd client
npm install
npm run dev
```

The Vite development server will print the local URL in the terminal.

To create a production build:

```bash
cd client
npm run build
```

To run lint checks:

```bash
cd client
npm run lint
```

To preview the production build locally:

```bash
cd client
npm run preview
```

### Server

The server package contains the current Express and MongoDB-related dependencies. The server implementation is still incomplete, so a complete backend startup command and API contract will be added after the backend is connected to the frontend.

## Local Prototype Data

The current frontend data is stored in JavaScript modules under `client/src/data`. Important prototype datasets include:

| File | Data |
|---|---|
| `teacherData.js` | Teacher profile, classes, students, parent conversations, messages, reports, grades, attendance, and class schedules. |
| `aiAnalysisData.js` | Parent AI analysis periods, metrics, summaries, advice, and source labels. |
| `gradeData.js` | Parent academic grades and performance information. |
| `reportsWatchData.js` | Parent reports and smartwatch prototype information. |
| `busData.js` | Transportation and map prototype information. |
| `chatData.js` | Parent chat and conversation prototype information. |

This data is for interface development and demonstration. It is not a replacement for a secured database.

## Current Data and Architecture Gaps

The following items are known gaps between the product documentation and the current repository:

| Gap | Explanation |
|---|---|
| Backend connection | The frontend still uses local data and does not load dashboard records from the Express server. |
| Authentication | Login and registration interfaces exist, but password hashing, sessions or tokens, role checks, and protected API routes are not complete. |
| Authorization | Parent-child and teacher-class access rules are represented in the product plan but are not enforced by a complete backend implementation. |
| Database models | The server currently contains a starter product model rather than the full school data model. |
| Real AI service | AI analysis is currently represented by local deterministic prototype responses. |
| Report persistence | Published reports update local page state only and are not saved to MongoDB. |
| Real-time messaging | Messages update local state and are not yet synchronized through WebSockets or a backend message API. |
| Transportation | Bus and map screens use prototype data and do not yet connect to a live tracking service. |
| Smartwatch | Smartwatch screens are optional prototype screens and do not connect to a real device or health service. |
| Calendar persistence | Calendar events are currently stored in local page state. |
| Student data consistency | Several parent and teacher screens still use separate prototype datasets. A future API should provide one shared source of truth. |

## Recommended Next Development Order

The next implementation phase should connect the frontend to a real backend in a controlled order:

1. Define the MongoDB models for users, parents, teachers, children, classes, relationships, messages, grades, reports, attendance, events, and AI audit records.
2. Implement authentication and role-based authorization.
3. Add server-side parent-child and teacher-class access checks.
4. Replace local dashboard data with protected API requests.
5. Persist messages, reports, grades, attendance, and calendar events.
6. Connect the AI analysis workflow to a secured server-side AI service.
7. Add real-time messaging, notifications, transportation tracking, and optional smartwatch integrations.
8. Add automated tests for authorization, data ownership, report publishing, and AI context filtering.

## Security Requirements

ZeSchool handles information about children, academic performance, communication, location, and potentially health and financial information. Production implementation must include secure authentication, password hashing, protected sessions or tokens, server-side role checks, relationship validation, input validation, minimal AI context, secure API routes, audit logging, and careful handling of location, health, and financial records.

Children must remain separate from authenticated users and must not receive login credentials.

## Environment Variables

The current server configuration is not fully connected yet. The following names describe the planned configuration and should be finalized when the backend is implemented:

```env
APP_ENV=development
APP_PORT=5000
MONGODB_URI=
AUTH_SECRET=
AI_API_KEY=
MAP_API_KEY=
SMARTWATCH_API_KEY=
```

Do not commit real credentials or secrets to the repository. A local `.env` file should be excluded from version control.

## Future Improvements

Future work includes a complete school data backend, real authentication, real-time messaging, notifications, richer academic charts, report comparisons, class performance trends, live transportation tracking, secure AI analysis, smartwatch dashboards, audit logs, school integrations, accessibility improvements, and multilingual support.

Future development should preserve the central parent and teacher model. Student accounts should not be introduced unless the product requirements change.

## Contributors

The contributor list should be completed by the project team.

## License

A project license should be selected before public distribution.

## References

This README is based on the supplied project documentation, wireframe and design references, the existing ZeSchool repository, and the frontend work completed during the current development session.
