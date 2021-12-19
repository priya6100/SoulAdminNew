import React, { useEffect, useState } from 'react'
import  Modal  from '../../components/UI Component/Modals';
import Layout from '../../components/Layout';
import {Container, Row, Col} from 'react-bootstrap';
import Input from '../../components/UI Component/inputs';
import createCategoryHelper from '../../helpers/categoryHelper';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';

/**
* @author
* @function NewPage
**/

const NewPage = (props) =>{
    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category); 
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);

    useEffect(() => {
       setCategories(createCategoryHelper(category.categories));
      
    }, [category]);


    useEffect(() =>{

        console.log(page);
        if(!page.laoding){
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }

    },[page]);



    console.log("categories", categories);

    const onCategoryChange = (e) =>{
      categories.find(category => category.value == e.target.value);
      setCategoryId(e.target.value);
        setType(category.type);
    }


    const handleBannerImages = (e) =>{
         
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) =>{
        setProducts([...products, e.target.files[0]]);
    }

    const submitPageForm =(e) =>{
      // e.target.preventDefault();
        if(title === ""){
            alert("title is required");
            setCreateModal(false);
            return;
        }
        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
                form.append('banners', banner)
        });
        products.forEach((product, index) => {
            form.append('products', product)
    });

    dispatch(createPage(form));
console.log(type, categoryId);

    }



    const renderCreatePageModal =() =>{
        return(

    
            <Modal  
                show = {createModal}
                modalTitle = {"Create New Page"}
                handleClose = {() => setCreateModal(false)}
                onSubmit = {submitPageForm}
            
            >

                <Container>

                <Row>
                    <Col>
                     {/* <select 
                     className="form-control"
                       value={categoryId}
                       onChange={onCategoryChange }
                     >
                         <option value="">Select Category</option>
                         {
                             categories.map(cat => 
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                                )
                         }

                     </select> */}

                     <Input
                      
                       type="select"
                       value={categoryId}
                       onChange={onCategoryChange}
                       options={categories}
                       placeholder={'select category'}
                     
                     />
                    </Col>
                </Row>
                &nbsp;
                <Row>
                    <Col>
                       <Input
                       className="form-control=sm"
                       value = {title}
                       onChange = {(e) => setTitle(e.target.value)}
                       placeholder = {'Page Title'}
                       />
                    </Col>
                </Row>

                <Row>
                    <Col>
                       <Input
                       className="form-control=sm"
                       value = {desc}
                       onChange = {(e) => setDesc(e.target.value)}
                       placeholder = {'Page Description'}
                       />
                    </Col>
                </Row>


                <Row>
                    {
                        banners.length > 0 ?
                        banners.map((banner, index) => 
                        
                        <Row key={index}>
                            <Col>
                            {banner.name}
                            </Col>
                        </Row>
                        
                        ): null
                    }
                    <Col>
                       <Input type="file"
                        className="form-control"
                       name="banners"
                       onChange = {handleBannerImages}
                       />
                    </Col>
                </Row>

                <Row>

                {
                        products.length > 0 ?
                        products.map((product, index) => 
                        
                        <Row key={index}>
                            <Col>
                            {product.name}
                            </Col>
                        </Row>
                        
                        ): null
                    }
                    <Col>
                       <Input type="file"
                        className="form-control"
                       name="products"
                       onChange = {handleProductImages}
                       />
                    </Col>
                </Row>
    
    

                </Container>

                
            </Modal>
        );
    }




  return(
      <Layout sidebar>

          {
              page.loading ?
             <p>Creating page plz wait....</p>
              :
                 <>
                   {renderCreatePageModal()}
       <button onClick ={(e) => setCreateModal(true)}>Create Page</button>
                 </> 
     
          }
   
      </Layout>
   )

  }

export default NewPage;