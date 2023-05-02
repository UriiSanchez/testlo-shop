import React, { FC } from "react";
import {
	AddCircleOutline,
	AddCircleRounded,
	RemoveCircleOutline,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface Props {}

export const ItemCounter = () => {
	return (
		<Box display='flex' alignItems='center'>
			<IconButton>
				<RemoveCircleOutline />
			</IconButton>
			<Typography sx={{ width: 40, textAlign: "center" }}>1</Typography>
			<IconButton>
				<AddCircleOutline />
			</IconButton>
		</Box>
	);
};
