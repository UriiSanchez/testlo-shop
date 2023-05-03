import { useMemo, useState } from "react";
import NextLink from "next/link";
import {
	Box,
	Card,
	CardActionArea,
	CardMedia,
	Grid,
	Link,
	Typography,
} from "@mui/material";
import { IProduct } from "../../interfaces";

interface Props {
	product: IProduct;
}

export const ProductCard = ({ product }: Props) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isImageLoader, setIsImageLoaderd] = useState(false);

	const producImage = useMemo(() => {
		return isHovered
			? `/products/${product.images[1]}`
			: `/products/${product.images[0]}`;
	}, [isHovered, product.images]);

	return (
		<Grid
			item
			xs={6}
			sm={4}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Card>
				<NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
					<Link>
						<CardActionArea>
							<CardMedia
								component='img'
								className='fadeIn'
								image={producImage}
								alt={product.title}
								onLoad={() => setIsImageLoaderd(true)}
							/>
						</CardActionArea>
					</Link>
				</NextLink>
			</Card>
			<Box
				sx={{ mt: 1, display: isImageLoader ? "block" : "none" }}
				className='fadeIn'
			>
				<Typography fontWeight={700}>{product.title}</Typography>
				<Typography fontWeight={500}>$ {product.price}</Typography>
			</Box>
		</Grid>
	);
};
