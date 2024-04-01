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

describe('Hash a Password', function(){
    it('should create a password and hash it. Then re hash to make sure theyre the same.', function() {
        const CreateSalt = hash.makeSalt();
        const FirstHash = hash.saltNhash("Password",CreateSalt);
        const SecondHash = hash.saltNhash("Password",CreateSalt);
       expect(FirstHash).to.be(SecondHash);
    });
});