import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { TaskModule } from './task/task.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TaskModule,
    // RedisModule.forRoot({
    //   readyLog: true,
    //   config: {
    //     host: 'redis',
    //     port: 6379,
    //   },
    //   closeClient: true,
    // }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
