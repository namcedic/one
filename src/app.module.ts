import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: undefined,
      useFactory() {
        return typeOrmConfig;
      },
      dataSourceFactory: async (options: DataSourceOptions) => {
        if (!options) {
          throw new Error('DataSourceOptions is required');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
