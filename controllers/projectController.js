const Project = require('../models/Project');

// @desc    Get all active projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ status: { $ne: 'completed' } })
            .populate('ownerId', 'name skills')
            .sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a new project
// @route   POST /api/projects
exports.createProject = async (req, res) => {
    const { title, description, requiredSkills, githubUrl } = req.body;

    try {
        const newProject = new Project({
            title,
            description,
            requiredSkills,
            githubUrl,
            ownerId: req.user.id,
            teamMembers: [{ userId: req.user.id, role: 'Lead Developer' }]
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Join a project
// @route   POST /api/projects/join/:id
exports.joinProject = async (req, res) => {
    const { role } = req.body;

    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Check if user is already a member
        const isMember = project.teamMembers.some(m => m.userId.toString() === req.user.id);
        if (isMember) return res.status(400).json({ message: 'Already a member' });

        project.teamMembers.push({ userId: req.user.id, role: role || 'Contributor' });
        await project.save();

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get my projects
// @route   GET /api/projects/me
exports.getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            $or: [
                { ownerId: req.user.id },
                { 'teamMembers.userId': req.user.id }
            ]
        }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
