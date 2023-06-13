const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });


//Arroja error si no recibe un string como id...
    describe('id STRING', () => {
      it('should throw an error if the id is not a STRING', (done) => {
        Country.create({
          id: !String
        })
          .then(() => done('should not be created'))
          .catch(() => done())
      })
    });
  });
});
