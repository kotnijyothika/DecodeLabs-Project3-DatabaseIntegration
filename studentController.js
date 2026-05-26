const db = require('../models/Student');

// 1. CREATE
exports.createStudent = (req, res) => {
    const student = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        course: req.body.course,
        createdAt: new Date().toISOString()
    };

    db.insert(student, (err, newDoc) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(201).json({ message: 'Student created', student: newDoc });
    });
};

// 2. READ ALL
exports.getAllStudents = (req, res) => {
    db.find({}).sort({ createdAt: -1 }).exec((err, students) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ count: students.length, students });
    });
};

// 3. READ ONE
exports.getStudentById = (req, res) => {
    db.findOne({ _id: req.params.id }, (err, student) => {
        if (err || !student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ student });
    });
};

// 4. UPDATE
exports.updateStudent = (req, res) => {
    const updateData = req.body;
    updateData.updatedAt = new Date().toISOString();

    db.update({ _id: req.params.id }, { $set: updateData }, {}, (err, numUpdated) => {
        if (err || numUpdated === 0) return res.status(404).json({ message: 'Student not found' });
        db.findOne({ _id: req.params.id }, (err, student) => {
            res.status(200).json({ message: 'Student updated', student });
        });
    });
};

// 5. DELETE
exports.deleteStudent = (req, res) => {
    db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
        if (err || numRemoved === 0) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student deleted' });
    });
};