public with sharing class StudentHierarchyController {
    @AuraEnabled(cacheable=true)
    public static List<String> getClassPicklistValues() {
        List<String> picklistValues = new List<String>();
        Schema.DescribeFieldResult fieldResult = Student__c.Class__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p : ple) {
            picklistValues.add(p.getValue());
        }
        return picklistValues;
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getSectionPicklistValues() {
        List<String> picklistValues = new List<String>();
        Schema.DescribeFieldResult fieldResult = Student__c.Section__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p : ple) {
            picklistValues.add(p.getValue());
        }
        return picklistValues;
    }

    @AuraEnabled(cacheable=true)
    public static List<Student__c> getStudents(String classValue, String sectionValue) {
        return [SELECT Id, Name, Student_ID__c, Date_of_Birth__c, Contact_Number__c, Parent_Email__c,
                Number_of_Days_Present__c, Total_Working_days__c, Attendance_Percentage__c, Class__c, Section__c
                FROM Student__c WHERE Class__c = :classValue AND Section__c = :sectionValue];
    }

    @AuraEnabled
    public static Student__c createStudent(Student__c student) {
        insert student;
        return student;
    }

    @AuraEnabled
    public static Student__c updateStudent(Student__c student) {
        update student;
        return student;
    }

    @AuraEnabled
    public static void deleteStudent(Id studentId) {
        delete [SELECT Id FROM Student__c WHERE Id = :studentId LIMIT 1];
    }

    @AuraEnabled(cacheable=true)
    public static List<Attendance__c> getAttendance(String studentId) {
        return [SELECT Id, Attendance_Status__c, Date__c, Reason_for_Absence__c FROM Attendance__c WHERE Student_ID__c = :studentId];
    }

    @AuraEnabled
    public static Attendance__c createAttendance(Attendance__c attendance) {
        insert attendance;
        return attendance;
    }

    @AuraEnabled(cacheable=true)
    public static List<Academic__c> getAcademics(String studentId) {
        return [SELECT Id, Name, Exam__c, Marks__c, Total_Marks__c, Percentage__c, Status__c FROM Academic__c WHERE Student_ID__c = :studentId];
    }

    @AuraEnabled
    public static Academic__c createAcademic(Academic__c academic) {
        insert academic;
        return academic;
    }

    @AuraEnabled(cacheable=true)
    public static List<ExtraCurricular_Activity__c> getActivities(String studentId) {
        return [SELECT Id, Name, Achievement__c, Participation_Date__c FROM ExtraCurricular_Activity__c WHERE Student_ID__c = :studentId];
    }

    @AuraEnabled
    public static ExtraCurricular_Activity__c createActivity(ExtraCurricular_Activity__c activity) {
        insert activity;
        return activity;
    }
}
