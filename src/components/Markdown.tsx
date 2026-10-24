import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// § stands in for a backtick in content strings.
export function Markdown({ children }: { children: string }) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ table: ({ node: _n, ...p }) => <div className="tbl"><table {...p} /></div> }}
      >{children.replace(/§/g, '`')}</ReactMarkdown>
    </div>
  );
}
