import {defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurants',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Restaurant Description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      title: 'Restaurant Image',
      type: 'image',
    },
    {
      name: 'lat',
      title: 'Restaurant Latitute',
      type: 'number',
    },
    {
      name: 'lng',
      title: 'Restaurant Longitude',
      type: 'number',
    },
    {
      name: 'address',
      title: 'Restaurant Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Restaurant Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(5).error('Rating must be between 0 and 5'),
    },
    {
      name: 'reviews',
      title: 'Restaurant Reviews',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Category',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{type: 'category'}],
    },
    {
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    },
  ],
})
