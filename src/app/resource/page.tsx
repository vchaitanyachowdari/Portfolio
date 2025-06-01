import { Column, Heading } from "@/once-ui/components";
import { Mailchimp } from "@/components";
import { baseURL } from "@/app/resources";
import { resource, person, newsletter } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";
import { Resources } from "@/components/resource/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: resource.title,
    description: resource.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(resource.title)}`,
    path: resource.path,
  });
}

export default function Resource() {
  return (
    <Column maxWidth="s">
      <Schema
         as="webPage"
        baseURL={baseURL}
        title={resource.title}
        description={resource.description}
        path={resource.path}
        image={`${baseURL}/og?title=${encodeURIComponent(resource.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/resource`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {resource.title}
      </Heading>
      <Column
				fillWidth flex={1}>
				<Resources range={[1,1]} thumbnail direction="column"/>
				<Resources range={[2,3]} thumbnail/>
				<Resources range={[4]} columns="2"/>
			</Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
