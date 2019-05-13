import React, { Component, Fragment } from 'react';

import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

class PaginationLinks extends Component {
  constructor(props) {
    super(props);
    const { pageLimit = 20, totalCount = null, pageNeighbours = 0, currentPage = 1 } = props;

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 20;
    this.totalRecords = typeof totalCount === 'number' ? totalCount : 0;

    // pageNeighbours can be: 0, 1 or 2
    this.pageNeighbours = typeof pageNeighbours === 'number'
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage };
  }

  fetchPageNumbers = () => {

    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (this.pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];

    }

    return range(1, totalPages);

  }

  handleClick = (value) => {
    const { fetchMore, pageLimit, currentPage, updatePage } = this.props;

    let pageNumber, cursor = null;

    if (value === 'prev') {
      // Cursor to get to the first record of the previous page
      cursor = currentPage - 2;
      pageNumber = currentPage - 1;
    } else if (value === 'next') {
      // Cursor to get to the first record of the next page
      cursor = currentPage;
      pageNumber = currentPage + 1;
    } else {
      cursor = value - 1;
      pageNumber = value;
    }

    const offset = cursor * pageLimit;

    fetchMore({
      variables: {
        offset,
        limit: pageLimit,
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        if (!fetchMoreResult) return <p>Error fetching data.</p>

        return {
          movements: fetchMoreResult.movements
        }
      }
    });

    updatePage(pageNumber);

  }

  render() {
    if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Pagination
        className="pagination justify-content-end mb-0"
        listClassName="justify-content-end mb-0"
      >
        { pages.map((page, index) => {

            if (page === LEFT_PAGE) return (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => this.handleClick('prev')}
                  tabIndex="-1"
                >
                  <i className="fas fa-angle-left" />
                  <span className="sr-only">Previous</span>
                </PaginationLink>
              </PaginationItem>
            );

            if (page === RIGHT_PAGE) return (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => this.handleClick('next')}
                >
                  <i className="fas fa-angle-right" />
                  <span className="sr-only">Next</span>
                </PaginationLink>
              </PaginationItem>
            );

            return (
              <PaginationItem className={currentPage === page ? 'active' : null} key={index}>
                <PaginationLink
                  
                  onClick={() => this.handleClick(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )

        })}

      </Pagination>
      
    )

  }
}

export default PaginationLinks;