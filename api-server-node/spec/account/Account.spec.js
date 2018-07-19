const request = require('supertest');
const should = require('should');
const app = require('../../app');
const sequelize = require('../../src/configuration/sequelizeConfiguration');
const Account = require('../../src/account/Account');

const accountSample = [{
  username: 'sample',
  name: 'sample',
  password: 'sample',
  email: 'sample@sample.com',
  role: 'admin',
  description: 'sample data'
}];
before(() => sequelize.sync({force: true}));
before(() => Account.bulkCreate(accountSample));

describe('POST /accounts', () => {
  describe('성공시', () => {
    let accountSendMessage = {
      username: 'test',
      name: 'test',
      password: 'test',
      email: 'test@test.com',
      role: 'admin',
      description: 'test'
    };

    let body;
    before(done => {
      request(app)
        .post('/accounts')
        .send(accountSendMessage)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it('생성된 account 객체를 반환한다.', () => {
      body.should.be.instanceOf(Object);
    });
    it('입력한 account 데이터를 반환한다.', () => {
      body.should.have.property('username', accountSendMessage.username);
      body.should.have.property('name', accountSendMessage.name);
      body.should.have.property('email', accountSendMessage.email);
      body.should.have.property('role', accountSendMessage.role);
      body.should.have.property('description', accountSendMessage.description);
    });
  });

  describe('실패시', () => {
    it('잘못된 속성일 경우 400를 반환한다.', (done) => {
      let accountDuplicatedUsernameSendMessage = {
        name: 'test_1',
        password: 'test_1',
        email: 'test_1@test.com',
        role: 'admin',
        description: 'test'
      };
      request(app)
        .post('/accounts')
        .send(accountDuplicatedUsernameSendMessage)
        .set('Accept', 'application/json')
        .expect(400)
        .end(done);
    });

    it('username이 중복일 경우 400를 반환한다.', (done) => {
      let accountDuplicatedUsernameSendMessage = {
        username: 'test',
        name: 'test_1',
        password: 'test_1',
        email: 'test_1@test.com',
        role: 'admin',
        description: 'test'
      };
      request(app)
        .post('/accounts')
        .send(accountDuplicatedUsernameSendMessage)
        .set('Accept', 'application/json')
        .expect(400)
        .end(done);
    });

    it('e-mail이 중복일 경우 400를 반환한다.', (done) => {
      let accountDuplicatedEmailSendMessage = {
        username: 'test_1',
        name: 'test_1',
        password: 'test_1',
        email: 'test@test.com',
        role: 'admin',
        description: 'test'
      };

      request(app)
        .post('/accounts')
        .send(accountDuplicatedEmailSendMessage)
        .set('Accept', 'application/json')
        .expect(400)
        .end(done);
    });
  });
});

describe('GET /account', () => {
  describe('성공시', () => {
    it('상태코드 200과 유저 객체를 담은 배열로 응답한다', (done) => {
      request(app)
        .get('/accounts')
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it('Sample account 데이터를 배열의 0번째에 반환한다.', (done) => {
      request(app)
        .get('/accounts')
        .end((err, res) => {
          res.body[0].username.should.equal('sample');
          res.body[0].name.should.equal('sample');
          res.body[0].email.should.equal('sample@sample.com');
          res.body[0].role.should.equal('admin');
          res.body[0].description.should.equal('sample data');
          done();
        });

    });
  });
  describe('실패시', () => {
  });
});

describe('GET /account/:id', () => {
  describe('성공시', () => {
    it('상태코드 200과 유저 id가 1인 데이터를 반환한다', (done) => {
      request(app)
        .get('/accounts/1')
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('id', '1');
          done();
        });
    });
    it('Sample account 데이터를 반환한다.', (done) => {
      request(app)
        .get('/accounts')
        .end((err, res) => {
          res.body[0].username.should.equal('sample');
          res.body[0].name.should.equal('sample');
          res.body[0].email.should.equal('sample@sample.com');
          res.body[0].role.should.equal('admin');
          res.body[0].description.should.equal('sample data');
          done();
        });

    });
  });
  describe('실패시', () => {
    it('해당 id에 대한 데이터가 없을 경우 상태 코드 404를 반환한다', (done) => {
      request(app)
        .get('/accounts/100')
        .expect(404)
        .end((err, res) => {
          res.body.code.should.equal('AccountController-E002');
          res.body.title.should.equal('Account Not Found by Id');
          res.body.message[0].message.should.equal('100 Not exist');
          done();
        });
    });
    it('해당 id가 숫자가 아닐경우 400에러는 반환한다.', (done) => {
      request(app)
        .get('/accounts/one')
        .expect(400)
        .end((err, res) => {
          res.body.code.should.equal('AccountController-E002');
          res.body.message.should.equal('Id must be a number.');
          done();
        });
    });
  });
});

describe('PUT /accounts/:id', () => {
  describe('성공시', () => {
    let accountSendMessage = {
      name: 'put_test',
      password: 'put_test',
      email: 'put_test@test.com',
      description: 'put_test'
    };

    let body;
    before(done => {
      request(app)
        .put('/accounts/2')
        .send(accountSendMessage)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it('생성된 account 객체를 반환한다.', () => {
      body.should.be.instanceOf(Object);
    });
    it('입력한 account 데이터를 반환한다.', () => {
      body.should.have.property('name', accountSendMessage.name);
      body.should.have.property('email', accountSendMessage.email);
      body.should.have.property('description', accountSendMessage.description);
    });
  });

  describe('실패시', () => {
    it('해당 id에 대한 데이터가 없을 경우 상태 코드 400를 반환한다', (done) => {
      request(app)
        .put('/accounts/100')
        .expect(400)
        .end((err, res) => {
          res.body.code.should.equal('AccountController-E002');
          res.body.title.should.equal('Account Not Found by Id');
          res.body.message[0].message.should.equal('100 Not exist');
          done();
        });
    });
    it('해당 id가 숫자가 아닐경우 400에러는 반환한다.', (done) => {
      request(app)
        .put('/accounts/one')
        .expect(400)
        .end((err, res) => {
          res.body.code.should.equal('AccountController-E002');
          res.body.message.should.equal('Id must be a number.');
          done();
        });
    });
  });
});

describe('PUT /accounts/signIn', () => {
  describe('성공시', () => {
    let accountSendMessage = {
      username: 'sample',
      password: 'sample',
    };

    let body;
    before(done => {
      request(app)
        .put('/accounts/signIn')
        .send(accountSendMessage)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it('생성된 account 객체를 반환한다.', () => {
      body.should.be.instanceOf(Object);
    });
    it('일치하는 account 데이터를 반환한다.', () => {
      body.should.have.property('username', accountSendMessage.username);
    });
  });

  describe('실패시', () => {
    it('해당 id에 대한 데이터가 없을 경우 상태 코드 400를 반환한다', (done) => {
      let accountSendMessage = {
        username: 'sample_ex',
        password: 'sample',
      };
      request(app)
        .put('/accounts/signIn')
        .send(accountSendMessage)
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          res.body.code.should.equal('AccountController-E002');
          res.body.title.should.equal('Bad Request during account sign-in process.');
          res.body.message[0].message.should.equal('sample_ex Not exist');
          done();
        });
    });
    it('해당 id에 대한 password가 틀릴 경우 상태 코드 400를 반환한다', (done) => {
      let accountSendMessage = {
        username: 'sample',
        password: 'sample_ex',
      };
      request(app)
        .put('/accounts/signIn')
        .send(accountSendMessage)
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          res.body.code.should.equal('AccountController-E002');
          res.body.title.should.equal('Bad Request during account sign-in process.');
          res.body.message[0].message.should.equal('sample Passwords do not match');
          done();
        });
    });
  });
});

describe('DELETE /accounts/:id', () => {
  describe('성공시', () => {
    it('상태코드 204를 반환한다', (done) => {
      request(app)
        .delete('/accounts/2')
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(204);
          done();
        });
    });
  });

  describe('실패시', ()=>{
    it('해당 id가 숫자가 아닐경우 400에러는 반환한다.', (done) => {
      request(app)
        .delete('/accounts/one')
        .expect(400)
        .end((err, res) => {
          res.body.code.should.equal('AccountController-E002');
          res.body.message.should.equal('Id must be a number.');
          done();
        });
    });
  });
});