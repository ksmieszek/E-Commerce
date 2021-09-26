import "./ProductsList.scss";

const ProductsList = ({ children }) => {
  return (
    <main className="products__list">
      {children.map((item, index) => {
        return (
          <div key={index} className="product">
            <div className="product__images">
              <img className="image__front" src={item.frontImage} alt="" />
              <img className="image__back" src={item.backImage} alt="" />
            </div>
            <div>{item.name}</div>
            <div>{item.price}</div>
          </div>
        );
      })}
    </main>
  );
};

export default ProductsList;
