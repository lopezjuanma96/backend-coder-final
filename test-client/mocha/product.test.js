import supertest from 'supertest';
import { expect } from 'chai';
import server from '../../src/index.js'

let request;

describe('Functionality tests:', () => {

    before(async () => {
        request = supertest(`http://localhost:${server.address().port}`);
    })
    after(async () => {
        server.close();
    })

    describe('\t> Get Tests:', () => {
        it('Should return an empty array:', async () => {
            const response = await request.get('/products/api');
            expect(response.body.prodData.prods).to.eq([]);
        })
        it('Should return an error for looking for invalid ID:', async () => {
            const response = await request.get(`/products/api?id=0`);
            expect(response.body).to.eq({ err: 'Invalid Product ID' });
            expect(response.status).to.eq(400);
        })
    })
    
    describe(`\t> Post Tests:`, () => {
        it('Should find the just created product:', async () => {
            const created = await request.post('/products/api/add').send(
                {
                    name: 'test',
                    price: 1,
                    stock: 1,
                    thumbnail: 'test',
                    created: Date.now(),
                    updated: Date.now()
                }
            );
            const response = await request.get(`/products/api?id=${created.body.id}`)
            expect(created.body).to.eq(response.body)
        })        
    })

    describe('\t> Put Tests:', () => {

    })

    describe(`\t> Delete Tests:`, () => {

    })
})