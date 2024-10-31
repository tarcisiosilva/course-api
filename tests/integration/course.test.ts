import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/index';
import { AppDataSource } from '../../src/config/db';

let token: string;
let courseId: number;

describe('Course API', () => {
    before(async () => {
        await AppDataSource.initialize();

        // Criação de um usuário e obtenção de token
        await request(app).post('/auth/register').send({
            username: 'testUser',
            password: 'password123'
        });

        const res = await request(app).post('/auth/login').send({
            username: 'testUser',
            password: 'password123'
        });

        token = res.body.token;
    });

    after(async () => {
        await AppDataSource.destroy();
    });

    describe('POST /api/courses', () => {
        it('deve criar um novo curso', async () => {
            const response = await request(app)
                .post('/api/courses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Curso de Node.js',
                    description: 'Curso avançado de Node.js',
                    duration: '40h',
                    instructor: 'João Silva'
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('id');
            expect(response.body.title).to.equal('Curso de Node.js');
            courseId = response.body.id;
        });
    });

    describe('GET /api/courses', () => {
        it('deve retornar a lista de cursos', async () => {
            const response = await request(app)
                .get('/api/courses')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    describe('GET /api/courses/:id', () => {
        it('deve retornar os detalhes de um curso', async () => {
            const response = await request(app)
                .get(`/api/courses/${courseId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id', courseId);
            expect(response.body).to.have.property('title', 'Curso de Node.js');
        });
    });

    describe('PUT /api/courses/:id', () => {
        it('deve atualizar um curso existente', async () => {
            const response = await request(app)
                .put(`/api/courses/${courseId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Curso de Node.js Atualizado',
                    description: 'Curso avançado atualizado de Node.js',
                    duration: '45h',
                    instructor: 'João Silva'
                });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('title', 'Curso de Node.js Atualizado');
        });
    });

    describe('DELETE /api/courses/:id', () => {
        it('deve excluir um curso existente', async () => {
            const response = await request(app)
                .delete(`/api/courses/${courseId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).to.equal(204);
        });
    });
});
