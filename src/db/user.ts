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
      .input("idTeam", sql.NVarChar, user.idTeam || null)
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
}
