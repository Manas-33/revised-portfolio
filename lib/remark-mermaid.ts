import { visit } from "unist-util-visit";
import type { Root, Code } from "mdast";

/**
 * Converts fenced ```mermaid code blocks into <Mermaid chart="..." /> JSX
 * elements. The chart is passed as a plain string attribute (not a template
 * literal) because next-mdx-remote/rsc does not preserve multiline template
 * literal expression attributes.
 */
export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, "code", (node: Code, index, parent) => {
      if (node.lang !== "mermaid" || !parent || index === undefined) return;

      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "Mermaid",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "chart",
            value: node.value,
          },
        ],
        children: [],
      } as unknown as Code;
    });
  };
}
