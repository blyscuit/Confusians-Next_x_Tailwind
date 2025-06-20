"use client"

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-python'

export default function Post(props) {
  useEffect(() => {
    Prism.highlightAll()
  }, [props.markdown])

  const { alt, date, image, title, url, id, markdown, isDetail } = props
  const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' })
  const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(new Date(date))

  return (
    <div className="dark container mx-auto md:max-w-xl px-4 md:px-0">
      <img alt={alt} src={image} />
      <div>
        {isDetail ? (
          <h1 className="font-sans-serif font-medium text-3xl text-gray-800 dark:text-white">{title}</h1>
        ) : (
          <Link href={{ pathname: "/blog/[blog]", query: { id } }} as={`/blog/${title}`}>
            <h1 className="font-sans-serif cursor-pointer font-medium text-3xl text-gray-800 dark:text-white">{title}</h1>
          </Link>
        )}
        <p className="font-light text-sm pt-2 text-gray-500">{`${mo} ${da}, ${ye}`}</p>
        <ReactMarkdown
          className="prose-lg lg:prose-xl prose-blue font-serif leading-relaxed text-gray-900 dark:text-white"
          components={{
            p: ({ children }) => <p className="mt-8">{children}</p>,
            code: ({ node, inline, className, children, ...props }) => (
              <div className="mt-8">
                <pre className="mt-8">
                  <code className={`text-sm ${className} mt-8`} style={{ fontSize: "0.875rem" }}>
                    {children}
                  </code>
                </pre>
              </div>
            ),
            img: ({ alt, src }) => (
              <img className="my-8 mx-auto md:max-w-lg" alt={alt} src={src} />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
      <div className="bg-gray-400 h-px w-full my-12"></div>
    </div>
  )
}
