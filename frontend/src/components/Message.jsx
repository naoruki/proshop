import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>;
};
Message.deffaultProps = {
	variant: "info",
};
export default Message;
