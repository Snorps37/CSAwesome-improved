import ReactMarkdown from 'react-markdown';

// § stands in for a backtick in content strings.
export function Markdown({ children }: { children: string }) {
  return (
    <div className="md">
      <ReactMarkdown>{children.replace(/§/g, '`')}</ReactMarkdown>
    </div>
  );
}
