# Student Performance Tracker

## Phase 2: Org Setup & Configuration
- Set up a Salesforce Developer Org.
- Configured Lightning App settings, navigation items, and user profiles.
- Prepared the Salesforce environment for development and testing.

## Phase 3: Data Modeling & Relationships
- Created four custom objects: Student, Attendance, Academic, and Extracurricular Activity.
- Defined fields and relationships, including lookup relationships between Student and related objects.
- Used Schema Builder to visualize object relationships and ensure a structured data model.

## Phase 4: Business Logic Automation with Validation & Flows
- Implemented Validation Rules to ensure data integrity across all objects.
- Built Record-Triggered Flows to automate calculations and notifications (e.g., sending alerts when academic percentage < 35%).

## Phase 5: Apex Trigger Development
- Developed an Apex Trigger on the Attendance object to update Student records automatically.
- Automated Total Working Days and Number of Days Present calculations.
- Improved data accuracy and reduced manual updates.

## Phase 6: Custom Development with Apex Class & Lightning Web Components (LWC)
- Used Visual Studio Code (VS Code) for Salesforce development and deployment.
- Developed an Apex Class to fetch and process student-related data for the frontend.
- Built Lightning Web Components (LWC) with custom HTML and JavaScript to display student information interactively.
- Integrated backend logic with frontend to deliver real-time dashboards.

## Phase 7: Automated Notifications with Record-Triggered Flow
- Created a Record-Triggered Flow to send emails to parents when a student’s exam percentage falls below 35%.
- Configured the flow to fetch Parent Email and include exam details in the email content.
- Verified functionality with screenshots of received emails.

## Phase 8: Project Deployment & Salesforce Integration
- Showcased the Salesforce DX (SFDX) project structure in VS Code.
- Deployed Apex classes and LWCs to the Salesforce Developer Org using SFDX commands.
- Ensured all custom logic and UI components were successfully integrated.

## Phase 9: Final Application Showcase
- Displayed the final Lightning App interface with a complete student management dashboard.
- Showcased student academic, attendance, and activity details within the app.
- Provided forms for adding new records: Student, Attendance, Academic, and Activity.
- Highlighted the interactive, user-friendly interface and seamless navigation across sections.
