import React from 'react';
import Input from "../../../components/UI Component/inputs";
import Modal from "../../../components/UI Component/Modals";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";


const AddCategoriesModal = (props) =>{

    const {

        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
        onSubmit

    } = props;
      
    return(
        <Modal
        show={show}
        handleClose={handleClose}
        onSubmit={onSubmit}
        modalTitle={modalTitle}
      >

          <Row>
              <Col>
              <Input
          value={categoryName}
          placeholder={`category name`}
          onChange={(e) => setCategoryName(e.target.value)}
          className="form-control-sm"
        />
              </Col>
              <Col>
              <select
          className="form-control form-control-sm"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>Select category</option>
          {categoryList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
              </Col>
          </Row>
      
    <Row>
        <Col>
        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
        </Col>
    </Row>

     
      </Modal>
    );
  }

  export default AddCategoriesModal;