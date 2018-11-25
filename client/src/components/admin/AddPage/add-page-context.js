import React from "react";

const AddPageContext = React.createContext({
  title: "",
  slug: "",
  content: "",
  onTitleChange: () => {},
  onSlugChange: () => {},
  onContentChange: () => {}
});

export default AddPageContext;
