import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dbConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'bblyasha',
  database: 'typescript-practice',
  autoLoadModels: true,
  synchronize: true,
};
