const SuperAdmin = {
  personaData: {
    personalInformation: {
      user_id: 2,
      persona_type: "Harvest Planner",
      firstName: "Rishu",
      lastName: "Agrawal",
      email: "Rishu.agrawal@driscolls.com",
      phoneNo: "+44 - 55 - 123456",
      country: "Mexico",
      status: "ACTIVE",
      language: "Spanish",
      assignments: [
        {
          "Pacific North West": [
            { label: "Blackberry", value: "Blackberry" },
            { label: "Blueberry", value: "Blueberry" },
            { label: "Rasberry", value: "Rasberry" },
            { label: "Strawberry", value: "Strawberry" }
          ]
        },
        {
          "Pacific North West": [
            { label: "Blueberry", value: "Blueberry" },
            { label: "Strawberry", value: "Strawberry" }
          ]
        },
        {
          Tapalpa: [{ label: "Blackberry", value: "Blackberry" }]
        }
      ],
      assignmentLabel: "DISTRICTS & BERRY TYPES ASSIGNMENT"
    },
    accessibleFeatures: {
      "Invite Users": {
        "User Type": [],
        "Personal Information": {},
        Assignment: {
          "Regional Admin": {
            AssignmentMessage: "ASSIGN DISTRICTS",
            placeholderFirst: "Select districts",
            dataFirst: [
              "Northern California",
              "Central Coast California",
              "South California",
              "Central Valley California ",
              "Jacona",
              "Pacific North West",
              "Jocotepec",
              "Tapalpa",
              "Baja"
            ],
            dataSecond: []
          },
          "Harvest Planner": {
            AssignmentMessage: "ASSIGN DISTRICTS AND BERRY TYPES",
            placeholderFirst: "Select District",
            placeholderSecond: "Select Berry Types",
            dataFirst: [
              "Northern California",
              "Central Coast California",
              "South California",
              "Central Valley California ",
              "Jacona",
              "Pacific North West",
              "Jocotepec",
              "Tapalpa",
              "Baja"
            ],
            dataSecond: ["Strawberry", "Blackberry", "Blueberry", "Rasberry"]
          }
        }
      },
      "Manage Users": {
        filterTypes: [
          "All",
          "Regional Admin",
          "Harvest Planner",
          "Ranch Admin",
          "Ranch Planner"
        ]
      },
      FAQ: ["create", "view"],
      "Reminder Time": ["create", "view"],
      Reports: null,
      canDelete: true,
      canDeactivate: true
    }
  }
};

export default SuperAdmin;
