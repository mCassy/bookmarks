import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { EditUserDto } from '../src/user/dto';
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen('3333');

    prisma = app.get(PrismaService);

    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const authDto = {
      email: 'misha@raceid.com',
      password: '9xpp18pp',
    };
    describe('Signup', () => {
      it('should throw exception if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: authDto.password,
          })
          .expectStatus(400);
      });

      it('should throw exception if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: authDto.email,
          })
          .expectStatus(400);
      });

      it('should throw exception if no request body', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(authDto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw exception if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: authDto.password,
          })
          .expectStatus(400);
      });

      it('should throw exception if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: authDto.email,
          })
          .expectStatus(400);
      });

      it('should throw exception if no request body', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({})
          .expectStatus(400);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(authDto)
          .expectStatus(200);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(authDto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .get('/users/me')
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit current user', () => {
        const dto: EditUserDto = {
          firstname: 'Great',
          lastname: 'Stuff',
        };
        return pactum
          .spec()
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .patch('/users/me')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstname)
          .expectBodyContains(dto.lastname);
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Create bookmark', () => {
      it.todo('should create bookmark');
    });
    describe('Get bookmarks', () => {
      it.todo('should get bookmarks');
    });

    describe('Get bookmark by id', () => {
      it.todo('should get bookmark by id');
    });

    describe('Edit bookmark', () => {
      it.todo('should edit bookmark');
    });

    describe('Delete bookmark', () => {
      it.todo('should delete bookmark');
    });
  });
  it.todo('it should pass');
});
