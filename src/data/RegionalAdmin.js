const RegionalAdmin = {
  personaData: {
    personalInformation: {
      user_id: 3,
      persona_type: "Regional Admin",
      firstName: "Rajesh",
      lastName: "Angadi",
      email: "Rajesh.angadi@driscolls.com",
      phoneNo: "+1 - 55 - 123456",
      country: "United States",
      status: "ACTIVE",
      language: "English",
      assignments: [
        { Baja: [] },
        { "Central Coast California": [] },
        { "Pacific North West": [] }
      ],
      assignmentLabel: "ASSIGNED DISTRICTS"
    },
    accessibleFeatures: {
      "Invite Users": {
        "User Type": ["Ranch Admin"],
        "Personal Information": {
          "Ranch Admin": [
            "First Name",
            "Last Name",
            "Email",
            "Organization-Select",
            "Country",
            "Preferred Language",
            "Job Title"
          ]
        },
        Assignment: {
          "Ranch Admin": {
            AssignmentMessage: "COMPANY ASSIGNMENT",
            placeholderFirst: "Select District",
            placeholderSecond: "Select Companies",
            dataFirst: [
              "South California",
              "Central Valley California ",
              "Jacona",
              "Pacific North West"
            ],
            dataSecond: [
              "Eisele Farms, Inc. - 0001",
              "Cowles Berry Farms, Inc. - 0010",
              "DeBernardi Brothers - 0009",
              "Blackjack Farms De La Costa Central, Inc. - 0006"
            ]
          }
        }
      },
      "Manage Users": {
        filterTypes: ["All", "Ranch Admin", "Ranch Planner"]
      },
      FAQ: ["create", "view"],
      "Reminder Time": ["create", "view"],
      Reports: null,
      canDelete: true,
      canDeactivate: true
    }
  }
};

export default RegionalAdmin;
