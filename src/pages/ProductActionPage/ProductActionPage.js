import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {actAddProductRequest, actGetProductRequest, actUpdateProductRequest} from './../../actions/index';
import {connect} from 'react-redux';

class ProductActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chbStatus: ''
        }
    }

    componentDidMount() {
        var {match} = this.props;
        if(match) {
            var id = match.params.id;
            this.props.onEditProduct(id);
            // callApi(`products/${id}`, 'GET', null).then(res=>{
            //     var data = res.data;
            //     console.log(data);
            //     this.setState({
            //         id: data.id,
            //         txtName: data.name,
            //         txtPrice: data.price,
            //         chbStatus: data.status
            //     });
            // });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            var {itemEditing} = nextProps;
            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                txtPrice: itemEditing.price,
                chbStatus: itemEditing.status
            });
        }
    }
    
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type==='checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    onSave = (event) => {
        event.preventDefault();
        var {id, txtName, txtPrice, chbStatus} = this.state;
        var {history} = this.props;
        var product = {
            id: id,
            name : txtName,
            price: txtPrice,
            status: chbStatus
        };
        if (id) {
            // callApi(`products/${id}`, 'PUT', {
            //     name:txtName,
            //     price:txtPrice,
            //     status: chbStatus
            // }).then(res=>{
            //     //history.goBack();
            //     history.push('/');
            // });    
            this.props.onUpdateProduct(product);
        } else {
            // callApi('products', 'POST', {
            //     name:txtName,
            //     price:txtPrice,
            //     status: chbStatus
            // }).then(res=>{
            //     //history.goBack();
            //     history.push('/');
            // });    
            this.props.onAddProduct(product);
        }
        history.goBack();
    }

    render() {
        var {txtName, txtPrice, chbStatus} = this.state;
        return (

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" className="form-control" id="" name="txtName" 
                            value={txtName} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label >Price</label>
                        <input type="text" className="form-control" id="" name="txtPrice" 
                            value={txtPrice} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label >Status</label>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" name="chbStatus"
                                    value={chbStatus} onChange={this.onChange} checked={chbStatus}/>
                                Available
                            </label>
                        </div>
                    </div>
                    <Link to="/product-list" className="btn btn-danger mr-10">
                        Go Back
                    </Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        itemEditing: state.itemEditing
    }
}
const mapDispathToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product));
        },
        onEditProduct: (id) => {
            dispatch(actGetProductRequest(id));
        },
        onUpdateProduct: (product) => {
            dispatch(actUpdateProductRequest(product));
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(ProductActionPage);