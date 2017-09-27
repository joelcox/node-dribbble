'use strict';

require('dotenv').config()
var chai = require('chai');
var should = require('chai').should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var d = require('../lib/index');
d.accessToken = process.env.DRIBBBLE_ACCESS_TOKEN;

describe('Dribbble', function () {
  describe('#user', function () {
    it('should return a user by id', function () {
      return d.user(209513).should.eventually.have.property('name', 'Pixelpillow');
    });
  });

  describe('#shot', function () {
    it('should return a shot by id', function () {
      return d.shot(43424).should.eventually.have.property('id', 43424);
    });

    describe('#rebounds', function () {
      it('should return rebounds of a shot', function () {
        return d.shot(43424).rebounds().then(function (data) {
          data.shots.forEach(function (shot) {
            shot.rebound_source_id.should.equal(43424);
          });
        });
      });
    });

    describe('#comments', function () {
      it('should return comments of a shot', function () {
        return d.shot(43424).comments().should.eventually.have.property('comments');
      });
    });
  });

  describe('#shots', function () {
    it('should return "debuts" shots', function () {
      return d.shots('debuts').should.eventually.have.property('shots');
    });

    it('should return "everyone" shots', function () {
      return d.shots('everyone').should.eventually.have.property('shots');
    });

    it('should return "popular" shots', function () {
      return d.shots('popular').should.eventually.have.property('shots');
    });
  });

  describe('#player', function () {
    it('should return a player by id', function () {
      return d.player(1).should.eventually.have.property('username', 'simplebits');
    });

    it('should return a player by username', function () {
      return d.player('simplebits').should.eventually.have.property('id', 1);
    });

    describe('#shots', function () {
      it('should return the shots by the player', function () {
        return d.player(1).shots().then(function (data) {
          data.shots.forEach(function (shot) {
            shot.player.should.have.property('id', 1);
          });
        });
      });
    });

    describe('#followingShots', function () {
      it('should return the folllowing shots by the player', function () {
        return d.player(1).followingShots().should.eventually.have.property('shots');
      });
    });

    describe('#likes', function () {
      it('should return the likes by the player', function () {
        return d.player(1).likes().should.eventually.have.property('shots');
      });
    });

    describe('#followers', function () {
      it('should return the followers of the player', function () {
        return d.player(1).followers().should.eventually.have.property('players');
      });
    });

    describe('#following', function () {
      it('should return the following players of the player', function () {
        return d.player(1).following().should.eventually.have.property('players');
      });
    });

    describe('#draftees', function () {
      it('should return the draftees of the player', function () {
        return d.player(1).draftees().should.eventually.have.property('players');
      });
    });

  });
});
