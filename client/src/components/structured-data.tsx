import { useEffect } from 'react';

export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description?: string;
  sameAs?: string[];
}

export interface BlogPostingSchema {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: OrganizationSchema;
  url: string;
  keywords?: string[];
  articleSection?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function StructuredData({ data, type }: { data: any; type: string }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `structured-data-${type}`;
    script.text = JSON.stringify(data);
    
    const existingScript = document.getElementById(`structured-data-${type}`);
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [data, type]);

  return null;
}

export function OrganizationStructuredData({ organization }: { organization: OrganizationSchema }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    url: organization.url,
    logo: {
      '@type': 'ImageObject',
      url: organization.logo,
    },
    ...(organization.description && { description: organization.description }),
    ...(organization.sameAs && { sameAs: organization.sameAs }),
  };

  return <StructuredData data={schema} type="organization" />;
}

export function BlogPostingStructuredData({ post }: { post: BlogPostingSchema }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.headline,
    description: post.description,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(post.author.url && { url: post.author.url }),
    },
    publisher: {
      '@type': 'Organization',
      name: post.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: post.publisher.logo,
      },
    },
    url: post.url,
    ...(post.keywords && { keywords: post.keywords.join(', ') }),
    ...(post.articleSection && { articleSection: post.articleSection }),
  };

  return <StructuredData data={schema} type="blogposting" />;
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={schema} type="breadcrumb" />;
}

export function WebSiteStructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AIBlaze',
    url: window.location.origin,
    description: 'Learn how to make money smarter, not harder — powered by AI',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${window.location.origin}/blogs?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <StructuredData data={schema} type="website" />;
}
