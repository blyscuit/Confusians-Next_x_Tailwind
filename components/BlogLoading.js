import React, { Component } from "react"
import Layout from './MyLayout.js'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default class BlogLoading extends Component {
  
  render() {
    return (
        <Layout>
        <div class={"p-10"}>
        <div class="dark container mx-auto md:max-w-xl px-4 md:px-0">
                <div>
                    <h1 class="font-medium text-3xl"><Skeleton /></h1>
                    <p class="text-sm pt-2"><Skeleton /></p>
                    <br></br>
                    <p><Skeleton count={10} /></p>
                </div>
            </div>
        </div>
        </Layout>
    )
  }
}
