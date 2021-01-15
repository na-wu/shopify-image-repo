import React from 'react';
import 'antd/dist/antd.css';
import { Upload, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchLabels } from '../actions/imageActions';
import { connect } from 'react-redux';

function getBase64New(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export class UploadComponent extends React.Component {
  
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      
    ],
  };

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must smaller than 5MB!');
      return false;
    }
    getBase64New(file)
    .then((response) => {
      const body = {
        "file": response
      }
      const options = {
        method: "POST",
        body: JSON.stringify(body)
      }
      fetch("https://te10ynt1ma.execute-api.us-west-1.amazonaws.com/prod/images/upload", options)
      .then(this.props.fetchLabels("sample_query"))
    })
    .catch(err => console.log(err))
    return false;
  }

  handleCancel = () => this.setState({ previewVisible: false });
  
  handleChange = ({ fileList }) => {
    console.log(this.state)
    this.setState({ fileList });
    console.log(this.state)
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64New(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
      <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {fileList.length >= 80 ? null : uploadButton}
        </Upload>
        <Modal
      visible={previewVisible}
      title={previewTitle}
      footer={null}
      onCancel={this.handleCancel}
    >
      <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      images: state.images
  }
}
export default connect(mapStateToProps, { fetchLabels })(UploadComponent);