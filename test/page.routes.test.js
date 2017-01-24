var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
const models = require('../models');
const Page = models.Page;

describe('http requests', function () {

  // beforeEach(function () {
  //   return Page.sync( {force: true} );
  // });

  describe('GET /wiki', function () {
    it('gets 200 on index', function (done) {
      agent
      .get('/wiki')
      .expect(200, done);
    });
  });

  describe('GET /wiki/add', function () {
    it('responds with 200', function (done) {
      agent
      .get('/wiki/add')
      .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle', function () {
    beforeEach(function () {
      return Page.create( {
        title: 'first thing',
        content: 'content for number one',
        status: 'open',
        tags: ['tag1', 'tag2']
      });
    });
    it('responds with 404 on page that does not exist', function (done) {
      agent
      .get('/wiki/fake_title')
      .expect(404, done);
    });
    it('responds with 200 on page that does exist', function (done) {
      agent
      .get('/wiki/first_thing')
      .expect(200, done);
    });
  });

  describe('GET /wiki/search/:tag', function () {
    it('responds with 200', function (done) {
      agent
      .get('/wiki/search/tag1')
      .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    beforeEach(function () {
      return Page.create( {
        title: 'first thing',
        content: 'content for number one',
        status: 'open',
        tags: ['tag1', 'tag2']
      });
    });

    it('responds with 404 for page that does not exist', function (done) {
      agent
      .get('/wiki/some_title/similar')
      .expect(404, done);
    });
    it('responds with 200 for similar page', function (done) {
      agent
      .get('/wiki/first_thing/similar')
      .expect(200, done);
    });
  });

  describe('POST /wiki', function () {

    it('responds with 302', function(done){
      agent
      .post('/wiki/')
      .send({
        authorName: 'terry and mike',
        authorEmail: 'me@email.com',
        title: 'title1',
        content: 'content for the new page',
        status: 'open'
      })
      .expect(302, done);

    });
    it('creates a page in the database', function (done) {
      agent
      .get('/wiki/title1')
      .expect(200, done);
    });
  });

});
