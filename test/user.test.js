process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-store-test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/User');

chai.should();
chai.use(chaiHttp);

describe('Auth', () => {
  before((done) => {
    User.deleteMany({}, () => done());
  });

  it('registers a new user', (done) => {
    const user = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123'
    };

    chai.request(server)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
});
