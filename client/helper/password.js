import { zxcvbn, zxcvbnOptions, zxcvbnAsync } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'
import { matcherPwnedFactory } from '@zxcvbn-ts/matcher-pwned'

const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
const options = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
    },
}
zxcvbnOptions.setOptions(options);
zxcvbnOptions.addMatcher('pwned', matcherPwned);

const hasLength = '.{8,64}'
const hasUppercase = '(?=.*[A-Z]).*'
const hasLowercase = '(?=.*[a-z]).*'
const hasDigit = '(?=.*\d).*'
const hasSpecial = '(?=.*[@$!%*?&]).*'

export const checkPasswordStrength = async (password) => {
    'use server'
    if (password === "") {
        return false;
    }

    const metRequirements = checkPasswordRequirements(password);

    if(metRequirements.success === false){
        return {
            success: false,
            warning: metRequirements.reason
        };
    }

    return await checkCommonPassword(password);


}

const checkCommonPassword = async (password) => {
    return zxcvbnAsync(password).then((result) => {
        if (result.score < 2) {
            return {
                success: false,
                score: result.score,
                warning: result.feedback?.warning,
            }
        }
        else {
            return {
                success: true,
                score: result.score
            }
        }
    });
}

//This may not be needed?
const checkPasswordRequirements = (password) => {
    if (!password.match(hasLength)) {
        return {
            success: false,
            reason: "Password must be between 8 and 64 characters"
        }
    }

    if (!password.match(hasUppercase)) {
        return {
            success: false,
            reason: "Password must contain at least one uppercase letter"
        }
    }

    if (!password.match(hasLowercase)) {
        return {
            success: false,
            reason: "Password must contain at least one lowercase letter"
        }
    }

    if (!password.match(hasDigit)) {
        return {
            success: false,
            reason: "Password must contain at least one digit"
        }

    }

    if (!password.match(hasSpecial)) {
        return {
            success: false,
            reason: "Password must contain at least one special character"
        }
    }
    return {
        success: true
    }
}

