import { userSeeder } from "../../../seeders/user.seeder";

export const initSeeder = async () => {
  await userSeeder();
};
