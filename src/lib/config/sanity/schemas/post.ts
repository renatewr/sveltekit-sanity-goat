import { BookIcon } from '@sanity/icons';
import { defineType } from 'sanity';

import authorType from './author';
import instagram from "./instagram";

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you
 * create or edit a post in the studio.
 *
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
	name: 'post',
	title: 'Post',
	icon: BookIcon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'postContent',
			title: 'Content',
			type: 'text',
		},
		{
			name: 'coverImage',
			title: 'Cover Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [
				{ type: 'block'},
				{ type: 'image',
				options: {
					hotspot: true // <-- Defaults to false
				},
				fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative text (for screen readers)',
				},
				{
				  name: 'caption',
				  type: 'string',
				  title: 'Caption',
				},
				{
				  name: 'attribution',
				  type: 'string',
				  title: 'Attribution',
				}
			  ]
			 },
			{ type: 'videoAnimation' }]
		},
		{
			name: 'date',
			title: 'Date',
			type: 'datetime',
		},
		{
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: authorType.name }],
		},
	],
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			media: 'coverImage',
		},
		prepare(selection) {
			const { author } = selection;
			return { ...selection, subtitle: author && `by ${author}` };
		},
	},
});
