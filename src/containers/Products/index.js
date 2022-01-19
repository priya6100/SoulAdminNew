/** @format */

import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI Component/inputs";
import CheckBox from "../../components/UI Component/CheckBox";
import Modal from "../../components/UI Component/Modals";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import {
  addProduct,
  deleteProductById,
  getInitialData,
  getProducts,
} from "../../actions";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import {
  IoIosAdd,
  IoIosApps,
  IoIosBarcode,
  IoIosBasket,
  IoIosCash,
  IoIosPulse,
} from "react-icons/io";
import { BiLeftArrow } from "react-icons/bi";

/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [skuCode, setSku] = useState("");
  const [sizeSquantity, setSizeSQuantity] = useState("");
  const [sizeMquantity, setSizeMQuantity] = useState("");
  const [sizeXquantity, setSizeXQuantity] = useState("");
  const [sizeXLquantity, setSizeXLQuantity] = useState("");
  const [sizeXXLquantity, setSizeXXLQuantity] = useState("");
  const [sizeXXXLquantity, setSizeXXXLQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [color, setColor] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const order = useSelector((state) => state.order);

  const auth = useSelector((state) => state.auth);
  const categoryLength = category.categories.length;
  const productLength = product.products.length;
  const orderLength = order.orders.length;

  useEffect(() => {
    if (!product.laoding) {
      setName("");
      setSku("");
      setSizeSQuantity("");
      setSizeMQuantity("");
      setSizeXQuantity("");
      setSizeXLQuantity("");
      setSizeXXLQuantity("");
      setSizeXXXLQuantity("");
      setPrice("");
      setSize("");
      setDescription("");
      setCategoryId("");
      setColor([]);
      setProductPictures([]);
    }
  }, [product]);

  const lastItem = useMemo(() => {
    let length = product.products.length;
    if (length) return product.products[length - 1];
    return {};
  }, [product.products]);

  const handleClose = () => {
    setShow(false);
  };

  const submitProductForm = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("skuCode", skuCode);
    formData.append("S_quantity", sizeSquantity);
    formData.append("M_quantity", sizeMquantity);
    formData.append("X_quantity", sizeXquantity);
    formData.append("XL_quantity", sizeXLquantity);
    formData.append("X2L_quantity", sizeXXLquantity);
    formData.append("X3L_quantity", sizeXXXLquantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", categoryId);
    formData.append("color", color);

    if (name == "") {
      alert("name is required");
      return;
    } else if (skuCode == "") {
      alert("Sku code is required");
      return;
    }
    // else if(quantity == ""){
    //   alert("quantity is required");
    //   return;
    // }
    else if (price === "") {
      alert("Price is required");
      return;
    } else if (sizeSquantity === "") {
      alert("quantity of S size is required");
      return;
    } else if (sizeMquantity === "") {
      alert("quantity of M size is required");
      return;
    } else if (sizeXquantity === "") {
      alert("quantity of X size is required");
      return;
    } else if (sizeXLquantity === "") {
      alert("quantity of XL size is required");
      return;
    } else if (sizeXXLquantity === "") {
      alert("quantity of XXL size is required");
      return;
    } else if (sizeXXXLquantity === "") {
      alert("quantity of XXXL size is required");
      return;
    }
    // else if(size == ""){
    //   alert("size is required");
    //   return;
    // }
    else if (color.length === 0) {
      alert("color is required");
      return;
    } else if (description === "") {
      alert("description is required");
      return;
    } else if (category === "") {
      alert("category code is required");
      return;
    }

    for (let pic of productPictures) {
      formData.append("productPictures", pic);
    }

    dispatch(addProduct(formData)).then(() => setShow(false));
  };
  const handleShow = () => setShow(true);

  const sizeConvert = (size) => {
    const arrSize = [];

    if (size.S_quantity > 0) {
      arrSize.push("S");
    }
    if (size.M_quantity > 0) {
      arrSize.push("M");
    }
    if (size.X_quantity > 0) {
      arrSize.push("X");
    }
    if (size.XL_quantity > 0) {
      arrSize.push("XL");
    }
    if (size.X2L_quantity > 0) {
      arrSize.push("XXL");
    }
    if (size.X3L_quantity > 0) {
      arrSize.push("XXXL");
    }

    const result = arrSize.join(" ");
    return result;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>SKU Code</th>
            <th>Price</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products
                .filter((pd, index) => {
                  if (searchTerm) {
                    return pd?.[searchBy]?.includes(searchTerm);
                  } else {
                    return true;
                  }
                })
                .map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.skuCode}</td>
                    <td>{product.price}</td>
                    <td>{product.size ? sizeConvert(product.size) : ""}</td>
                    <td>{product.size ? `${product.quantity}` : ""}</td>
                    <td>{product.category}</td>
                    {/* <td>{product.category.name}</td> */}
                    <td className="action-btn-container">
                      <button
                        className="info-product"
                        onClick={() => showProductDetailsModal(product)}>
                        info
                      </button>
                      <button
                        className="del-product"
                        onClick={() => {
                          const payload = {
                            productId: product._id,
                          };
                          dispatch(deleteProductById(payload));
                        }}>
                        del
                      </button>
                    </td>
                  </tr>
                ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    const checkColor = (paramColor) => {
      const productColor = color;
      const colorIndex = productColor.indexOf(paramColor);

      if (colorIndex === -1) {
        productColor.push(paramColor);

        return setColor(productColor);
      } else {
        productColor.splice(colorIndex, 1);

        return setColor(productColor);
      }
    };

    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Product"}
        onSubmit={submitProductForm}>
        <Input
          label="Name"
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="SKU Code"
          value={skuCode}
          placeholder={`Enter sku code`}
          onChange={(e) => setSku(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div style={{ display: "flex" }}>
          <Input
            label="S Size"
            value={sizeSquantity}
            placeholder={`Quantity`}
            onChange={(e) => setSizeSQuantity(e.target.value)}
          />
          <Input
            label="M Size"
            value={sizeMquantity}
            placeholder={`Quantity`}
            onChange={(e) => setSizeMQuantity(e.target.value)}
          />
          <Input
            label="X Size"
            value={sizeXquantity}
            placeholder={`Quantity`}
            onChange={(e) => setSizeXQuantity(e.target.value)}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Input
            label="XL Size"
            value={sizeXLquantity}
            placeholder={`Quantity`}
            onChange={(e) => setSizeXLQuantity(e.target.value)}
          />
          <Input
            label="XXL Size"
            value={sizeXXLquantity}
            placeholder={`Quantity`}
            onChange={(e) => setSizeXXLQuantity(e.target.value)}
          />
          <Input
            label="XXXL Size"
            value={sizeXXXLquantity}
            placeholder={`Quantity`}
            onChange={(e) => setSizeXXXLQuantity(e.target.value)}
          />
        </div>
        <Form.Group>
          <Form.Label style={{ textTransform: "capitalize" }}>color</Form.Label>
          <div style={{ display: "grid", justifyContent: "space-between" }}>
            <CheckBox label="white" onChange={() => checkColor("white")} />
            {/**/}
            <CheckBox label="black" onChange={() => checkColor("black")} />
            {/**/}
            <CheckBox label="red" onChange={() => checkColor("red")} />
            {/*onChange={checkColor("red")}*/}
            <CheckBox label="blue" onChange={() => checkColor("blue")} />
            {/*onChange={checkColor("blue")}*/}
            <CheckBox label="green" onChange={() => checkColor("green")} />
            {/*onChange={checkColor("green")}*/}
            <CheckBox label="purple" onChange={() => checkColor("purple")} />
            {/*onChange={checkColor("purple")}*/}
            <CheckBox label="yellow" onChange={() => checkColor("yellow")} />
            {/*onChange={checkColor("yellow")}*/}
            <CheckBox label="orange" onChange={() => checkColor("orange")} />
            {/*onChange={checkColor("orange")}*/}
            <CheckBox label="grey" onChange={() => checkColor("grey")} />
            {/*onChange={checkColor("grey")}*/}
            <CheckBox label="brown" onChange={() => checkColor("brown")} />
            {/*onChange={checkColor("brown")}*/}
          </div>
        </Form.Group>
        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}>
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg">
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{`${productDetails.sizeSquantity}+${productDetails.sizeMquantity}+${productDetails.sizeXLquantity}`}</p>
          </Col>
          <Col md="6">
            <label className="key">Size</label>
            <p className="value">{sizeConvert(productDetails.size)}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
          <Col md="6">
            <label className="key">SKU CODE</label>
            <p className="value">{productDetails.skuCode}</p>
          </Col>
          <Col md="6">
            <label className="key">Color</label>
            <p className="value">{productDetails.color.join(", ")}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture)} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        {/* {
         [lastItem].map((item, index) => 
          
          <Row>
      
          <Col md={4}>
          <div className="card-counter primary">
         <IoIosApps className="card-icon" />
         <span className="count-numbers">{item.name}</span>
         <span className="count-name">Recently added</span> 
       
      
       </div>
          </Col>
          <Col md={4}>
          <div className="card-counter danger">
          <IoIosApps className="card-icon" />
         <span className="count-numbers">{productLength}</span>
         <span className="count-name">Total Products</span>
       </div>
          </Col>
          <Col md={4}>
          <div className="card-counter success">
          <IoIosApps className="card-icon" />
         <span className="count-numbers"><div>{orderLength}</div></span>
         <span className="count-name">Orders</span>
       </div>
          </Col>
        </Row>
            
          )
        }  */}

        {/* <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }} className="actionBtnContainer">
              <h3>Products</h3>

              <button  onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row> */}

        <Container>
          <Row>
            <Col lg={12}>
              <div
                className="home-banner"
                style={{
                  marginRight: "-10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <div>
                  <h2>Hello, {auth.user.fullName}</h2>
                  <h5>Welcome To product section</h5>
                </div>
                <div className="flexRow1">
                  <select
                    className="select-container"
                    defaultValue={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}>
                    <option value={`name`}>name</option>
                    <option value={`skuCode`}>sku code</option>
                  </select>
                  <Input
                    value={searchTerm}
                    placeholder={`search`}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {/* <Row  style={{marginTop: '50px'}}>
          <Col md={4}>
          <h3 style={{paddingLeft: '17px', fontSize: '30px', fontWeight: 'bolder'}}>PRODUCTS</h3>
          </Col>
          <Col md={4}></Col>
          <Col md={4}>
              <div className="flexRow1">
              <select className="select-container" defaultValue={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                <option value={`name`}>name</option>
                <option value={`skuCode`}>sku code</option>
              </select>
              <Input
          
          value={searchTerm}
          placeholder={`search`}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
              </div>
          </Col>
        </Row> */}
        <Row>{/* <Col>{renderProducts()}</Col> */}</Row>
      </Container>
      <Container>
        {[lastItem].map((item, index) => (
          <Row>
            <Col md={4}>
              <div className="product-new-card-container product-card-b">
                <div className="product-card-body">
                  <IoIosAdd className="product-icons" onClick={handleShow} />
                  <h5 className="text-muted fw-normal mt-0">Add Product</h5>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="product-new-card-container1 product-card-b1">
                <div className="rec-head">
                  <h5>Recently Added</h5>
                  <IoIosBasket className="phead-icon" />
                </div>

                <div className="product-card-body1">
                  {/* <IoIosAdd className="product-icons" onClick={handleShow} /> */}
                  {/* <img className="product-icons1" src={generatePublicUrl(item.productPictures[0].img)} alt="not found" /> */}
                  <h5
                    className="text-muted1 fw-normal1 mt-01"
                    style={{ fontSize: "17px" }}>
                    {item.name}
                  </h5>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="product-new-card-container product-card-b">
                <div className="product-card-body">
                  <div className="product-icons p-font">
                    {" "}
                    <h1 style={{ paddingTop: "25px" }}>{productLength}</h1>{" "}
                  </div>
                  <h5 className="text-muted fw-normal mt-0">Total Product</h5>
                </div>
              </div>
            </Col>
            {/* <Col md={6}>
              <div className="product-new-card-container1 product-card-b1">
                      <div className="product-card-body1">
                      
                       
                       {renderProducts()}
                      
                      </div>
                    </div>
                   
              </Col> */}
          </Row>
        ))}

        <Row>
          <Col md={12}>
            <div className="renderPr">
              <div>{renderProducts()}</div>
            </div>
          </Col>
        </Row>
        <br />
        <br />
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
