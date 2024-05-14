import { ProfileEntity } from "src/user/profile/entities/profile.entities";

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: '12345678',
    database: 'specialty_database',
    entities: [ProfileEntity],
    synchronize: true,
  };
  