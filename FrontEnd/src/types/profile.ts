export interface ProfileData {
    name: string;
    lastName: string;
    position: string;
    email: string;
    phone: string;
    dateOfJoining: string;
    education: string;
    profilePic: string | null;
}

export interface LayOutProfileData {
    name: string;
    lastName: string;
    profilePic: string | null;
    emailVerified: boolean;
}