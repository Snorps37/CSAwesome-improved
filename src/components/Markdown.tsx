import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

// § stands in for a backtick in content strings.
export function Markdown({ children }: { children: string }) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{ table: ({ node: _n, ...p }) => <div className="tbl"><table {...p} /></div> }}
      >{children.replace(/§/g, '`')}</ReactMarkdown>
    </div>
  );
}
