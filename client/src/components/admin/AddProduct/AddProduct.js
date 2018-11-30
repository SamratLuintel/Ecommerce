import React, { Component } from "react";
import { addPage } from "../../../store/actions/pages/pages";
import { connect } from "react-redux";
import { fetchCategories } from "../../../store/actions/categories/categories";
import Dropzone from "react-dropzone";
import keys from "../../../config/keys";
import axios from "axios";
import AddProductImage from "./AddProductImage/AddProductImage";
import { addProduct } from "../../../store/actions/products/products";

//Remove Item in an array from specific index
const removeItem = (items, i) =>
  items.slice(0, i - 1).concat(items.slice(i, items.length));

class AddProduct extends Component {
  state = {
    loaded: false,
    title: "",
    desc: "",
    category: "",
    price: "",
    //Images which will be live previewed without being saved on any kind of database
    localImages: [],
    imagesFormData: [],
    titleError: "",
    categoryError: "",
    priceError: "",
    descError: "",
    imagesError: ""
  };

  componentDidMount = async () => {
    if (
      this.props.profile.authenticated &&
      !this.props.categories.fetched &&
      !this.state.loaded
    ) {
      await this.props.fetchCategories();
      this.setState({ loaded: true });
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      this.props.profile.authenticated &&
      !this.props.categories.fetched &&
      !this.state.loaded
    ) {
      await this.props.fetchCategories();
      this.setState({ loaded: true });
    }
  };

  onTitleChange = e => this.setState({ title: e.target.value, titleError: "" });
  onDescChange = e => this.setState({ desc: e.target.value, descError: "" });
  onCategoryChange = e =>
    this.setState({ category: e.target.value, categoryError: "" });
  onPriceChange = e => this.setState({ price: e.target.value, priceError: "" });

  setFormError = error => {
    if (error.title) this.setState({ titleError: error.title });
    if (error.desc) this.setState({ descError: error.desc });
    if (error.category) this.setState({ categoryError: error.category });
    if (error.price) this.setState({ priceError: error.price });
    if (error.images) this.setState({ imagesError: error.images });
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

  removeUploadImages = index => {
    console.log("Remove Upload Images is called", index);
    this.setState({
      imagesFormData: this.state.imagesFormData.filter((_, i) => i !== index),
      localImages: this.state.localImages.filter((_, i) => i !== index)
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
      <AddProductImage
        image={image}
        index={index}
        onImageDelete={this.removeUploadImages}
      />
    ));
  };

  onCreateProduct = async () => {
    try {
      const images = await this.saveUploadImages();
      const data = {
        title: this.state.title,
        desc: this.state.desc,
        category: this.state.category,
        price: this.state.price,
        images
      };
      console.log(data.category);
      await this.props.addProduct(data);
      console.log("Product is successfuly created");
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

        {/* Image Upload startes here */}

        <Dropzone onDrop={this.handleUploadImages} multiple accept="image/*">
          Try dropping some files here, or click to select files to upload.
        </Dropzone>
        {this.state.imagesError}
        <button onClick={this.onCreateProduct}>Create a Product</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { fetchCategories, addProduct }
)(AddProduct);
