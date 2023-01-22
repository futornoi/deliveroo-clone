import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'PROJECT_ID',
    dataset: 'DATASET_NAME',
  },
})
