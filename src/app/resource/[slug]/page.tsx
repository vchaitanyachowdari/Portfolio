import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { AvatarGroup, Button, Column, Heading, HeadingNav, Icon, Row, Text } from "@/once-ui/components";
import { resource, person, about } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";
import { Metadata } from 'next';
import { Meta, Schema } from "@/once-ui/modules";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "resource", "resources"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = getPosts(["src", "app", "resource", "resources"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title || '',
    description: post.metadata.summary || '',
    baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
    image: post.metadata.image ? `${process.env.NEXT_PUBLIC_BASE_URL!}${post.metadata.image}` : `${process.env.NEXT_PUBLIC_BASE_URL!}/og?title=${encodeURIComponent(post.metadata.title || '')}`,
    path: `${resource.path}/${post.slug}`,
  });
}

export default async function Resource({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let post = getPosts(["src", "app", "resource", "resources"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Row fillWidth>
      <Row maxWidth={12} hide="m"/>
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="xs" gap="l">
          <Schema
            as="article"
            baseURL={process.env.NEXT_PUBLIC_BASE_URL!}
            path={`${resource.path}/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary || ''}
            datePublished={post.metadata.publishedAt}
            dateModified={post.metadata.publishedAt}
            image={`${process.env.NEXT_PUBLIC_BASE_URL!}/og?title=${encodeURIComponent(post.metadata.title || '')}`}
            author={{
              name: person.name,
              url: `${process.env.NEXT_PUBLIC_BASE_URL!}${about.path}`,
              image: `${process.env.NEXT_PUBLIC_BASE_URL!}${person.avatar}`,
            }}
          />
          <Button data-border="rounded" href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
            Posts
          </Button>
          <Heading variant="display-strong-s">{post.metadata.title}</Heading>
          <Row gap="12" vertical="center">
            {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>
          </Row>
          <Column as="article" fillWidth>
            <CustomMDX source={post.content} />
          </Column>
          <ScrollToHash />
        </Column>
    </Row>
    <Column maxWidth={12} paddingLeft="40" fitHeight position="sticky" top="80" gap="16" hide="m">
      <Row
        gap="12"
        paddingLeft="2"
        vertical="center"
        onBackground="neutral-medium"
        textVariant="label-default-s"
      >
        <Icon name="document" size="xs" />
        On this page
      </Row>
      <HeadingNav fitHeight/>
    </Column>
    </Row>
  );
}
