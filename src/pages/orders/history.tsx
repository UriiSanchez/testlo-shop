import NextLink from "next/link";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ShopLayout } from "../../components/layouts";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 100 },
	{ field: "fullname", headerName: "Nombre Completo", width: 300 },
	{
		field: "paid",
		headerName: "Pagada",
		description: "Muestra información si está pagada la orden o no",
		width: 200,
		renderCell: (params) =>
			params.row.paid ? (
				<Chip label='Pagada' color='success' variant='outlined' />
			) : (
				<Chip label='No Pagada' color='error' variant='outlined' />
			),
	},
	{
		field: "orden",
		headerName: "Ver orden",
		width: 100,
		sortable: false,
		renderCell: (params) => (
			<NextLink href={`/orders/${params.row.id}`} passHref>
				<Link underline='always'>ver orden</Link>
			</NextLink>
		),
	},
];

const rows = [
	{ id: 1, paid: false, fullname: "Uriel Cerón" },
	{ id: 2, paid: true, fullname: "Sarai Cerón" },
	{ id: 3, paid: false, fullname: "Carmen Sánchez" },
	{ id: 4, paid: true, fullname: "Libni Cerón" },
];

const HistoryPage = () => {
	return (
		<ShopLayout
			title={"Historial de ordenes"}
			pageDescription={"Historial de Ordenes del cliente"}
		>
			<Typography variant='h1' component='h1'>
				Historial de ordenes
			</Typography>
			<Grid container>
				<Grid item xs={12} sx={{ height: 650, width: "100%" }}>
					<DataGrid rows={rows} columns={columns} />
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default HistoryPage;
