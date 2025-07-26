import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';

const LoadingScreen = () => (
	<div className="fixed inset-0 col-center bg-mint gap-5 z-[9999]">
		<img
			src="/crazydrinks/images/logo.svg"
			alt="logo"
			className="w-20 md:w-50"
		/>
		<Box sx={{ width: '13%' }}>
			<LinearProgress color="success" />
		</Box>{' '}
	</div>
);

export default LoadingScreen;
