import { Avatar, Column, Flex, Text } from "@/once-ui/components";
import React from "react";

interface TestimonialProps {
  testimonial: {
    text: string;
    name: string;
    designation: string;
    avatar: string;
  };
}

export default function Testimonial({
  testimonial: { text, name, designation, avatar },
}: TestimonialProps) {
  return (
    <Column
      padding="l"
      gap="m"
      border="neutral-medium"
      radius="m"
      fillWidth
    >
      <Text variant="body-default-l" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>"{text}"</Text>
      <Flex gap="m" vertical="center">
        <Avatar src={avatar} size="m" />
        <Column>
          <Text variant="heading-strong-s">{name}</Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {designation}
          </Text>
        </Column>
      </Flex>
    </Column>
  );
} 