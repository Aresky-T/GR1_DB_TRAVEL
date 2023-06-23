import {Link} from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div className="not-found-container">
			<h1 className="not-found-title">404 - Không tìm thấy trang</h1>
			<p className="not-found-text">Trang bạn đang tìm kiếm không tồn tại hoặc bạn không có quyển truy cập!</p>
			<Link to="/" className="not-found-link">Quay lại trang chủ</Link>
		</div>
	)
}
export default NotFoundPage;