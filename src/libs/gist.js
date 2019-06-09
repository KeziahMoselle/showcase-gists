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
  const id = store.get(jobName)

  // If id -> Update existing Gist
  if (id) {
    update(id, files)
  } else {
    // Create a new Gist
    const { data } = await octokit.gists.create({
      files: {
        ...files
      },
      description: jobName,
      public: true
    })

    // Save the jobName and Gist ID
    store.set(jobName, data.id)

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

module.exports = save