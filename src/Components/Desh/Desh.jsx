import React, { useEffect, useState } from 'react';
import SectionCatagory from '../SectionCatagory/SectionCatagory';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { NewsCatagory, TextNewsCard } from '../index';
import usePagination from '../../hooks/usePagination';

const Desh = ({ newsData }) => {
  const {articles, limit, page, totalCount} = newsData || {};
  const {visibleData, prevPage, nextPage, currentPage, totalPages} = usePagination(articles, 6)
  
  return (
    <>
      <SectionCatagory name="देश" backgroundColor="orange">
        <button
          className="border-gray-300 border-2 p-1 mr-2"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <FaAngleLeft />
        </button>
        <button
          className="border-gray-300 border-2 p-1"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          <FaAngleRight />
        </button>
      </SectionCatagory>
      <div className="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
        {visibleData.map((newsItem, index) => (
          <TextNewsCard
            key={index}
            image={newsItem?.images?.[0]}
            date={newsItem.updatedAt}
            heading={newsItem.title}
            author={newsItem.reporterId.name}
            slug={newsItem._id}
            className="w-full justify-self-center"
          >
            {/* <NewsCatagory
              catagory={newsItem.category}
              className="absolute top-4 left-4"
              backgroundColor="red"
              color="white"
            /> */}
          </TextNewsCard>
        ))}
      </div>
    </>
  );
};

export default Desh;
