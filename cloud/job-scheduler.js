// Import the library
const JobsScheduler = require('@brewery/parse-job-scheduler')

// Initialize a Parse instance
JobsScheduler.init({
    serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
    appId: process.env.APP_ID || 'myAppId',
    masterKey: process.env.MASTER_KEY || 'masterKey'
})

// Recreates all crons when the server is launched
JobsScheduler.recreateSchedule()

// Recreates schedule when a job schedule has changed
Parse.Cloud.afterSave('_JobSchedule', async (request) => {
  JobsScheduler.recreateSchedule(request.object)
})

// Destroy schedule for removed job
Parse.Cloud.afterDelete('_JobSchedule', async (request) => {
  JobsScheduler.destroySchedule(request.object)
})