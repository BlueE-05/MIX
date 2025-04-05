export const teams = [
  { id: 1, name: "Sales" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Customer Support" },
  { id: 4, name: "Development" },
  { id: 5, name: "Operations" },
];

export const educationLevels = [
  "High School Diploma",
  "Technical High School Diploma",
  "Higher Education",
];

export const fieldLabels: { [key: string]: string } = {
  Name: "First Name",
  LastName: "Last Name",
  BirthDate: "Birth Date",
  PhoneNumber: "Phone Number",
  Email: "Email Address",
  Password: "Password",
  Education: "Education Level",
  ProfilePic: "Profile Picture",
  IdTeam: "Team (To be confirmed)",
  JobPosition: "Job Position (To be confirmed)",
};

export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;
export const birthDateRange = { min: "1935-01-01", max: "2009-12-31" };
