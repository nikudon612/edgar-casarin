import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]`;

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;

export const aboutQuery = groq`*[_type == "about"][0]`;

export const allProjectsQuery = groq`*[_type == "project" && defined(slug.current)] | order(date desc)`;

export interface Post {
	_type: 'post';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
}

export interface About {
	_type: 'about';
	bio: PortableTextBlock[];
	headshot?: ImageAsset;
	email?: string;
	socialLinks?: string[];
}

export interface Project {
	_type: 'project';
	_id: string;
	_createdAt: string;
	title: string;
	slug: Slug;
	description?: string;
	date?: string;
	thumbnail?: ImageAsset;
	thumbnailVideo?: {
		asset: {
			url: string;
		};
	};
	gallery?: Array<{
		_type: 'image';
		asset: {
			_ref: string;
			_type: 'reference';
		};
	}>;
}
