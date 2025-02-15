import { UserType } from "../app/user/user.dto";
import { createUser, getUserByUsername } from "../app/user/user.service";

export const userSeeder = async () => {
  const userName = "admin";
  const password = "Admin@123";
  const isAdminAvailable = await getUserByUsername(userName);
  if (!isAdminAvailable) {
    await createUser({
      userName,
      password,
      role: UserType.ADMIN,
    });
    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }
};
