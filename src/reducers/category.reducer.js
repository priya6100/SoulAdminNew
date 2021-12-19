import { categoryConstants } from "../actions/constants"

const initState ={
    categories: [],
    error: null,
    loading: false
};

const buildNewCategories = (parentId, categories, category) =>{
    let myCategories =[];

    if(parentId == undefined){

        return [

            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }

        ];
    }

    for(let cat of categories){


        if(cat._id == parentId){

            const newCategory = {
                _id:category._id,
                name:category.name,
                slug:category.slug,
                parentId:category.parentId,
                type:category.type,
                children: []
            }

            myCategories.push({
                ...cat,
                children: cat.children.length > 0  ? [...cat.children, newCategory] : [newCategory]
            });
        } else {
            
        myCategories.push({
            ...cat,
            children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
        });
        }


    }

    return myCategories;

}

export default (state = initState, action) =>{

    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state={
                ...state,
               categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUIEST:
            state={
                ...state,
                loading: true
            }
            break;

            case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
                const category = action.payload.category;
                const updateCategories = buildNewCategories(category.parentId, state.categories, category);
                console.log(updateCategories, "djshfhdjfhkdfh");
                state={
                    ...state,
                 categories: updateCategories,
                  loading: false
                }
                break;
         
                case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
                    state={
                      ...initState,
                      loading: false,
                      error: action.payload.error
                    }
                    break;
                case categoryConstants.UPDATE_CATEGORIES_REQUIEST:
                    state={
                        ...state,
                        loading: true
                    }
                    break;
                case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
                    state={
                        ...state,
                        loading: false
                    }
                    break;
                case categoryConstants.UPDATE_CATEGORIES_FAILURE:
                    state={
                        ...state,
                        error: action.payload.error,
                        loading: false
                    }
                    break;
                case categoryConstants.DELETE_CATEGORIES_REQUIEST:
                    state={
                         ...state,
                         loading: true
                        }
                    break;
                case categoryConstants.DELETE_CATEGORIES_SUCCESS:
                    state={
                        ...state,
                        loading: false
                        }
                    break;
                case categoryConstants.DELETE_CATEGORIES_FAILURE:
                    state={
                        ...state,
                         error: action.payload.error,
                         loading: false
                        }
                    break;
    }
    return state;
}

