const { Readable } = require('stream');
const fs = require('fs');
const faker = require('faker');


/* global TEST_ENV */
const bellcurveNumber = (min, max) => {
  let result = 0;
  for (let i = 0; i < 3; i++) {
    result += faker.random.number({ max, min });
  }
  result = Math.round(result / 3);

  return result;
};

var count = 1;


const writeableStream = fs.createWriteStream('data-pg.csv');

const inStream = new Readable({
  read() {
    this.push(`${count},${faker.lorem.paragraph(5)},${faker.random.number(47)},${faker.date.past(5)},${bellcurveNumber(1, 5)},${faker.random.boolean()},${faker.internet.userName()},${faker.lorem.sentence()},${faker.random.number(22)}\n`);
    count++;

      if (Math.random() < 0.95) {
        count--;
      }
    if (count === 10000000) {
      this.push(null);
    }
  }
});

inStream.pipe(writeableStream);


/*

const seedFunc = () => {
  return {
    product_id: count,
    body: faker.lorem.paragraph(5),
    helpful: faker.random.number(47),
    posting_date: faker.date.past(5),
    rating: bellcurveNumber(1, 5),
    recommend: faker.random.boolean(),
    reviewer: faker.internet.userName(),
    title: faker.lorem.sentence(),
    unhelpful: faker.random.number(22)
  };
};

*/