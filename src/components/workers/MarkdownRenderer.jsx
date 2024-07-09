import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function MarkdownRenderer({ markdownText }) {
  return (
    <Card className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4 text-primary" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-primary" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2 text-primary" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 text-gray-700" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 text-gray-700" {...props} />,
          li: ({ node, ...props }) => <li className="mb-2" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-gray-600" {...props} />
          ),
          code: ({ node, inline, ...props }) => 
            inline ? (
              <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono" {...props} />
            ) : (
              <pre className="bg-gray-100 rounded p-4 overflow-x-auto">
                <code className="text-sm font-mono" {...props} />
              </pre>
            ),
          img: ({ node, ...props }) => (
            <img className="max-w-full h-auto rounded-lg shadow-md my-4" {...props} alt={props.alt || ''} />
          ),
          hr: ({ node, ...props }) => <Separator className="my-8" {...props} />,
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-200" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />,
          td: ({ node, ...props }) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" {...props} />,
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </Card>
  );
}

export default MarkdownRenderer;