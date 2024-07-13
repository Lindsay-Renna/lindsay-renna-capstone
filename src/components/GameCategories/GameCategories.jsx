import "./GameCategories.scss";
import { categoryList } from "../../utilities/boardgame-api.js";

function GameCategories({ data, handleCategorySelect }) {
	return (
		<div className="categories">
			<h2 className="categories__header">Specify a game type?</h2>
			<div className="categories__selections">
				{categoryList.map((category) => {
					const isActive = data.category === category.id;

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
											? `/icons/bg-category/category-icon-${category.id}-white.png`
											: `/icons/bg-category/category-icon-${category.id}.png`
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
