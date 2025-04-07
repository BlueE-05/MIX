import { sql, pool } from "../db/index";
import { UserDTO } from "../types/user";
import { Auth0User } from "../types/auth0";

export class UserDbService {
  constructor(private db: sql.ConnectionPool) {}

  async createUser(user: UserDTO & Pick<Auth0User, "email_verified">) {
    const bufferPic = user.ProfilePic
      ? Buffer.from(user.ProfilePic.replace(/^data:image\/\w+;base64,/, ""), "base64")
      : null;

    await this.db.request()
      .input("name", sql.NVarChar, user.Name)
      .input("lastName", sql.NVarChar, user.LastName)
      .input("email", sql.NVarChar, user.Email)
      .input("emailVerified", sql.Bit, user.email_verified)
      .input("phoneNumber", sql.NVarChar, user.PhoneNumber)
      .input("birthDate", sql.Date, user.BirthDate)
      .input("jobPosition", sql.NVarChar, user.JobPosition || null)
      .input("education", sql.NVarChar, user.Education)
      .input("profilePic", sql.VarBinary(sql.MAX), bufferPic)
      .input("idTeam", sql.Int, user.idTeam ? parseInt(user.idTeam) : null)
      .query(`
        INSERT INTO [User] (
          Name, LastName, Email, EmailVerified,
          PhoneNumber, BirthDate, JobPosition, Education,
          ProfilePic, IDTeam
        ) VALUES (
          @name, @lastName, @email, @emailVerified,
          @phoneNumber, @birthDate, @jobPosition, @education,
          @profilePic, @idTeam
        )
      `);
  }
  async getUserByEmail(email: string) {
    try {
      console.log("Searching getUserByEmail()", email);
      
      const result = await this.db.request()
        .input("email", sql.NVarChar, email.toLowerCase())
        .query(`
          SELECT 
            u.ID,
            u.Name,
            u.LastName,
            u.Email,
            u.EmailVerified,
            u.PhoneNumber,
            u.BirthDate,
            u.JoiningDate,
            u.JobPosition,
            u.Education,
            u.IDTeam,
            t.TeamName AS TeamName,
            u.ProfilePic
          FROM [User] u
          LEFT JOIN [Team] t ON u.IDTeam = t.ID
          WHERE LOWER(u.Email) = @email
        `);
  
      console.log("getUserByEmail():", result.recordset[0]);
      
      const user = result.recordset[0];
      if (!user) return null;
  
      return {
        ...user,
        ProfilePic: user.ProfilePic 
          ? `data:image/png;base64,${user.ProfilePic.toString("base64")}` 
          : null,
      };
    } catch (error) {
      console.error("ERROR getUserByEmail():", error);
      throw error;
    }
  }  
}
