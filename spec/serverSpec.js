var chai = require('chai');

var expect = require('chai').expect();

var should = require('chai').should();

var chaiHttp = require('chai-http');

var server = require('../server/server');

chai.use(chaiHttp);

describe('server', function(){
  // it('it should have a status code of 200', function(done){
  //   chai.request(server)
  //       .get('/test')
  //       .end(function(err, res){
  //         res.should.have.status(200);
  //         done();
  //       })
  // })
  // it('it should have a res.body property', function(done){
  //   chai.request(server)
  //       .get('/test')
  //       .end(function(err, res){
  //         res.should.have.a.property('body');
  //         done();
  //       })
  // })
})







