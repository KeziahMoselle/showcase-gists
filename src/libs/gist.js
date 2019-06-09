const octokit = require('./octokit')
const store = require('./store')

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
  }
}

function update (gist_id, files) {
  octokit.gists.update({
    gist_id,
    files: {
      ...files
    }
  })
}

module.exports = save