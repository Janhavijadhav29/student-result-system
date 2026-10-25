export const APP_TITLE = "Student Result Management System";

export const ENTITIES = [
  {
    "key": "students",
    "label": "Students",
    "singular": "Student",
    "path": "students",
    "searchLabel": "Name",
    "fields": [
      {
        "name": "rollNo",
        "label": "Roll No",
        "type": "text",
        "required": true
      },
      {
        "name": "name",
        "label": "Name",
        "type": "text",
        "required": true
      },
      {
        "name": "className",
        "label": "Class",
        "type": "text",
        "required": true
      },
      {
        "name": "email",
        "label": "Email",
        "type": "text",
        "required": false
      }
    ]
  },
  {
    "key": "results",
    "label": "Results",
    "singular": "Result",
    "path": "results",
    "searchLabel": "Roll No",
    "fields": [
      {
        "name": "rollNo",
        "label": "Roll No",
        "type": "text",
        "required": true
      },
      {
        "name": "examName",
        "label": "Exam",
        "type": "text",
        "required": true
      },
      {
        "name": "subject",
        "label": "Subject",
        "type": "text",
        "required": true
      },
      {
        "name": "marks",
        "label": "Marks",
        "type": "number",
        "required": true
      },
      {
        "name": "maxMarks",
        "label": "Max Marks",
        "type": "number",
        "required": true
      }
    ]
  }
];
