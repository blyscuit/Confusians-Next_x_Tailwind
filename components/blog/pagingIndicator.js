
// import Link from 'next/link'
import ReactPaginate from 'react-paginate';
import Router from 'next/router'
// import { Helmet } from 'react-helmet';

// import Prism from 'prismjs';
import React, { Component } from "react"

export default class PagingIndicator extends Component {
    componentDidMount() {
    }

    render() {
        var { currentPage, maxPage } = this.props
        return (
            <div class="flex flex-col items-center py-0 pb-12">

                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'px-2'}
                    pageCount={maxPage}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClick}
                    containerClassName={'font-light flex flex-row px-8 text-sm dark:text-white'}
                    subContainerClassName={'px-8'}
                    activeClassName={'font-semibold'}
                    forcePage={currentPage}
                    pageClassName={'px-3'}
                />
            </div>
        )
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    handlePageClick = data => {
        let selected = data.selected + 1;
        Router.push('/blog/page/' + selected)
        this.scrollToTop()
    };
}