import { Image, React } from "react";

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const Logo = ({ testId }) => (
  <figure className="" title="Next.js" data-testid={testId}>
    <Image
      loader={myLoader}
      src="openbeats-teal.png"
      alt="Teal Open Beats logo"
      width={500}
      height={500}
    />
  </figure>
);

export default Logo;
