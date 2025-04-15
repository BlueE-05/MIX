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
      .input("education", sql.NVarChar, user.Education)
      .input("profilePic", sql.VarBinary(sql.MAX), bufferPic)
      .input("idJobPosition", sql.Int, user.IDJobPosition ? parseInt(user.IDJobPosition) : null)
      .query(`
        INSERT INTO [User] (
          Name, LastName, ID, EmailVerified,
          PhoneNumber, BirthDate, Education,
          ProfilePic, IDJobPosition
        ) VALUES (
          @name, @lastName, @email, @emailVerified,
          @phoneNumber, @birthDate, @education,
          @profilePic, @idJobPosition
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
            u.PhoneNumber,
            u.JoiningDate,
            u.Education,
            jp.Name AS JobPositionName,
            u.ProfilePic
          FROM [User] u
          INNER JOIN [JobPosition] jp ON u.IDJobPosition = jp.ID
          WHERE LOWER(u.ID) = @email
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
