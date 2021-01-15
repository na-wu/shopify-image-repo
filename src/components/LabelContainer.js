import React, { Component } from 'react';
import { Tag } from 'antd';
import { fetchLabels } from '../actions/imageActions';
import { connect } from 'react-redux';

class LabelContainer extends Component {
    render() {
        return (
            <div>
                {this.props.labels.map((item, index) => {
                    return (
                        <Tag
                        key={index}
                        >
                            {item}
                        </Tag>
                    )
                })}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        labels: state.labels
    }
}
export default connect(mapStateToProps, { fetchLabels })(LabelContainer);