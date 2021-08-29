const Bug = require('../models/bugModel')


const bugCtrl = {
    getBugs: async (req, res) =>{
        try {
            const bug = await Bug.find()
            res.json(bug)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    createBug: async(req, res) =>{
        try {
            const {projectname, description, date, deadline, priority, status} = req.body;
            const newBug = new Bug({
                projectname,
                description,
                date,
                deadline,
                priority,
                status
            })
            await newBug.save()
            res.json({msg: "Created a Bug"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteBug: async(req, res) =>{
        try {
            await Bug.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Bug"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateBug: async(req, res) =>{
        try {
            const {projectname, description, date, status} = req.body;
            await Bug.findOneAndUpdate({_id: req.params.id},{
                projectname,
                description,
                date,
                status
            })
            res.json({msg: "Updated a Bug"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getBug: async(req, res) => {
        try {
            const bug = await Bug.findById(req.params.id)
            res.json(bug)
        } catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = bugCtrl