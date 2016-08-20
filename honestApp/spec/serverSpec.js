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
          res.should.have.status(200);
          res.should.have.property('body');
          done();
        })
  })
})
