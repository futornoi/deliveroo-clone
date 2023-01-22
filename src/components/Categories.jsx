import React from 'react';
import {ScrollView} from "react-native";
import CategoryCard from "./CategoryCard";

const Categories = ({categories}) => (
  <ScrollView
    horizontal
    contentContainerStyle={{
      paddingHorizontal: 15,
      paddingTop: 10,
    }}
    showsHorizontalScrollIndicator={false}>
    {categories?.map(category => (
      <CategoryCard
        key={category.id}
        imgUrl={category.image}
        title={category.name}/>
    ))}
  </ScrollView>
);

export default Categories;
