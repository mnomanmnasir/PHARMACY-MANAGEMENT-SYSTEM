const testController = (req, res) => {
    res.status(200).send({  
        message: "Welcome to Pharmacy Management System",
        success: true
    })
}

module.exports = { testController }