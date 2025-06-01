import { getMDXData } from '@/app/utils/utils';
import { Grid } from '@/once-ui/components';
import Post from './Post';
import path from 'path';

interface ResourceData {
    metadata: {
        title: string;
        publishedAt?: string;
        summary?: string;
        image?: string;
        images?: string[];
        tag?: string | string[];
        team?: any[]; // Use a more specific type if available
        link?: string;
        section?: string;
    };
    slug: string;
    content: string;
}

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
    thumbnail?: boolean;
    direction?: 'row' | 'column';
}

export function Posts({
    range,
    columns = '1',
    thumbnail = false,
    direction
}: PostsProps) {
    let allResources: ResourceData[] = getMDXData(path.join(process.cwd(), 'src', 'app', 'resource', 'resources')) as ResourceData[];

    const sortedResources = allResources.sort((a: ResourceData, b: ResourceData) => {
        return new Date(b.metadata.publishedAt || '').getTime() - new Date(a.metadata.publishedAt || '').getTime();
    });

    const displayedResources = range
        ? sortedResources.slice(
              range[0] - 1,
              range.length === 2 ? range[1] : sortedResources.length 
          )
        : sortedResources;

    return (
        <>
            {displayedResources.length > 0 && (
                <Grid
                    columns={columns} mobileColumns="1"
                    fillWidth marginBottom="40" gap="12">
                    {displayedResources.map((post: ResourceData) => (
                        <Post
                            key={post.slug}
                            post={post}
                            thumbnail={thumbnail}
                            direction={direction}
                        />
                    ))}
                </Grid>
            )}
        </>
    );
}
