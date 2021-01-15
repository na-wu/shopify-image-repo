import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { fetchImages } from '../actions/imageActions';

const { Search } = Input;

export class SearchBar extends Component {

    handlePress = e => {
        console.log(this.props)
        console.log(e)
        this.props.fetchImages(e)
        return
    }

    render() {
        return (
            <div style={{ margin: "40px"}}>
                <Search placeholder="e.g. Dogs, Smile, Suits" enterButton onSearch={this.handlePress}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        images: state.images
    }
}
export default connect(mapStateToProps, { fetchImages })(SearchBar);