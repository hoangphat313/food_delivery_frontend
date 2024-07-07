import React, { useEffect, useState } from "react";
import ProductCard from "../../components/cards/ProductsCard";
import { filter } from "../../utils/data";
import { CircularProgress, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { getAllProducts } from "../../api";
import { Container, FilterSection, Filters, Menu, Title, Item, Products, CardWrapper, Selectableitem } from "./style"


const FoodListing = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState(""); // Default price range
  const [selectedCategories, setSelectedCategories] = useState([]); // Default selected categories

  const getFilteredProductsData = async () => {
    setLoading(true);
    // Call the API function for filtered products
    await getAllProducts(
      selectedCategories.length > 0
        ? `minPrice=${priceRange.split("-")[0]}&maxPrice=${priceRange.split("-")[1]
        }&categories=${selectedCategories.join(",")}`
        : `minPrice=${priceRange.split("-")[0]}&maxPrice=${priceRange.split("-")[1]}`
    ).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (priceRange) {
      getFilteredProductsData();
    }
  }, [priceRange, selectedCategories]);

  return (
    <Container>
      <Filters>
        <Menu>
          {filter.map((filters) => (
            <FilterSection>
              <Title>{filters.name}</Title>
              {filters.value === "price" ? (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Khoảng Giá</FormLabel>
                  <RadioGroup
                    aria-label="price"
                    name="price"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <FormControlLabel value="0-50000" control={<Radio />} label="0 - 50,000 VND" />
                    <FormControlLabel value="50001-200000" control={<Radio />} label="50,001 - 200,000 VND" />
                    <FormControlLabel value="200001-500000" control={<Radio />} label="200,001 - 500,000 VND" />
                    <FormControlLabel value="500001-1000000" control={<Radio />} label="500,001 - 1,000,000 VND" />
                    <FormControlLabel value="1000001-5000000" control={<Radio />} label="1,000,001 - 5,000,000 VND" />
                  </RadioGroup>
                </FormControl>
              ) : filters.value === "category" ? (
                <Item>
                  {filters.items.map((item) => (
                    <Selectableitem
                      key={item}
                      selected={selectedCategories.includes(item)}
                      onClick={() =>
                        setSelectedCategories((prevCategories) =>
                          prevCategories.includes(item)
                            ? prevCategories.filter(
                              (category) => category !== item
                            )
                            : [...prevCategories, item]
                        )
                      }
                    >
                      {item}
                    </Selectableitem>
                  ))}
                </Item>
              ) : null}
            </FilterSection>
          ))}
        </Menu>
      </Filters>
      <Products>
        <CardWrapper>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </>
          )}
        </CardWrapper>
      </Products>
    </Container>
  );
};

export default FoodListing;
