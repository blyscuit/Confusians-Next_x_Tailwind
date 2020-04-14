
import Link from 'next/link'

const ReactMarkdown = require('react-markdown')

// import Prism from 'prismjs';
import React, { Component } from "react"

import Prism from "prismjs";
//other languages depend on these
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-java";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-python";
export default class Post extends Component {
    componentDidMount() {
        Prism.highlightAll();
    }

    render() {
        var { alt, date, image, title, url, id, markdown } = this.props

        const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' })
        const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(new Date(date))

        return (
            <div class="max-w-2xl">
                    <img alt={alt} src={image} />
                <div>
                <Link href={{pathname: "/blog/[blog]", query: {"id":id}}} as={`/blog/${title}`} >
                    <p class="font-sans-serif cursor-pointer font-medium text-3xl text-gray-800">{title}</p>
                </Link>
                    <p class="font-light text-sm pt-2 text-gray-500">{`${mo} ${da}, ${ye}`}</p>
                    <ReactMarkdown source={markdown}
                    className="text-xl font-serif leading-relaxed text-gray-900 text-justify"
                    renderers={{
                        paragraph: props => <p class="mt-8 ">{props.children}</p>,
                        code: props => {  return (<div class="mt-8 "><pre class="mt-8 "><code class={"text-sm language-" + props.language + " mt-8"} style={{fontSize: "0.875rem"}} >{props.value}</code></pre></div>) },
                        image: props => { return (<img class="mt-8 self-center max-h-1/4" alt={props.alt} src={props.src}></img>)},
                      }}
                    ></ReactMarkdown>
                    {/* <div class="font-serif  text-xl leading-relaxed text-gray-900 text-justify"
                        dangerouslySetInnerHTML={{
                            __html: documentToHtmlString(detail, {
                                renderNode: {
                                    'embedded-asset-block': (node) =>
                                        `<img class="img-fluid mt-8" src="${node.data.target.fields.file.url}"/>`,
                                    [BLOCKS.PARAGRAPH]: (node, next) => {
                                        return `<p class="mt-8">${next(node.content)}</p>`
                                    },
                                    [BLOCKS.HEADING_6]: (node, next) => {
                                        return `<pre class="language-swift mt-8">${next(node.content)}</pre>`
                                    }
                                },
                                renderMark: {
                                    [MARKS.CODE]: (node) => {
                                        // return Prism.highlight(node, Prism.languages.swift, 'swift')

                                        return `<p class="leading-loose text-sm "><code class="language-swift">${node}</code></p>`
                                    }
                                }
                            }),
                        }}
                    ></div> */}
                </div>
                <div class={'bg-gray-400 h-px w-full my-12'}></div>
            </div>
        )
    }
}