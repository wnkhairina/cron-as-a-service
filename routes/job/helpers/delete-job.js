const Job = require('../../../db/schema/job');
const ObjectId = require('agenda/node_modules/mongodb').ObjectId;

const deleteJob = async () => {

    const { ObjectId } = req.params;

    Job.findByIdAn(ObjectId)



    // try {
    //     const removed = await Job.remove();
    //     console.log(removed)
    //     console.log('Successfully removed job from collection');
    // } catch (e) {
    //     console.error(e);
    // }

    
}

module.exports = deleteJob