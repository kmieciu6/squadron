import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type MarkdownContentProps = {
    content?: string | null,
    className?: string,
    allowHtml?: boolean,
};

export function MarkdownContent({ content, className = "", allowHtml = true }: MarkdownContentProps) {
    const value = normalizeMarkdown(content)

    if (!value) return null;

    return (
        <div className={`markdown_content ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={allowHtml ? [rehypeRaw] : []}
            >
                {value}
            </ReactMarkdown>
        </div>
    )
}

function normalizeMarkdown(content?: string | null) {
    if(!content) return null;

    return content
        .trim()
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
}