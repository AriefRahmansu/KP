// test page for role
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
}

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
}

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
}

exports.tenantBoard = (req, res) => {
    res.status(200).send("Tenant Content.");
}