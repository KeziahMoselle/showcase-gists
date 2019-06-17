const octokit = require('./octokit')
const store = require('./store')


/**
 * Create or Update a Gist
 *
 * @param {string} jobName
 * @param {object} files
 * @returns
 */
async function save (jobName, files) {
  // Check if there is already an ID linked to the jobName
  const id = store.get(`${jobName}.id`)

  // If id -> Update existing Gist
  if (id) {
    // If there is changes -> Update it
    const data = store.get(`${jobName}.message`)
    // Local data !== Fresh data
    if (data[jobName].content !== files[jobName].content) {
      update(id, files)
      store.set(`${jobName}.message`, files)
    }
  } else {
    // Create a new Gist
    const { data } = await octokit.gists.create({
      files: {
        ...files
      },
      description: jobName,
      public: true
    })

    // Save job's data
    store.set(`${jobName}.id`, data.id)
    store.set(`${jobName}.message`, files)

    return `Successfully created Gist for ${jobName}. (${data.id})`
  }
}

/**
 * Update an existing Gist
 *
 * @param {string} gist_id
 * @param {object} files
 * @returns
 */
function update (gist_id, files) {
  octokit.gists.update({
    gist_id,
    files: {
      ...files
    }
  })

  return `Successfully updated ${gist_id}.`
}



/**
 * Fetch public gists
 * Detects already created jobs gists
 * Fetch their id and content and save them
 *
 * @param {array} jobs
 */
async function getGistsId (jobs) {
  const { data: gists } = await octokit.gists.listPublicForUser({
    username: process.env.GITHUB_USERNAME
  })

  for (const gist of gists) {
    const jobIndex = jobs.indexOf(gist.description)
    // The gist is a job
    if (jobIndex > -1) {
      // If the gist is already created but no id is found in the db
      if (!store.get(`${gist.description}.id`)) {
        // Set the Gist id
        store.set(`${jobs[jobIndex]}.id`, gist.id)
        store.set(`${jobs[jobIndex]}.message`, gist.files)
      }
    }
  }
}

module.exports = {
  save,
  getGistsId
}