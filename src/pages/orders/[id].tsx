import NextLink from "next/link";
import {
	Box,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	Link,
	Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import {
	CreditCardOffOutlined,
	CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage = () => {
	return (
		<ShopLayout
			title={"Resumen de la orden #12332135465"}
			pageDescription={"Resumen de la orden"}
		>
			<Typography variant='h1' component='h1'>
				Orden: ABC123
			</Typography>
			{/* <Chip
				sx={{ my: 2 }}
				label='Pendiente de pago'
				variant='outlined'
				color='error'
				icon={<CreditCardOffOutlined />}
			/> */}
			<Chip
				sx={{ my: 2 }}
				label='La orden ya fue pagaa'
				variant='outlined'
				color='success'
				icon={<CreditScoreOutlined />}
			/>
			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList editable={true} />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'> Resumen (3 productos)</Typography>
							<Divider sx={{ my: 1 }} />
							<Box display='flex' justifyContent='space-between'>
								<Typography variant='subtitle1'>
									Dirección de entrega
								</Typography>
								<NextLink href='/checkout/address' passHref>
									<Link underline='always'> Editar</Link>
								</NextLink>
							</Box>
							<Typography>Toño Sánchez</Typography>
							<Typography>333 algún lugar</Typography>
							<Typography>Toluca, 43129</Typography>
							<Typography>México</Typography>
							<Typography>+52 175 558 8945</Typography>

							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref>
									<Link underline='always'> Editar</Link>
								</NextLink>
							</Box>
							<OrderSummary />
							<Box sx={{ mt: 3 }}>
								<h1>Pagar</h1>
								<Chip
									sx={{ my: 2 }}
									label='La orden ya fue pagaa'
									variant='outlined'
									color='success'
									icon={<CreditScoreOutlined />}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default OrderPage;
