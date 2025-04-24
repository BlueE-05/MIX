import { sql, pool } from "../db/index";
import { UserDTO } from "../types/user";
import { Auth0User } from "../types/auth0";

export class UserDbService {
  constructor(private db: sql.ConnectionPool) {}

  public async createUser(user: UserDTO & Pick<Auth0User, "email_verified">): Promise<void> {
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

  public async getUserByEmail(email: string): Promise<UserDTO | null> {
    const isAdmin = await this.isUserAdmin(email);
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
          u.EmailVerified,
          jp.Name AS JobPositionName,
          u.ProfilePic
        FROM [User] u
        INNER JOIN [JobPosition] jp ON u.IDJobPosition = jp.ID
        WHERE LOWER(u.ID) = @email
      `);

    const user = result.recordset[0];
    if (!user) return null;

    return {
      ...user,
      EmailVerified: user.EmailVerified,
      ProfilePic: user.ProfilePic 
        ? `data:image/png;base64,${user.ProfilePic.toString("base64")}` 
        : null,
      isAdmin,
    };
  }

  public async updateEmailVerified(email: string, email_verified: boolean): Promise<void> {
    await this.db.request()
      .input("email", sql.NVarChar, email.toLowerCase())
      .input("emailVerified", sql.Bit, email_verified)
      .query(`
        UPDATE [User]
        SET EmailVerified = @emailVerified
        WHERE LOWER(ID) = @email
      `);
  }

  public async getLastVerificationSent(email: string): Promise<Date | null> {
    const result = await this.db.request()
      .input("email", sql.NVarChar, email.toLowerCase())
      .query(`
        SELECT LastVerificationSent
        FROM [User]
        WHERE LOWER(ID) = @email
      `);

    return result.recordset[0]?.LastVerificationSent ?? null;
  }

  public async updateLastVerificationSent(email: string): Promise<void> {
    await this.db.request()
      .input("email", sql.NVarChar, email.toLowerCase())
      .query(`
        UPDATE [User]
        SET LastVerificationSent = GETDATE()
        WHERE LOWER(ID) = @email
      `);
  }

  public async isUserAdmin(email: string): Promise<boolean> {
    const result = await this.db.request()
      .input("email", sql.NVarChar, email.toLowerCase())
      .query(`
        SELECT 1
        FROM [Admin] a
        INNER JOIN [User] u ON a.IDUser = u.ID
        WHERE LOWER(u.ID) = @email
      `);
  
    return result.recordset.length > 0;
  }
  
}
