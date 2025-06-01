import { getResources } from '@/app/utils/utils';
import { Grid } from '@/once-ui/components';
import Resources from './resources';

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
    thumbnail?: boolean;
    direction?: 'row' | 'column';
}

export function Resources({
    range,
    columns = '1',
    thumbnail = false,
    direction
}: PostsProps) {
    let allResources = getResources(['src', 'app', 'resource', 'resources']);

    const sortedResources = allResources.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedResources = range
        ? sortedResources.slice(
              range[0] - 1,
              range.length === 2 ? range[1] : sortedBlogs.length 
          )
        : sortedResources;

    return (
        <>
            {displayedResources.length > 0 && (
                <Grid
                    columns={columns} mobileColumns="1"
                    fillWidth marginBottom="40" gap="12">
                    {displayedResources.map((post) => (
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
