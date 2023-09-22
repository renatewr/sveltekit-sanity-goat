import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface Post {
  body: any;
	_id: string;
	name: string;
	title: string;
	date: string;
	postContent: string;
	coverImage: SanityImageSource;
	slug: string
	author: {
		name: string;
		picture: SanityImageSource;
	}
}