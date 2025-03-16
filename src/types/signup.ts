export interface SignupFormProps {
    onSubmit: (event: React.FormEvent, formData: SignupFormData) => void;
  }
  
export interface SignupFormData {
    name: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    birthDate: string;
    education: string;
    profilePic: File | null;
    idTeam: string;
    jobPosition: string;
}
  
