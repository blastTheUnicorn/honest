var chai = require('chai');

var expect = require('chai').expect();

var should = require('chai').should();

var chaiHttp = require('chai-http');

var server = require('../server');

chai.use(chaiHttp);

describe('server', function(){
  it('it should GET \'Hello World!\'', function(done){
    chai.request(server)
        .get('/')
        .end(function(err, res){
          res.body.should.be.a.string;
          res.body.have.status(200);
          res.body.should.be('Hello World!')
          done();
        })
  })
})
