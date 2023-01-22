import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'deliverooStudio',

  projectId: 'PROJECT_ID',
  dataset: 'DATASET_NAME',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
