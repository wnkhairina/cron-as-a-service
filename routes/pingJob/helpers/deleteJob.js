const Job = require('../../../schema/job');

const deleteJob = async (job) => {
  try {
    await job.remove();
    console.log('Successfully removed job from collection');
  } catch (e) {
    console.error('Error removing job from collection');
  }
}

module.exports = deleteJob