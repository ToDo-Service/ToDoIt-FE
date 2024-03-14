import { useState } from "react";
import styled from "styled-components";

const CategoryMainUl = styled.ul`
  width: 188px;
  height: 106px;
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding-right: 14px;
  border: 1px solid rgba(12, 0, 24, 0.1);
  border-radius: 8px;
  z-index: 2;
  list-style: none;
  top: 38px;
  left: 80px;

  & li:not(:last-child) {
    margin-bottom: 13px;
  }

  & li:first-child {
    margin-top: 9.5px;
  }
`;

const CategoryMainLi = styled.li`
  width: max-content;
  height: 12px;
  background-color: white;
  font-size: 10px;
  font-family: "Pretendard";
  color: #8f8f8f;
  cursor: pointer;
`;

const CategoryMainLiAdd = styled.li`
  width: max-content;
  height: 12px;
  background-color: white;
  font-size: 10px;
  font-family: "Pretendard";
  color: #8f8f8f;
`;

const Category = ({ setCategory }: any) => {
  const [categoryList, setCategoryList] = useState(["일상", "공부", "중요"]);

  const onChangeCategory = (e: any) => {
    setCategory(e.target.innerHTML);
  };

  return (
    <CategoryMainUl>
      {categoryList.map((item) => {
        return (
          <CategoryMainLi onClick={onChangeCategory}>{item}</CategoryMainLi>
        );
      })}

      <CategoryMainLiAdd>추가하기</CategoryMainLiAdd>
    </CategoryMainUl>
  );
};

export default Category;
