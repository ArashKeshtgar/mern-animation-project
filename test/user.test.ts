import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import User from '../models/User';

chai.should();
chai.use(chaiHttp);

describe('Auth', () => {
  before(async () => {
    await User.deleteMany({});
  });

  it('registers a new user', (done) => {
    const user = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123'
    };

    chai.request(app)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
});
