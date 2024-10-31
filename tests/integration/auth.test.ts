import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/index';
import { AppDataSource } from '../../src/config/db';

describe('Autenticação', () => {
    before(async () => {
        await AppDataSource.initialize();
    });

    after(async () => {
        await AppDataSource.destroy();
    });

    describe('POST /auth/register', () => {
        it('deve registrar um novo usuário com sucesso', async () => {
            const response = await request(app).post('/auth/register').send({
                username: 'usuarioTeste',
                password: 'senhaSegura123',
            });

            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Usuário registrado com sucesso');
        });

        it('deve retornar erro para dados inválidos', async () => {
            const response = await request(app).post('/auth/register').send({
                username: 'us',
                password: '123',
            });

            expect(response.status).to.equal(400);
            expect(response.body.errors).to.be.an('array').that.is.not.empty;
        });
    });

    describe('POST /auth/login', () => {
        it('deve logar com sucesso e retornar um token JWT', async () => {
            await request(app).post('/auth/register').send({
                username: 'usuarioTeste',
                password: 'senhaSegura123',
            });

            const response = await request(app).post('/auth/login').send({
                username: 'usuarioTeste',
                password: 'senhaSegura123',
            });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('token');
        });

        it('deve retornar erro para credenciais inválidas', async () => {
            const response = await request(app).post('/auth/login').send({
                username: 'usuarioInvalido',
                password: 'senhaErrada',
            });

            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Credenciais inválidas');
        });
    });
});
