import { LightningElement, wire, track } from 'lwc';
import getClassPicklistValues from '@salesforce/apex/StudentHierarchyController.getClassPicklistValues';
import getSectionPicklistValues from '@salesforce/apex/StudentHierarchyController.getSectionPicklistValues';
import getStudents from '@salesforce/apex/StudentHierarchyController.getStudents';
import createStudent from '@salesforce/apex/StudentHierarchyController.createStudent';
import updateStudent from '@salesforce/apex/StudentHierarchyController.updateStudent';
import deleteStudent from '@salesforce/apex/StudentHierarchyController.deleteStudent';
import getAttendance from '@salesforce/apex/StudentHierarchyController.getAttendance';
import getAcademics from '@salesforce/apex/StudentHierarchyController.getAcademics';
import getActivities from '@salesforce/apex/StudentHierarchyController.getActivities';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StudentHierarchyNavigator extends LightningElement {
    @track showClasses = true;
    @track showSections = false;
    @track showStudents = false;
    @track showStudentDetails = false;
    @track selectedClass;
    @track selectedSection;
    @track selectedStudentId;
    @track classOptions = [];
    @track sectionOptions = [];
    @track students = [];
    @track attendanceRecords = [];
    @track academicRecords = [];
    @track activityRecords = [];
    @track showAddStudentModal = false;
    @track showEditStudentModal = false;
    @track editStudentData = {};
    @track showAddAttendanceModal = false;
    @track showAddAcademicModal = false;
    @track showAddActivityModal = false;

    studentColumns = [
        { label: 'Student Name', fieldName: 'Name' },
        { label: 'Student ID', fieldName: 'Student_ID__c' },
        { label: 'Date of Birth', fieldName: 'Date_of_Birth__c', type: 'date' },
        { label: 'Contact Number', fieldName: 'Contact_Number__c', type: 'phone' },
        { label: 'Parent Email', fieldName: 'Parent_Email__c', type: 'email' },
        { label: 'Days Present', fieldName: 'Number_of_Days_Present__c', type: 'number' },
        { label: 'Total Working Days', fieldName: 'Total_Working_days__c', type: 'number' },
        { label: 'Attendance Percentage', fieldName: 'Attendance_Percentage__c', type: 'percent' },
        {
            type: 'action', 
            typeAttributes: { 
                rowActions: [
                    { label: 'View Details', name: 'view' }, 
                    { label: 'Edit', name: 'edit' }, 
                    { label: 'Delete', name: 'delete' }
                ] 
            }
        }
    ];

    attendanceColumns = [
        { label: 'Attendance Status', fieldName: 'Attendance_Status__c' },
        { label: 'Date', fieldName: 'Date__c', type: 'date' },
        { label: 'Reason for Absence', fieldName: 'Reason_for_Absence__c' }
    ];

    academicColumns = [
        { label: 'Subject Name', fieldName: 'Name' },
        { label: 'Exam', fieldName: 'Exam__c' },
        { label: 'Marks', fieldName: 'Marks__c', type: 'number' },
        { label: 'Total Marks', fieldName: 'Total_Marks__c', type: 'number' },
        { label: 'Percentage', fieldName: 'Percentage__c', type: 'number' },
        { label: 'Status', fieldName: 'Status__c' }
    ];

    activityColumns = [
        { label: 'Activity Name', fieldName: 'Name' },
        { label: 'Achievement', fieldName: 'Achievement__c' },
        { label: 'Participation Date', fieldName: 'Participation_Date__c', type: 'date' }
    ];

    @wire(getClassPicklistValues)
    wiredClasses({ error, data }) {
        if (data) {
            this.classOptions = data.map(value => ({ label: value, value: value }));
        } else if (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }

    @wire(getSectionPicklistValues)
    wiredSections({ error, data }) {
        if (data) {
            this.sectionOptions = data.map(value => ({ label: value, value: value }));
        } else if (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }

    handleClassChange(event) {
        this.selectedClass = event.detail.value;
        this.showSections = true;
        this.showStudents = false;
        this.showStudentDetails = false;
    }

    handleSectionChange(event) {
        this.selectedSection = event.detail.value;
        this.showStudents = true;
        this.showStudentDetails = false;
        this.fetchStudents();
    }

    fetchStudents() {
        getStudents({ classValue: this.selectedClass, sectionValue: this.selectedSection })
            .then(result => {
                this.students = result;
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    handleStudentSelect(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if (actionName === 'view') {
            this.selectedStudentId = row.Id;
            this.showStudentDetails = true;
            this.fetchStudentDetails();
        } else if (actionName === 'edit') {
            this.editStudentData = { ...row };
            this.showEditStudentModal = true;
        } else if (actionName === 'delete') {
            this.deleteStudent(row.Id);
        }
    }

    fetchStudentDetails() {
        this.fetchAttendance();
        this.fetchAcademics();
        this.fetchActivities();
    }

    fetchAttendance() {
        getAttendance({ studentId: this.selectedStudentId })
            .then(result => {
                this.attendanceRecords = result;
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    fetchAcademics() {
        getAcademics({ studentId: this.selectedStudentId })
            .then(result => {
                this.academicRecords = result;
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    fetchActivities() {
        getActivities({ studentId: this.selectedStudentId })
            .then(result => {
                this.activityRecords = result;
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    handleAddStudent() {
        this.showAddStudentModal = true;
    }

    handleAddAttendance() {
        this.showAddAttendanceModal = true;
    }

    handleAddAcademic() {
        this.showAddAcademicModal = true;
    }

    handleAddActivity() {
        this.showAddActivityModal = true;
    }

    handleStudentSave(event) {
        this.showAddStudentModal = false;
        this.showToast('Success', 'Student added successfully', 'success');
        this.fetchStudents();
    }

    handleEditStudentSave(event) {
        const updatedStudent = { ...event.detail.fields, sobjectType: 'Student__c' };
        updateStudent({ student: updatedStudent })
            .then(() => {
                this.showToast('Success', 'Student updated successfully', 'success');
                this.fetchStudents();
                this.showEditStudentModal = false;
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    deleteStudent(studentId) {
        deleteStudent({ studentId: studentId })
            .then(() => {
                this.showToast('Success', 'Student deleted successfully', 'success');
                this.fetchStudents();
                if (this.selectedStudentId === studentId) {
                    this.showStudentDetails = false;
                }
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    handleAttendanceSave(event) {
        this.showAddAttendanceModal = false;
        this.showToast('Success', 'Attendance added successfully', 'success');
        this.fetchAttendance();
    }

    handleAcademicSave(event) {
        this.showAddAcademicModal = false;
        this.showToast('Success', 'Academic added successfully', 'success');
        this.fetchAcademics();
    }

    handleActivitySave(event) {
        this.showAddActivityModal = false;
        this.showToast('Success', 'Activity added successfully', 'success');
        this.fetchActivities();
    }

    closeModal() {
        this.showAddStudentModal = false;
        this.showEditStudentModal = false;
        this.showAddAttendanceModal = false;
        this.showAddAcademicModal = false;
        this.showAddActivityModal = false;
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}
