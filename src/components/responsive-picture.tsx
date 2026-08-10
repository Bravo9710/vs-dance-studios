import { getImageProps } from "next/image";

type ResponsivePictureProps = {
  /** Base name matching /public/images/{name}-{width}.{avif,webp} and the
   *  custom loader's AVAILABLE_WIDTHS key. */
  name: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * <picture> with an AVIF source and a WebP fallback, both going through the
 * custom static-export loader. next/image's <Image> only renders a single
 * <img>, so format fallback needs getImageProps() to assemble the sources
 * by hand — this is the documented pattern for that case.
 */
export function ResponsivePicture({
  name,
  alt,
  width,
  height,
  sizes,
  className,
  priority,
}: ResponsivePictureProps) {
  // priority alone doesn't imply fetchPriority in next/image's getImageProps
  // — the two are independent props, so pair them explicitly here.
  const common = { alt, width, height, sizes, priority, fetchPriority: priority ? ("high" as const) : undefined };
  const {
    props: { srcSet: avifSrcSet },
  } = getImageProps({ ...common, src: `/images/${name}.avif` });
  const {
    props: { srcSet: webpSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: `/images/${name}.webp` });

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element -- intentional: manual <picture> for AVIF/WebP fallback under static export */}
      <img {...imgProps} className={className} />
    </picture>
  );
}
