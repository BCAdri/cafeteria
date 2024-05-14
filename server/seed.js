const { faker } = require('@faker-js/faker');
const MongoClient = require("mongodb").MongoClient;
const _ = require("lodash");

async function main() {
    const uri = "mongodb+srv://byadrian05:wcSZLmq9ZLRTQLqQ@simcafs.7zjrbmd.mongodb.net/";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const productsCollection = client.db("simcafs").collection("products");
        const categoriesCollection = client.db("simcafs").collection("categories");

        let categories = ['bebidas', 'bocadillos', 'principales', 'especiales'].map((category) => { return { name: category } });
        await categoriesCollection.insertMany(categories);

        let products = [];
        for (let i = 0; i < 10; i+=1) {
            let newProduct = {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price({ min: 4, max: 13, symbol: '€' }),
                category: _.sample(categories),
                imageUrl: faker.image.url()
            };
            products.push(newProduct);
        }
        await productsCollection.insertMany(products);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();