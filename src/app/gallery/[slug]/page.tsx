import { getMDXData } from '@/app/utils/utils';
import path from 'path';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Heading, Column, Text } from '@/once-ui/components';
import { Metadata } from 'next';
import { Meta, Schema } from "@/once-ui/modules";

interface Params {
  slug: string;
}

interface CaseStudyPageProps {
  params: Params;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const awaitedParams = await params;
  const caseStudiesDir = path.join(process.cwd(), 'src', 'app', 'gallery', 'case-studies');
  const caseStudy = getMDXData(caseStudiesDir).find((cs) => cs.slug === awaitedParams.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <Column maxWidth="m" gap="l">
      <Heading as="h1" variant="display-strong-xl">
        {caseStudy.metadata.title}
      </Heading>
      {caseStudy.metadata.summary && (
        <Text variant="body-default-l" onBackground="neutral-weak">
          {caseStudy.metadata.summary}
        </Text>
      )}
      <MDXRemote source={caseStudy.content} />
    </Column>
  );
}

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const awaitedParams = await params;
  const caseStudiesDir = path.join(process.cwd(), 'src', 'app', 'gallery', 'case-studies');
  const post = getMDXData(caseStudiesDir).find((cs) => cs.slug === awaitedParams.slug);

  if (!post || !process.env.NEXT_PUBLIC_BASE_URL) {
    return {};
  }

  return Meta.generate({
    title: post.metadata.title || '',
    description: post.metadata.summary || '',
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    image: (post.metadata.image
        ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.metadata.image}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/og?title=${encodeURIComponent(post.metadata.title || '')}`
    ) as string,
    path: `${process.env.NEXT_PUBLIC_BASE_URL}/gallery/case-studies/${post.slug}`,
  });
}
