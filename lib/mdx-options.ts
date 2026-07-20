import remarkGfm from "remark-gfm";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { remarkMermaid } from "./remark-mermaid";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
  defaultLang: "plaintext",
};

export const mdxOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkMermaid, remarkGfm],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
};
