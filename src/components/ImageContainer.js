import React, { Component } from 'react';
import { Image } from 'antd';
import { connect } from 'react-redux';
import { replaceImages } from '../actions/imageActions';

class ImageContainer extends Component {

    render() {
        return (
            <div>
                {this.props.images.map((item,index) => {
                    return (
                        <Image 
                        width={200}
                        key={index}
                        src={item}
                        style={{
                            padding: "5%"
                        }}
                        />
                    )
                })}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        images: state.images
    }
}
export default connect(mapStateToProps, { replaceImages })(ImageContainer);