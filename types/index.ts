import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}

export interface HomePostPayload {
  posts?: Post[]
}

export interface Post {
  _type?: string
  body?: PortableTextBlock[],
  excerpt?: string,
  slug?: Slug,
  mainImage?: Image,
  categories?: Category[],
  title?: string,
  _updatedAt?: string,
  author?: string,
  _createdAt?: string,
  }

export interface Category {
  _type: string
  description?: string
  title?: string
}

export interface Slug {
  current: string
}

export interface PostPayload {
  _id?: string
  title?: string
  _rev?: string
  _type?: string
  body?: PortableTextBlock[]
  _updatedAt?: string
  slug?: Slug
  author?: string
}