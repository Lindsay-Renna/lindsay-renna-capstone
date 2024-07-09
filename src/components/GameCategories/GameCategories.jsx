import "./GameCategories.scss";
import { categoryList } from "../../utilities/boardgame-api.js";

function GameCategories({ data, handleCategorySelect }) {
	const { categories } = data;

	return (
		<div className="categories">
			<h2 className="categories__header">Choose some categories?</h2>
			<div className="categories__selections">
				{categoryList.map((category) => {
					const isActive = categories.includes(category.id);

					return (
						<div key={category.id} className="categories__wrapper">
							<button
								onClick={handleCategorySelect}
								id={category.id}
								className={
									isActive
										? "categories__button--active categories__button"
										: "categories__button"
								}
							>
								<img
									className="categories__icon"
									src={
										isActive
											? `src/assets/icons/categories/categories-icon-${category.name}-white.png`
											: `src/assets/icons/categories/categories-icon-${category.name}.png`
									}
									alt={`${category.name} icon`}
								/>
								<p>{category.name}</p>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default GameCategories;
