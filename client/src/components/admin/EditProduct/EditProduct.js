import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdminCategories } from "../../../store/actions/categories/adminCategories";
import Dropzone from "react-dropzone";
import keys from "../../../config/keys";
import axios from "axios";
import EditProductImage from "./EditProductImage/EditProductImage";
import CKEditor from "react-ckeditor-component";

import {
  getEditProduct,
  updateProduct
} from "../../../store/actions/products/adminProducts";

class EditProduct extends Component {
  state = {
    //disabled keeps the track of whetherform data are fetched
    disabled: true,

    fetched: false,
    categoriesFetched: false,
    title: "",
    desc: "",
    category: "",
    details: "",
    price: "",
    id: "",
    //contains the list of images fetched from server
    images: [],
    //Images which will be live previewed without being saved on any kind of database
    localImages: [],
    //contains the info of uploaded images
    imagesFormData: [],
    titleError: "",
    categoryError: "",
    priceError: "",
    descError: "",
    imagesError: "",
    detailsError: ""
  };

  static getDerivedStateFromProps = (nextProps, nextState) => {
    if (nextProps.editProduct.fetched && nextState.disabled) {
      console.log(
        "Get derived state from props is called",
        nextProps.editProduct
      );
      return {
        title: nextProps.editProduct.title,
        desc: nextProps.editProduct.desc,
        category: nextProps.editProduct.category,
        price: nextProps.editProduct.price,
        images: nextProps.editProduct.images,
        details: nextProps.editProduct.details,
        id: nextProps.editProduct._id,
        fetched: true
      };
    }
  };

  componentDidMount = async () => {
    if (
      this.props.profile.authenticated &&
      !this.props.categories.fetched &&
      !this.state.loaded
    ) {
      this.fetchCategoryAndEditProduct();
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      this.props.profile.authenticated &&
      !this.props.categories.fetched &&
      !this.state.loaded
    ) {
      this.fetchCategoryAndEditProduct();
    }
  };

  fetchCategoryAndEditProduct = async () => {
    const id = this.props.match.params.id;
    const fetchCategoryPromise = this.props.fetchAdminCategories();
    const fetchEditProductPromise = this.props.getEditProduct(id);
    await fetchCategoryPromise;
    await fetchEditProductPromise;
    this.setState({ fetched: true, disabled: false });
  };
  onTitleChange = e => this.setState({ title: e.target.value, titleError: "" });
  onDescChange = e => this.setState({ desc: e.target.value, descError: "" });
  onCategoryChange = e =>
    this.setState({ category: e.target.value, categoryError: "" });
  onPriceChange = e => this.setState({ price: e.target.value, priceError: "" });
  onDetailsChange = e => {
    const newDetails = e.editor.getData();
    this.setState({
      details: newDetails
    });
  };

  setFormError = error => {
    if (error.title) this.setState({ titleError: error.title });
    if (error.desc) this.setState({ descError: error.desc });
    if (error.category) this.setState({ categoryError: error.category });
    if (error.price) this.setState({ priceError: error.price });
    if (error.images) this.setState({ imagesError: error.images });
    if (error.details) this.setState({ detailsError: error.details });
  };

  renderCategoriesOptions = () => {
    if (!this.props.categories.fetched) return;
    return this.props.categories.lists.map(({ title, _id }) => (
      <option value={_id}>{title}</option>
    ));
  };

  //It creates a formData of all the uploaded images and saves it in the state

  handleUploadImages = images => {
    this.setState({ imagesError: "" });
    this.updateLocalImages(images);
    let imagesFormData = this.state.imagesFormData;
    console.log(imagesFormData);
    images.map(image => {
      // our formdata
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", keys.cloudinary.uploadPreset);
      formData.append("api_key", keys.cloudinary.APIkey);
      formData.append("timestamp", (Date.now() / 1000) | 0);
      imagesFormData.push(formData);
    });
    this.setState({ imagesFormData });
  };

  saveUploadImages = async () => {
    const formDatas = this.state.imagesFormData;
    //keeps the track of id of all uploded images
    let imagesId = [];

    //Default header creates cor issue when image are being
    //submitted to cloudinary, so we temporarilty disable it
    const token = axios.defaults.headers.common["authorization"];
    //Deleting authorization header
    delete axios.defaults.headers.common["authorization"];
    const uploads = formDatas.map(formData => {
      return axios
        .post("https://api.cloudinary.com/v1_1/samrat/image/upload", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => imagesId.push(response.data.public_id));
    });
    // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
    try {
      await axios.all(uploads);
      console.log("Images have been successfully updated");
      //Puttinb back authorization header
      axios.defaults.headers.common["authorization"] = token;
      return imagesId;
    } catch (error) {
      console.log("Some error have occured", error);
      throw error;
    }
  };

  removeUploadLocalImage = index => {
    console.log("Remove Upload Images is called", index);
    this.setState({
      imagesFormData: this.state.imagesFormData.filter((_, i) => i !== index),
      localImages: this.state.localImages.filter((_, i) => i !== index)
    });
  };

  removeServerImage = index => {
    this.setState({
      images: this.state.images.filter((_, i) => i !== index)
    });
  };
  updateLocalImages = images => {
    let localImagesURL = this.state.localImages;
    images.map(image => {
      const temporaryURL = URL.createObjectURL(image);
      localImagesURL.push(temporaryURL);
    });
    this.setState({ localImages: localImagesURL });
  };

  renderLocalImages = () => {
    return this.state.localImages.map((image, index) => (
      <EditProductImage
        image={image}
        onImageDelete={() => this.removeUploadLocalImage(index)}
      />
    ));
  };

  renderServerImages = () => {
    const rawURL = "https://res.cloudinary.com/samrat/image/upload/";
    return this.state.images.map((image, index) => {
      const imageURL = rawURL + image;
      return (
        <EditProductImage
          image={imageURL}
          onImageDelete={() => this.removeServerImage(index)}
        />
      );
    });
  };
  onEditProduct = async () => {
    try {
      const uploadedImages = await this.saveUploadImages();
      const data = {
        title: this.state.title,
        desc: this.state.desc,
        category: this.state.category,
        price: this.state.price,
        details: this.state.details,
        id: this.state.id,
        images: [...this.state.images, ...uploadedImages]
      };
      console.log(data.category);
      await this.props.updateProduct(data);
      console.log("Product is successfuly saved");
    } catch (error) {
      this.setFormError(error);
    }
  };

  render() {
    const optionDefault = <option value="">Choose a Category</option>;
    return (
      <div className="AddProduct">
        <h2>This is An Add Product</h2>
        <h3>Title</h3>
        <textarea
          cols="30"
          rows="1"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        {this.state.titleError}
        <h3>Description</h3>
        <textarea
          value={this.state.desc}
          onChange={this.onDescChange}
          cols="30"
          rows="1"
        />
        {this.state.descError}
        <h3>Product Details</h3>
        <CKEditor
          content={this.state.details}
          events={{
            change: this.onDetailsChange
          }}
        />
        {this.state.detailsError}
        <h3>Price</h3>
        <textarea
          value={this.state.price}
          onChange={this.onPriceChange}
          cols="30"
          rows="1"
        />
        {this.state.priceError}
        <h3>Categories</h3>
        <select
          name="categories"
          id=""
          onChange={this.onCategoryChange}
          value={this.state.category}
        >
          {optionDefault}
          {this.renderCategoriesOptions()}
        </select>
        {this.state.categoryError}
        {this.renderLocalImages()}
        {this.renderServerImages()}

        {/* Image Upload startes here */}

        <Dropzone onDrop={this.handleUploadImages} multiple accept="image/*">
          Try dropping some files here, or click to select files to upload.
        </Dropzone>
        {this.state.imagesError}
        <button onClick={this.onEditProduct}>Save the Product</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  categories: state.adminCategories,
  editProduct: state.adminProducts.editProduct
});

export default connect(
  mapStateToProps,
  { fetchAdminCategories, getEditProduct, updateProduct }
)(EditProduct);
