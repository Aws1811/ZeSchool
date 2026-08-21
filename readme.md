# ZeSchool

## Overview

ZeSchool is a parent and teacher school connection platform. It brings communication, student information, grades, reports, schedules, calendar events, transportation information, and AI-assisted analysis into one dashboard.

Children are data records connected to parents and teachers. They do not have accounts or dashboards.

## Current Status

The project is currently a frontend prototype. The main screens use local JavaScript data. The Express and MongoDB backend structure exists, but it is not connected to the frontend yet.

| Area           | Status                                                                                  |
| -------------- | --------------------------------------------------------------------------------------- |
| Frontend       | React and Vite application with parent and teacher dashboards                           |
| Styling        | CSS Modules, shared dashboard styles, dark theme, responsive layouts                    |
| UI library     | Material UI installed for future components                                             |
| Data           | Local prototype data under `client/src/data`                                            |
| Backend        | Express and Mongoose dependencies with starter files                                    |
| Authentication | Login and registration screens exist, but secure backend authentication is not finished |
| AI             | Local prototype analysis, with no external AI service connected yet                     |

## Main Features

### Parent Dashboard

The parent dashboard includes chat, calendar, grades, reports, bus and map information, smartwatch information, and AI analysis.

### Teacher Dashboard

The teacher dashboard includes:

- Chat with parent conversations and parent search.
- Classes with class selection, student lists, class schedules, and a compact footer summary.
- The same Calendar component used by the parent dashboard.
- Reports with class, student, date, type, description, publish button, and report history.
- AI Analysis with Student analysis and Class analysis modes, selectable data sources, summaries, metrics, recommendations, and follow-up questions.

### Shared Design

The project uses a dark charcoal theme, blue-purple action colors, shared dashboard navigation, system font inheritance, CSS Modules, responsive layouts, and transparent logout controls in both parent and teacher views.

## Technology Stack

| Layer            | Technology                 |
| ---------------- | -------------------------- |
| Frontend         | React 19, JSX, Vite 8      |
| Routing          | React Router DOM 7         |
| Styling          | CSS Modules and shared CSS |
| UI library       | Material UI 9              |
| HTTP client      | Axios                      |
| Maps             | Leaflet and React Leaflet  |
| Backend          | Express 5                  |
| Database library | Mongoose 9                 |
| Database         | MongoDB planned            |

## Project Structure

```text
ZeSchool/
├── client/
│   └── src/
│       ├── data/          Local prototype data
│       ├── pages/         Parent and teacher pages
│       └── styles/        CSS Modules and shared styles
├── server/
│   ├── config/            Database configuration
│   ├── controllers/       Backend controllers
│   ├── models/            Mongoose models
│   ├── routes/            Backend routes
│   └── server.js
└── readme.md
```

Important frontend files include `ParentDashboardPage.jsx`, `TeacherDashboardPage.jsx`, `CalendarPage.jsx`, `TeacherAIAnalysisPage.jsx`, `teacherData.js`, and `aiAnalysisData.js`.

## Installation and Commands

### Client

```bash
cd client
npm install
npm run dev
```

Other useful commands:

```bash
npm run build
npm run lint
npm run preview
```

### Server

The server is still under development. Its Express routes and database models are not yet connected to the frontend.

## Prototype Data

The current screens use local data files:

| File                  | Purpose                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `teacherData.js`      | Teacher profile, classes, students, messages, reports, grades, attendance, and schedules |
| `aiAnalysisData.js`   | Parent AI analysis summaries, metrics, and recommendations                               |
| `gradeData.js`        | Parent grade information                                                                 |
| `reportsWatchData.js` | Reports and smartwatch prototype data                                                    |
| `busData.js`          | Transportation and map prototype data                                                    |
| `chatData.js`         | Parent chat prototype data                                                               |

Prototype data is for interface development only and is not a secure production database.

## Known Gaps

The next backend phase must add real authentication, role-based authorization, parent-child and teacher-class access checks, MongoDB models, protected API routes, persistent messages, reports, grades, attendance, and calendar events.

The project also still needs a secured AI service, real-time messaging, live transportation tracking, optional smartwatch integrations, notifications, automated tests, and one shared backend source of truth for parent and teacher data.

## Security Notes

Production development must protect student, academic, communication, location, health, and financial data. Children must remain separate from authenticated users and must not receive login credentials. Real secrets must not be committed to the repository.

Planned environment variables include:

```env
APP_ENV=development
APP_PORT=5000
MONGODB_URI=
AUTH_SECRET=
AI_API_KEY=
MAP_API_KEY=
SMARTWATCH_API_KEY=
```

## Next Recommended Steps

1. Define the MongoDB school data models.
2. Build authentication and role-based authorization.
3. Connect the frontend to protected backend APIs.
4. Persist messages, reports, grades, attendance, and calendar events.
5. Connect the secured AI analysis workflow.
6. Add tests for access control and data ownership.

## License

A project license should be selected before public distribution.
