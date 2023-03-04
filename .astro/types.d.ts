declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"authors": {
"alvaro-saburido.md": {
  id: "alvaro-saburido.md",
  slug: "alvaro-saburido",
  body: string,
  collection: "authors",
  data: any
},
},
"experiments": {
"animations.mdx": {
  id: "animations.mdx",
  slug: "animations",
  body: string,
  collection: "experiments",
  data: any
},
"environment-tweaks.mdx": {
  id: "environment-tweaks.mdx",
  slug: "environment-tweaks",
  body: string,
  collection: "experiments",
  data: any
},
"events.mdx": {
  id: "events.mdx",
  slug: "events",
  body: string,
  collection: "experiments",
  data: any
},
"gltf-model.mdx": {
  id: "gltf-model.mdx",
  slug: "gltf-model",
  body: string,
  collection: "experiments",
  data: any
},
"lights.mdx": {
  id: "lights.mdx",
  slug: "lights",
  body: string,
  collection: "experiments",
  data: any
},
"lowpoly-planet.mdx": {
  id: "lowpoly-planet.mdx",
  slug: "lowpoly-planet",
  body: string,
  collection: "experiments",
  data: any
},
"materials.mdx": {
  id: "materials.mdx",
  slug: "materials",
  body: string,
  collection: "experiments",
  data: any
},
"portal-journey.mdx": {
  id: "portal-journey.mdx",
  slug: "portal-journey",
  body: string,
  collection: "experiments",
  data: any
},
"realistic.mdx": {
  id: "realistic.mdx",
  slug: "realistic",
  body: string,
  collection: "experiments",
  data: any
},
"transform-controls.mdx": {
  id: "transform-controls.mdx",
  slug: "transform-controls",
  body: string,
  collection: "experiments",
  data: any
},
},

	};

	type ContentConfig = never;
}
