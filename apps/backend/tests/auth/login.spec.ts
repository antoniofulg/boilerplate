import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

/**
 * API Integration Test: Auth Login
 * 
 * Tests:
 * - POST /auth/login with valid credentials
 * - POST /auth/login with invalid credentials
 * - GET /dashboard/snapshot (requires authentication)
 */
describe('Auth API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('should return session payload for valid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          emailInstitucional: 'mesa@camara.gov.br',
          senha: 'senha123',
        })
        .expect(200);

      expect(response.body).toHaveProperty('userName');
      expect(response.body).toHaveProperty('role');
      expect(response.body).toHaveProperty('chamber');
      expect(response.body).toHaveProperty('issuedAt');
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should return 401 for invalid credentials', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          emailInstitucional: 'invalid@example.com',
          senha: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('GET /dashboard/snapshot', () => {
    it('should return dashboard snapshot when authenticated', async () => {
      // First login to get session cookie
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          emailInstitucional: 'mesa@camara.gov.br',
          senha: 'senha123',
        });

      const cookies = loginResponse.headers['set-cookie'];

      // Then fetch dashboard with session cookie
      const dashboardResponse = await request(app.getHttpServer())
        .get('/dashboard/snapshot')
        .set('Cookie', cookies)
        .expect(200);

      expect(dashboardResponse.body).toHaveProperty('currentSession');
      expect(dashboardResponse.body).toHaveProperty('agendaItem');
      expect(dashboardResponse.body).toHaveProperty('memberPresence');
      expect(dashboardResponse.body).toHaveProperty('recentResults');
    });

    it('should return 401 when not authenticated', async () => {
      await request(app.getHttpServer())
        .get('/dashboard/snapshot')
        .expect(401);
    });
  });
});

