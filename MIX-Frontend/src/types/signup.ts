export interface SignupFormProps {
  onSubmit: (event: React.FormEvent, formData: SignupFormData) => void;
}

export interface SignupFormData {
  Name: string;
  LastName: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
  BirthDate: string;
  Education: string;
  ProfilePic: string | null;
  IDJobPosition: string;
}