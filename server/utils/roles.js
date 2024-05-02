const roles = require('./roles.json')

const readRoles = () => {
    return roles
}

const getPresetRoles = (role) => {
    const roles = readRoles()
    return roles['presets'][role] || null
}

module.exports = {
    getPresetRoles
}