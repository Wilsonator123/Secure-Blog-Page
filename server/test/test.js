const hash = require('../utils/hash.js');
const auth = require('../utils/auth.js');
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

describe("Testing JWT", function() {
    it("should return a JWT", async function() {
        const jwt = await auth.createAndSignJWT(1)
        expect(jwt).to.be.a('string')
    })
    it("Should return decoded JWT", async function() {
        const jwt = await auth.createAndSignJWT(1)
        const payload = await auth.verifyJWT(jwt)
        expect(payload.sub).to.be(1)
    })
    it("Should reject invalid signature", async function() {
        const jwt = await auth.createAndSignJWT(1)
        const invalidJWT = jwt.slice(0, -1)
        const payload = await auth.verifyJWT(invalidJWT)
        expect(payload).to.be("Invalid JWT")
    });

});