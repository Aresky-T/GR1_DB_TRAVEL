export default function ValidateUtils({ formData, rules, messages }) {
    let errors;

    const defaultMessages = {
        required: (key) => {
            return `${key} can not be empty`
        },
        minLength: (key) => {
            return `${key} must be at least {minLength} characters long`
        },
        maxLength: (key) => {
            return `${key} can only contain up to {maxLength} characters`
        },
        regex: (key) => {
            return `${key} is not in the correct format`
        },
        equal_to: (key) => {
            return `${key} does not match the {equal_to}`
        }
    }

    const ruleMethods = {
        required: (valueInput, valueRule) => {
            return valueInput.trim() !== '';
        },
        minLength: (valueInput, valueRule) => {
            return valueInput.length >= valueRule;
        },
        maxLength: (valueInput, valueRule) => {
            return valueInput.length <= valueRule;
        },
        regex: (valueInput, valueRule) => {
            return valueRule.test(valueInput);
        },
        equal_to: (valueInput, valueRule) => {
            return valueInput === formData[valueRule];
        }
    };

    function handleValidate() {
        errors = new Map();
        for (const keyInputName in rules) {

            const valueInput = formData[keyInputName];
            const rulesForInputName = rules[keyInputName];

            for (const ruleItemKey in rulesForInputName) {
                const valueRule = rulesForInputName[ruleItemKey];
                const validateResult = ruleMethods[ruleItemKey](valueInput, valueRule);
                const keyMessage = keyInputName + '_' + ruleItemKey;
                const errorMessage = messages?.[keyMessage];
                const defaultMessage = defaultMessages[ruleItemKey](keyInputName).replace(`{${ruleItemKey}}`, valueRule);

                if (!validateResult) {
                    errors.set(keyInputName, {
                        message: errorMessage || defaultMessage
                    })
                    break;
                }
            }
        }
    }

    handleValidate();

    if (errors.size > 0) {
        return {
            isValid: false, errors
        }
    }

    return {
        isValid: true, errors
    }
}