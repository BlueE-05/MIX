import { sql, pool } from "../db/index";
import { UserDTO } from "../types/user";
import { Auth0User } from "../types/auth0";

export class UserDbService {
  constructor(private db: sql.ConnectionPool) {}

  async createUser(user: UserDTO & Pick<Auth0User, "user_id" | "email_verified">) {
    const bufferPic = user.ProfilePic
      ? Buffer.from(user.ProfilePic.replace(/^data:image\/\w+;base64,/, ""), "base64")
      : null;

    await this.db.request()
      .input("auth0_id", sql.NVarChar, user.user_id)
      .input("email", sql.NVarChar, user.Email)
      .input("name", sql.NVarChar, user.Name)
      .input("lastName", sql.NVarChar, user.LastName)
      .input("birthDate", sql.Date, user.BirthDate)
      .input("phoneNumber", sql.NVarChar, user.PhoneNumber)
      .input("education", sql.NVarChar, user.Education)
      .input("jobPosition", sql.NVarChar, user.JobPosition || null)
      .input("idTeam", sql.NVarChar, user.idTeam || null)
      .input("emailVerified", sql.Bit, user.email_verified)
      .input("profilePic", sql.VarBinary(sql.MAX), bufferPic)
      .query(`
        INSERT INTO Users (
          ID, Email, Name, LastName, BirthDate,
          PhoneNumber, Education, JobPosition, IDTeam,
          EmailVerified, ProfilePic
        ) VALUES (
          @auth0_id, @email, @name, @lastName, @birthDate,
          @phoneNumber, @education, @jobPosition, @idTeam,
          @emailVerified, @profilePic
        )
      `);
  }
}
