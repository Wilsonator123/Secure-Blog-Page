'use server'
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

const hasLength = /.{8,64}/g

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


const checkPasswordRequirements = (password) => {
    if (!password.match(hasLength)) {
        return {
            success: false,
            reason: "Password must be between 8 and 64 characters"
        }
    }

    return {
        success: true
    }
}

