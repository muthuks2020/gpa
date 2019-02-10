const SuperAdmin = {
  personaData: {
    personalInformation: {
      user_id: 1,
      persona_type: "Super Admin",
      firstName: "Apratim",
      lastName: "Burgohain",
      email: "Apratim.buragohain@driscolls.com",
      phoneNo: "+44 - 55 - 123456",
      country: "Mexico",
      status: "ACTIVE",
      language: "Spanish"
    },
    accessibleFeatures: {
      "Invite Users": {
        "User Type": ["Regional Admin", "Harvest Planner"],
        "Personal Information": {
          "Regional Admin": [
            "First Name",
            "Last Name",
            "Email",
            "Organization-Static",
            "Country",
            "Preferred Language"
          ],
          "Harvest Planner": [
            "First Name",
            "Last Name",
            "Email",
            "Organization-Static",
            "Country",
            "Preferred Language"
          ]
        },
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
