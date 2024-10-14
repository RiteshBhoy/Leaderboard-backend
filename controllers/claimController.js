const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Claim points for a user
exports.claimPoints = async (req, res) => {
    const { userId } = req.body;
    const pointsClaimed = Math.floor(Math.random() * 10) + 1;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.points += pointsClaimed;
        await user.save();

        // Create claim history
        const claimHistory = new ClaimHistory({ userId, pointsClaimed });
        await claimHistory.save();

        // Emit an event
        req.io.emit('pointsClaimed', { userId, pointsClaimed });

        res.json({ userId, pointsClaimed, totalPoints: user.points });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get claim history
exports.getClaimHistory = async (req, res) => {
    try {
        const history = await ClaimHistory.find().populate('userId');
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
