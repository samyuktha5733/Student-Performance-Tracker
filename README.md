Student Performance Tracker

# Phase 2: Org Setup & Configuration
In Phase 2, the Salesforce environment for the Student Performance Tracker was set up. 
This involved creating a Lightning App called Student Project App, along with custom objects for Student, Attendance, Grade, and Extracurricular Activity. 
Each object includes necessary fields to store student information, track attendance, record grades with a formula field, and manage participation in activities. 
Tabs were created for all objects to make them accessible in the app, and standard Salesforce tabs like Reports and Dashboards were added for analytics.

Phase 3: Data Modeling & Relationships
In this phase, the data structure of the Student Performance Tracker app was designed by creating relationships, layouts, and visual models to ensure smooth tracking of student information. Lookup relationships were defined so that Attendance, Grades, and Extracurricular Activities are all linked to the Student object. 
This allows every attendance record, grade, or activity to be associated with the correct student.
The Student Page Layout was customized by creating new sections — Personal Information (Name, Roll No, DOB, Gender) and Contact Information (Contact Number, Parent Email). 
A Compact Layout was also configured for the Student object, displaying key fields such as Student Name, Roll Number, Class, and Contact Number at the top of the record page for quick insights. 
Finally, the Schema Builder was used to visualize the object model and confirm that Student is correctly connected with Attendance, Grades, and Activities.
