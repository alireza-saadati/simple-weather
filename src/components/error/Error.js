import "./error.style.scss";
import PropTypes from "prop-types";

const Error = (props) => {
  const { text = "" } = props;
  return (
    // <div className="error flex-center absolute-center">
    <div className="error flex-center absolute-center">{text}</div>
  );
};

Error.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Error;
