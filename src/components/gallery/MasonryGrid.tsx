"use client";

import Masonry from "react-masonry-css";
import { SmartImage, Column, Text, SmartLink, Button } from "@/once-ui/components";
import styles from "./Gallery.module.scss";
import { gallery } from "@/app/resources/content";

export default function MasonryGrid() {
  const breakpointColumnsObj = {
    default: 2,
    720: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {gallery.images.map((image, index) => (
        <Column
          key={index}
          gap="m"
          // Add styling for the box if needed, e.g., border, padding
          // border="neutral-medium"
          // padding="m"
          fillWidth
          
          marginBottom="l"
        >
          <SmartImage
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, 50vw"
            radius="m"
            aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
            src={image.src}
            alt={image.alt}
            className={styles.gridItem}
          />
          {image.description && (
            <Text
              variant="body-default-m"
              className={`${styles.descriptionSpacing} ${styles.descriptionCentered}`}
            >
              "{image.description}"
            </Text>
          )}
          {image.caseStudyLink && (
            <SmartLink
              href={image.caseStudyLink}
              className={`${styles.caseStudyLink} ${styles.caseStudyLinkSpacing}`}
              style={{ display: 'block', margin: 'auto' }}
            >
              View Case Study <span>&rarr;</span>
            </SmartLink>
          )}
        </Column>
      ))}
    </Masonry>
  );
}
