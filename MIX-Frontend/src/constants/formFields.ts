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
  IDTeam: "Team (To be confirmed)",
  IDJobPosition: "Job Position (To be confirmed)",
};

export const fieldMaxLengths: { [key: string]: number } = {
  Name: 100,
  LastName: 100,
  PhoneNumber: 30,
  Email: 255,
  Password: 150,
  Education: 255,
};

export const fieldMinLengths: { [key: string]: number } = {
  Name: 2,
  LastName: 2,
  PhoneNumber: 13,
  Email: 5,
  Password: 8,
  Education: 2,
};

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const phoneRegex =
  /^\+?[1-9]\d{1,14}$/;

export const birthDateRange = {
  min: "1935-01-01",
  max: "2009-12-31",
};