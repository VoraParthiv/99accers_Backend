const fs = require("fs")
const path = require("path")
const { addProperty, subProperty, allPropertyInfo, tempProperty } = require('../models/index');
const { propertyValid } = require("../utils/validation");

const dirPath = __dirname;
const dirname = dirPath.slice(0, -11);  //C:\Users\admin\Desktop\landDom\Controller

// Add Property By Admin
exports.addPropertyByAdmin = async (req, res) => {
    try {
        await addProperty.create(req.body)
        return res.status(200).json({
            status: "Success",
            message: "Your propertya are added successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        })
    }
}

// Add Sub Property By Admin
exports.addSubPropertyByAdmin = async (req, res) => {
    try {
        await subProperty.insertMany(req.body)
        return res.status(200).json({
            status: "Success",
            message: "Your sub property are added successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        })
    }
}

// View details of property and subproperties
exports.viewAllDetailsOfProperty = async (req, res) => {
    try {
        const propertyData = await addProperty.aggregate([
            {
                $match: {
                    propertyType: { $eq: req.query.type }
                }
            },
            {
                $lookup: {
                    from: "subproperties",
                    localField: "_id",
                    foreignField: "propertyTypeId",
                    as: "propertyInfo",
                }
            },
            {
                $unwind: {
                    path: "$propertyInfo"
                }
            },
            {
                $project: {
                    __v: 0,
                    'propertyInfo.__v': 0,
                }
            }
        ])
        return res.status(200).json({
            status: "Success",
            data: propertyData
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        })
    }
}

// Post all property information
exports.createPropertyInfo = async (req, res) => {
    const allPropertyInfo1 = JSON.parse(req.body.allPropertyInfo);
    try {
        let filename = null
        if (req.file) {
            filename = req.file.filename
        }
        const props = new allPropertyInfo(allPropertyInfo1)
        if (req.file) {
            props.p_attechment = filename
        }
        await props.save()
        return res.status(200).json({
            status: "Success",
            message: "Your property are posted",
            data: props,
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
        })
    }
}

// View all property information
exports.viewPropertyInfo = async (req, res) => {
    try {
        const propertyInfo = await allPropertyInfo.find()
        return res.status(200).json({
            status: "Success",
            propertyInfo
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
        })
    }
}

// Change Property Status (suspend & approved)
exports.changePropertyStatus = async (req, res) => {
    try {
        await tempProperty.create(req.body)
        return res.status(200).json({
            status: "Success",
            message: "Update property status"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "Error",
            message: error.message
        })
    }
}




        // const { error, value } = propertyValid.validate(req.body)
        // if (error) {
        //     console.log("🚀 ~ file: adminController.js:93 ~ exports.createPropertyInfo= ~ error:", error)
        //     // const filePath = dirname + '/public/Image' + filename;
        //     // fs.unlink(filePath,(error)=>{
        //     //     console.log(error);
        //     // });
        //     return res.status(401).json({
        //         status: "Error",
        //         error: error.details[0].message
        //     })
        // }


        // const filePath = dirname + '/public/' + filename;
        // console.log("🚀 ~ file: adminController.js:111 ~ exports.createPropertyInfo= ~ filePath:", filePath)
        // fs.unlink(filePath, (error) => {
        //     console.log(error);
        // });