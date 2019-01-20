import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import keys from "../../../config/keys";
import axios from "axios";
import AddProductImage from "./AddProductImage/AddProductImage";
import { addProduct } from "../../../store/actions/products/adminProducts";
import CKEditor from "react-ckeditor-component";
import AdminHeader from "../../common/admin/AdminHeader/AdminHeader";
import AdminSideNav from "../../common/admin/AdminSideNav/AdminSideNav";
import Select from "react-select";
import { fetchCategories } from "../../../store/actions/categories/userCategories";
import classnames from "classnames";

class AddProduct extends Component {
  state = {
    loaded: false,
    title: "",
    //Short description of the product
    desc: "",
    //In depth info of the product
    details: "",
    category: "",
    price: "",
    //Images which will be live previewed without being saved on any kind of database
    localImages: [],
    imagesFormData: [],
    titleError: "",
    categoryError: "",
    priceError: "",
    descError: "",
    imagesError: "",
    detailsError: ""
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
  onCategoryChange = categoryValue =>
    this.setState({ category: categoryValue, categoryError: "" });
  onPriceChange = e => this.setState({ price: e.target.value, priceError: "" });
  onDetailsChange = e => {
    const newDetails = e.editor.getData();
    this.setState({
      details: newDetails,
      detailsError: ""
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
    const options = [];
    this.props.categories.lists.map(({ title, _id }) =>
      options.push({ value: _id, label: title })
    );
    console.log("Render categories options is called", options);
    return options;
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
      //Putting back authorization header
      axios.defaults.headers.common["authorization"] = token;
      return imagesId;
    } catch (error) {
      console.log("Some error have occured", error);
      throw error;
    }
  };

  removeUploadImage = index => {
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
      <div className="col-md-3 col-sm-6">
        <AddProductImage
          image={image}
          onImageDelete={() => this.removeUploadImage(index)}
        />
      </div>
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
        details: this.state.details,
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
    const selectOptions = this.renderCategoriesOptions();
    return (
      <div className="AddProduct">
        <AdminSideNav />
        {/* Margin left of -260px */}
        <div className="AddProduct__main-area">
          <AdminHeader />
          <div className="AddProduct__main-area__wrapper">
            <div className="AddProduct__main-area__content">
              <h2 className="AddProduct__main-area__header"> Add Product</h2>
              <div className="AddProduct__single-field">
                <h3 className="AddProduct__single-field__title">Title</h3>
                <input
                  className={classnames({
                    "AddProduct__single-field__input": true,
                    "AddProduct__single-field__input--error": this.state
                      .titleError
                  })}
                  cols="30"
                  rows="1"
                  placeholder="Provide the title of the product"
                  value={this.state.title}
                  onChange={this.onTitleChange}
                />
                {this.state.titleError && (
                  <p className="AddProduct__single-field__error">
                    {this.state.titleError}
                  </p>
                )}
              </div>
              <div className="AddProduct__single-field">
                <h3 className="AddProduct__single-field__title">Short Desc</h3>
                <textarea
                  className={classnames({
                    "AddProduct__single-field__textarea": true,
                    "AddProduct__single-field__textarea--error": this.state
                      .descError
                  })}
                  placeholder="Please provide a short description of the product"
                  value={this.state.desc}
                  onChange={this.onDescChange}
                  rows="5"
                />
                {this.state.descError && (
                  <p className="AddProduct__single-field__error">
                    {this.state.descError}
                  </p>
                )}
              </div>
              <div className="AddProduct__single-field AddProduct__single-field--column">
                <h3 className="AddProduct__single-field__title AddProduct__single-field__title--full-line align-left">
                  Product Details
                </h3>
                <div className="AddProduct__single-field__full-line">
                  <CKEditor
                    content={this.state.details}
                    events={{
                      change: this.onDetailsChange
                    }}
                  />
                </div>
                {this.state.detailsError && (
                  <p className="AddProduct__single-field__error">
                    {this.state.detailsError}
                  </p>
                )}
              </div>
              <div className="AddProduct__single-field">
                <h3 className="AddProduct__single-field__title">Price</h3>
                <input
                  className={classnames({
                    "AddProduct__single-field__input": true,
                    "AddProduct__single-field__input--error": this.state
                      .priceError
                  })}
                  value={this.state.price}
                  placeholder="Please provide a price"
                  onChange={this.onPriceChange}
                  cols="30"
                  rows="1"
                />
                {this.state.priceError && (
                  <p className="AddProduct__single-field__error">
                    {this.state.priceError}
                  </p>
                )}
              </div>

              <div className="AddProduct__single-field">
                <h3 className="AddProduct__single-field__title">Categories</h3>
                <Select
                  name="categories"
                  className="AddProduct__single-field__select"
                  id=""
                  onChange={this.onCategoryChange}
                  value={this.state.category}
                  options={selectOptions}
                />
                {this.state.categoryError && (
                  <p className="AddProduct__single-field__error">
                    {this.state.categoryError}
                  </p>
                )}
              </div>
              <div className="row AddProduct__row">
                {this.renderLocalImages()}
              </div>

              {/* Image Upload startes here */}

              <Dropzone
                onDrop={this.handleUploadImages}
                multiple
                accept="image/*"
              >
                <div className="AddProduct__dropzone__content">
                  <i class="fas fa-upload" />
                  <p className="AddProduct__dropzone__content__text">
                    Upload images
                  </p>
                </div>
              </Dropzone>
              {this.state.imagesError && (
                <p className="AddProduct__single-field__error">
                  {this.state.imagesError}
                </p>
              )}
              <button
                className="AddProduct__create-btn"
                onClick={this.onCreateProduct}
              >
                Create a Product
              </button>
            </div>
          </div>
        </div>
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
