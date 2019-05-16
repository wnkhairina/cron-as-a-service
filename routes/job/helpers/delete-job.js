const Job = require('../../../db/schema/job');

const deleteJob = async () => {
  try {
    const removed = await Job.remove();
    console.log(removed)
    console.log('Successfully removed job from collection');
  } catch (e) {
    console.error(e);
  }
}

module.exports = deleteJob