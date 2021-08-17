import "./container.style.scss";
import PropTypes from "prop-types";
import { Spin } from "antd";

const Container = (props) => {
  const { className = "", style, children, loading = false } = props;
  return (
    <div className={`container ${className}`} style={style}>
      <Spin spinning={loading}>{children}</Spin>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.bool,
};

export default Container;
