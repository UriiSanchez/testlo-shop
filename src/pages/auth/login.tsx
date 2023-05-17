import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
	Box,
	Button,
	Chip,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "../../context";
import { AuthLayout } from "../../components/layouts";
import { isEmail } from "../../utils";
import { tesloApi } from "../../api";

type FormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const { loginUser } = useContext(AuthContext);
	const router = useRouter();
	const [showError, setShowError] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	const onLogin = async ({ email, password }: FormData) => {
		setShowError(false);
		const isValidLogin = await loginUser(email, password);
		if (!isValidLogin) {
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
			return;
		}
		const destination = router.query.p?.toString() || "/";
		router.replace(destination);
	};

	return (
		<AuthLayout title={"Ingresar"}>
			<form onSubmit={handleSubmit(onLogin)} noValidate>
				<Box sx={{ width: 350, padding: "10px 20px" }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h1' component='h1'>
								Iniciar sesión
							</Typography>
							<Chip
								label='No reconocemos ese usuario/contraseña'
								color='error'
								icon={<ErrorOutline />}
								className='fadeIn'
								sx={{ display: showError ? "flex" : "none" }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								type='email'
								label='Correo'
								variant='outlined'
								fullWidth
								{...register("email", {
									required: "Este campo es requerido",
									validate: (val) => isEmail(val),
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Contraseña'
								type='password'
								variant='outlined'
								fullWidth
								{...register("password", {
									required: "Este campo es requerido",
									minLength: { value: 6, message: "Mínimo 6 caracteres" },
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								type='submit'
								color='secondary'
								className='circular-btn'
								size='large'
								fullWidth
							>
								Ingresar
							</Button>
						</Grid>
						<Grid item xs={12} display='flex' justifyContent='end'>
							<NextLink href='/auth/register' passHref>
								<Link underline='always'>¿No tienescuenta?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default LoginPage;
