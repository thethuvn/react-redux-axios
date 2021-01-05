import React, { Component } from 'react';
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {actDeleteProductRequest, actFetchProductsRequest} from './../../actions/index';

class ProductListPage extends Component {

    componentDidMount() {
        this.props.fetchAllProducts();
    }


    
    onDelete = (id) => {
        this.props.onDeleteProduct(id);
        // var {products} = this.state;
        // callApi(`products/${id}`, 'DELETE', null).then(
        //     (res) => {
        //         if (res.status === 200) {
        //             var index = this.findIndex(products, id);
        //             if (index !== -1) {
        //                 products.splice(index, 1);
        //                 console.log(products);
        //                 this.setState({
        //                     products: products
        //                 });        
        //             }
        //         }
        //     }
        // );
    }

    render() {
        //var {products} = [];
        var {products} = this.props;
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Link to='/product/add' className="btn btn-info mb-10">
                    Add Product
                </Link>
                <ProductList>
                    {this.showProducts(products)}
                </ProductList>
            </div>
        );
    }
    showProducts = (products) => {
        var result = null;
        if (products && products.length > 0) {
            result = products.map((product, index)=>{
                return <ProductItem key={index} 
                    product={product} index={index} 
                    onDelete={()=>this.onDelete(product.id)}/>
            });
        }
        return result;
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}
const mapDispathToProps = (dispatch, props) => {
    return {
        fetchAllProducts: () => {
            dispatch(actFetchProductsRequest());
        },
        onDeleteProduct: (id) => {
            dispatch(actDeleteProductRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(ProductListPage);