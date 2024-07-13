import "./NotFoundPage.scss";

function NotFoundPage() {
	return (
		<div className="not-found">
			<div className="not-found__image-wrapper">
				<img
					src="/404-image.png"
					alt="404 not found"
					className="not-found__image"
				/>
				<p className="not-found__text">
					Oops! This page doesn't exist. The URL may be misspelled or the page
					you're looking for is no longer available.
				</p>
				<p className="not-found__text">How you got here is a mystery.</p>
			</div>
		</div>
	);
}

export default NotFoundPage;
