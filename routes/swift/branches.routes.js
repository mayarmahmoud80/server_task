const router = require("express").Router();

const {User} = require('../../models/user.model')

router.get('/',  async (req, res) => {

    const userData = req.user;
    const user = await User.findById(userData.id)

    res.json({
        branches: user.branches
    })
})

router.post('/', async (req, res) => {
    const userData = req.user;
    const user = await User.findById(userData.id)

    const {name, balance} = req.body;

    user.branches.push({name, balance})
    

    await user.save()

    res.json({branches: user.branches})
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const userData = req.user;
    const user = await User.findById(userData.id)

    const branchIndex = user.branches.findIndex(branch => branch._id == id)
    
    if (branchIndex == -1) {
        return res.status(404).json({msg: 'Can Not Find Any Branch With Given Id'})
    }

    user.branches.splice(branchIndex, 1);

    await user.save()
    
    res.json({msg: "Branch Deleted Successfully"})
})

module.exports = router