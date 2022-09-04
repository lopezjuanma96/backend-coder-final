import axios from 'axios';

async function testGetProducts(url){
    const response = await axios.get(`${url}/products/api`);
    const list = response.data.prodData.prods;
    console.log('testGetProducts: ', list)
    if (typeof(list) != typeof(Array.prototype)) throw new Error('GetProducts did not return an array');
}

async function testGetProductById(url, id){
    const response = await axios.get(`${url}/products/api?id=${id}`)
    const prod = response.data.prodData.prods;
    console.log('testGetProduct: ', prod)
    if (Object.keys(prod).length === 0) throw new Error('GetProductById did not found product');
}

async function testPostProduct(url){
    const response = await axios.post(`${url}/products/api/add`, {
        name : 'test',
        price : 1,
        stock : 1,
        thumbnail : 'test',
        creation : Date.now(),
        lastUpdate : Date.now()
    })
    console.log('testPostProduct: ', response.data)
    return prod
}

async function testPutProduct(url, id){
    const responseBefore = await axios.get(`${url}/products/api?id=${id}`);
    const prodBefore = responseBefore.data.prodData.prods;
    const responseAfter = await axios.put(`${url}/products/api/addStock?id=${id}&q=1`);
    const prodAfter = responseAfter.data;
    console.log('testPutProduct: ', prodBefore, prodAfter);
    if (prodBefore.stock !== prodAfter.stock - 1) throw new Error('PutProduct did not add to stock');
    return prod
}

async function testDeleteProduct(url, id){
    await axios.delete(`${url}/products/remove?id=${id}`)
    const response = await axios.get(`${url}/products/api?id=${id}`)
    const prod = response.data.prodData.prods;
    if (Object.keys(prod).length !== 0) throw new Error('ProductDelete did not delete product');
}

async function testAll(url){
    await testGetProducts(url);
    const newProd = await testPostProduct(url);
    await testGetProductById(url, newProd.id);
    const updatedProd = await testPutProduct(url, newProd.id);
    await testDeleteProduct(url, newProd.id);
    console.log('Tests passed');
}

await testAll('http://localhost:8080');