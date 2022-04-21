import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
  onSubmit: null,
};

function PostFiltersForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  // create {} not change value
  const typingTimeoutRef = useRef(null);

  function handleSearchTermChange(e) {
    //   const value = e.target.value;
    setSearchTerm(e.target.value);

    if (!onSubmit) return;

    //   SET -- 100 -- CLEAR, SET -- 300 --> SUBMIT
    //   SET -- 300 --> SUBMIT
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    //   Debounce search
    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: e.target.value,
      };
      onSubmit(formValues);
    }, 300);
  }

  return (
    <form>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
    </form>
  );
}

export default PostFiltersForm;
