const hash = require('../ulti/hash.js');
var expect = require('expect.js');

describe('Test', function() {
    it('should return 1', function() {
        expect(1).to.equal(1);
    });
});

describe('makeSalt', function(){
    it('should return 1', function() {
        const CreateSalt = hash.makeSalt();
       expect(CreateSalt).to.have.length(128);
    });
});