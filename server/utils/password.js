const { zxcvbn, zxcvbnOptions, zxcvbnAsync } = require("@zxcvbn-ts/core");
const zxcvbnCommonPackage = require("@zxcvbn-ts/language-common");
const zxcvbnEnPackage = require("@zxcvbn-ts/language-en");
const { matcherPwnedFactory } = require("@zxcvbn-ts/matcher-pwned");

const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
const options = {
	translations: zxcvbnEnPackage.translations,
	graphs: zxcvbnCommonPackage.adjacencyGraphs,
	dictionary: {
		...zxcvbnCommonPackage.dictionary,
		...zxcvbnEnPackage.dictionary,
	},
};
zxcvbnOptions.setOptions(options);
zxcvbnOptions.addMatcher("pwned", matcherPwned);

const hasLength = /.{8,64}/g;

const checkPasswordStrength = async (password) => {
	if (password === "") {
		return false;
	}

	const metRequirements = checkPasswordRequirements(password);

	if (metRequirements.success === false) {
		return false;
	}

	return await checkCommonPassword(password);
};

const checkCommonPassword = async (password) => {
	return zxcvbnAsync(password).then((result) => {
		if (result.score < 2) {
			return false;
		} else {
			return true;
		}
	});
};

const checkPasswordRequirements = (password) => {
	if (!password.match(hasLength)) {
		return false;
	}

	return true;
};

module.exports = {
	checkPasswordStrength,
};
