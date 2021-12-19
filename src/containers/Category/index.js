import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategoriesAction, getAllCategory, updateCategories } from "../../actions";
import Input from "../../components/UI Component/inputs";
import Modal from "../../components/UI Component/Modals";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoriesModal from "./components/AddCategoriesModel";

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() =>{

    if(!category.loading){
      setShow(false)
    }
    

  }, [category.loading])

  const [show, setShow] = useState(false);
  const handleClose = () => {
    const form = new FormData();


    if(categoryName === ""){
        alert("Category Name is required");
        setShow(false);
        return;
    }

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");

    // const cat ={
    //     categoryName,
    //     parentCategoryId,
    //     categoryImage
    // }
    // console.log(cat);

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);

  };

  const updateCheckedAndExpandedCategories = () =>{
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  }



  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
      const form = new FormData();
      expandedArray.forEach((item, index) => {
          form.append('_id', item.value);
          form.append('name', item.name);
          form.append('parentId', item.parentId ? item.parentId : "");
          form.append('type', item.type);
      });
      checkedArray.forEach((item, index) => {
        form.append('_id', item.value);
        form.append('name', item.name);
        form.append('parentId', item.parentId ? item.parentId : "");
        form.append('type', item.type);
    });

    dispatch(updateCategories(form));
    setUpdateCategoryModal(false); //doubt component fix it later
  }

  const renderUpdateCategoriesModal = () => {
    return (
      <Modal
        show={updateCategoryModal}
        handleClose={updateCategoriesForm}
        modalTitle={"Update Category"}
        size="lg"
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`category name`}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option>Select category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>

              <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}

        <h6>Checked Categories</h6>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`category name`}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option>Select category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>

              <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}
       
      </Modal>
    );
  };



  const renderAddCategoriesModal = () =>{
      
    return(
        <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Category"}
      >
        <Input
          value={categoryName}
          placeholder={`category name`}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          className="form-control"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>Select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </Modal>
    );
  }

const deleteCategory = () =>{
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true)
}

const deleteCategories = () => {

 const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}));
 const expandedIdsArray = expandedArray.map((item, index) => ({_id: item.value}));
 const idsArray = expandedIdsArray.concat(checkedIdsArray);

 if(checkedIdsArray.length > 0){
    dispatch(deleteCategoriesAction(checkedIdsArray))
    .then(result => {
        if(result){
            dispatch(getAllCategory())
            setDeleteCategoryModal(false)
        }
    })

 }

  setDeleteCategoryModal(false);

}

  const renderDeleteCategoryModel = () =>{

    return(
        <Modal 
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        modalTitle={"Confirm"}
        buttons={[
            {
                label: 'No',
                color: 'primary',
                onClick:() => {
                    alert('no');
                }
            },
            {
                label: 'Yes',
                color: 'danger',
                onClick: deleteCategories
                }
            
        ]}
        
        
        >
           <h5>Expanded</h5>
           {
               expandedArray.map((item, index) =>
               
               <span key={index}>{item.name}</span>
               
               )
           }
               <h5>Checked</h5>
           {
               checkedArray.map((item, index) =>
               
               <span key={index}>{item.name}</span>
               
               )
           }

        </Modal>
    );

}
const categoryList = createCategoryList(category.categories)

  return (
    <Layout sidebar>
      <Container>
        <Row>   
          <Col md={12}>
              <div style={{display: 'flex', justifyContent:'space-between', marginTop: '40px' }} className="category-header">

              <h3>Category</h3>
            <div className="actionBtnContainer">
           <span>Actions:</span>
              <button onClick={handleShow}><IoIosAdd /> <span>Add</span> </button>
              <button onClick={deleteCategory}><IoIosTrash /><span>Delete</span>  </button>
            <button onClick={updateCategory}><IoIosCloudUpload /> <span>Edit</span> </button>
            </div>

              </div>
        
          </Col>
        </Row>

        <Row>
          <Col md={12} >
                    {/* <ul>
                      
                      {JSON.stringify(renderCategories(category.categories))}
                    </ul> */}
                    <div className="category-body">
                  
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
           
            />
            </div>
     
        
          
          </Col>
        </Row>
      
      </Container>
      <AddCategoriesModal 
       show={show}
       handleClose={() => setShow(false)}
       onSubmit = {handleClose}
       modalTitle={"Add New Category"}
      categoryName ={categoryName}
      setCategoryName= {setCategoryName}
      parentCategoryId = {parentCategoryId}
      setParentCategoryId = {setParentCategoryId}
      handleCategoryImage = {handleCategoryImage}
      categoryList = {categoryList}
      />
   
      <UpdateCategoriesModal
      show={updateCategoryModal}
      handleClose={() => setUpdateCategoryModal(false)}
      onSubmit={updateCategoriesForm}
      modalTitle={"Update Category"}
      size="lg"
      expandedArray = {expandedArray}
      checkedArray = {checkedArray}
      handleCategoryInput ={handleCategoryInput}
      categoryList = {categoryList}
      />
     
      {/* {renderAddCategoriesModal()} */}
      {/* {renderUpdateCategoriesModal()} */}
      {renderDeleteCategoryModel()}

    </Layout>
  );
};

export default Category;
