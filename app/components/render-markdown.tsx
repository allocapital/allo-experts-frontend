import styles from "../markdown.module.css";
import { marked } from "marked";

async function formatMarkdown(data: string) {
  const contentHtml = await marked.parse(data);
  return contentHtml;
}
export default async function RenderMarkdown({
  markdown,
}: {
  markdown: string;
}) {
  const data = await formatMarkdown(markdown);

  return (
    <div
      className={styles.container}
       dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
