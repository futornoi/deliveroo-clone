import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of dish',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      type: 'string',
      title: 'Short description',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price of the dish in GBP',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image of the dish',
    }),
  ],
})
