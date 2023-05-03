import { FC } from "react";
import { Slide } from "react-slideshow-image";

import styles from "./ProductSlideshow.module.css";

interface Props {
	images: string[];
}
export const ProductSlideshow: FC<Props> = ({ images }) => {
	return (
		<Slide easing='ease' duration={7000} indicators>
			{images.map((img) => {
				return (
					<div className={styles["each-slide"]} key={img}>
						<div
							style={{
								backgroundImage: `url('/products/${img}');`,
							}}
						></div>
					</div>
				);
			})}
		</Slide>
	);
};
