const RanchAdmin = {
  personaData: {
    personalInformation: {
      user_id: 4,
      persona_type: "Ranch Admin",
      firstName: "Rishu",
      lastName: "Agrawal",
      email: "Rishu.agrawal@enquero.com",
      phoneNo: "+1 - 68 - 126757",
      country: "United States",
      status: "ACTIVE",
      language: "English",
      jobTitle: "Ranch Foreman",
      assignments: [
        {
          "Northern California": [
            { label: "DeBernardi Brothers ", value: "DeBernardi Brothers " },
            { label: "Driscoll's, Inc.", value: "Driscoll's, Inc." },
            { label: "Eisele Farms, Inc.", value: "Eisele Farms, Inc." }
          ]
        },
        {
          "Pacific North West": [
            {
              label: "Blackjack Farms De La Costa Central, Inc.",
              value: "Blackjack Farms De La Costa Central, Inc."
            },
            {
              label: "Cowles Berry Farms, Inc.",
              value: "Cowles Berry Farms, Inc."
            }
          ]
        }
      ],
      assignmentLabel: "ASSIGNED COMPANIES"
    },
    accessibleFeatures: {
      "Invite Users": {
        "User Type": ["Ranch Planner"],
        "Personal Information": {
          "Ranch Planner": [
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
          "Ranch Planner": {
            AssignmentMessage: "RANCH ASSIGNMENT",
            placeholderFirst: "Select Company",
            placeholderSecond: "Select Ranches",
            dataFirst: [
              "Eisele Farms, Inc. - 0001",
              "Cowles Berry Farms, Inc. - 0010",
              "DeBernardi Brothers - 0009",
              "Blackjack Farms De La Costa Central, Inc. - 0006"
            ],
            dataSecond: [
              "Koehnke #2 Farms - 0003",
              "DSA Test Plot - 0030",
              "Royal Oaks West WP 17-18"
            ]
          }
        }
      },
      "Manage Users": {
        filterTypes: ["Ranch Planner"]
      },
      FAQ: ["create", "view"],
      "Reminder Time": ["create", "view"],
      Reports: null,
      canDelete: true,
      canDeactivate: true
    }
  }
};

export default RanchAdmin;
