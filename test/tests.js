const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const models = require('../models');
const Page = models.Page;

describe('something', function () {
  it('some test', function(){});
});

describe('Page model definition', function () {

  beforeEach('seed table', function(){
    let one = Page.create( {
      title: 'first thing',
      content: 'content for number one',
      status: 'open',
      tags: ['tag1', 'tag2']
    });
    let two = Page.create( {
      title: 'second thing',
      content: 'content for number two',
      status: 'open',
      tags: ['tag2']
    });
    let three = Page.create( {
      title: 'third thing',
      content: 'content for number three',
      status: 'open',
      tags: ['tag3']
    });

    return Promise.all([one, two, three]);
  });

  var page;
  beforeEach(function () {
    page = Page.build();
  });

  afterEach(function () {
    return Page.sync( {force: true} );
  });

  it('columns exist as objects, has colums title, urlTitle, content, status, and tags', function(){});
  it('title column has type of string and allowNull false.', function(){});

  describe('Virtuals', function () {
  describe('route', function () {
    it('returns the url_name prepended by "/wiki/"', function () {
      page.urlTitle = 'some_string';
      expect(page.route).to.be.equal('/wiki/some_string');
    });
  });

  describe('renderedContent', function () {
    it('converts the markdown-formatted content into HTML', function () {
      page.content = 'Hello this is content.';
      expect(page.renderedContent).to.be.equal('<p>Hello this is content.</p>\n');
    });
  });


  describe('Class methods', function () {
    describe('findByTag', function () {
      // page.tags.set(['tag1', 'tag2', 'tag3']);
      it('gets pages with the search tag', function () {
        return Page.findByTag('tag1')
        .spread( function (result) {
          // console.log(result);
          expect(result.id).to.be.equal(1);
        });

      });

      it('does not get pages without the search tag', function () {
        return Page.findByTag('tag5')
        .then( function (result) {
          // console.log(result);
          expect(result).to.have.lengthOf(0);
        });
      });
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself', function () {
        return Page.findOne( {where: {
          title: 'first thing'
        }})
        .then(function (result) {
          return result.findSimilar();
        }).spread(function (result) {
          expect(result.title).to.not.be.equal('first thing');
        });
      });

      it('gets other pages with any common tags', function () {
        return Page.findOne( {where: {
          title: 'first thing'
        }})
        .then(function (result) {
          return result.findSimilar();
        }).spread(function (result) {
          expect(result.title).to.be.equal('second thing');
        });
      });

      it('does not get other pages without any common tags', function () {
        return Page.findOne( {where: {
          title: 'first thing'
        }})
        .then(function (result) {
          return result.findSimilar();
        }).spread(function (result) {
          expect(result.title).to.not.be.equal('third thing');
        });
      });
    });
  });

  describe('Validations', function () {

    it('errors without title', function () {
      page.status = 'open';
      page.title = null;
      page.urlTitle = 'fake_url';
      page.content = 'null';

      return page.validate()
      .then(function (result) {
        // console.log(result.message);
        expect(result.message).to.be.equal('notNull Violation: title cannot be null');
      })
      .catch( function (err){
        console.log(err);
      })
    });
    it('errors without content', function () {
      page.status = 'open';
      page.title = 'fake title';
      page.urlTitle = 'fake_url';
      page.content = null;

      return page.validate()
      .then(function (result) {
        // console.log(result.message);
        expect(result.message).to.be.equal('notNull Violation: content cannot be null');
      })
      .catch( function (err){
        console.log(err);
      })
    });
    it('errors given an invalid status', function () {
      page.status = 'fart';
      page.title = 'fake title';
      page.urlTitle = 'fake_url';
      page.content = 'null';

      return page.save()
      .then(function (result) {
        // console.log(result);
        // expect(result.message).to.be.equal('notNull Violation: title cannot be null');
      })
      .catch( function (err){
        // console.log(err);
        expect(err.name).to.be.equal('SequelizeDatabaseError');

        // console.log(typeof err);

      })
    });
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating', function () {
      page.status = 'open';
      page.title = 'fake title';
      page.content = 'null';

      return page.save()
      .then(function(result){
        // console.log(result);
        expect(result.urlTitle).to.exist;
      });
    });
  });

});

});
