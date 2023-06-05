import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import './Loader.css';

export default function CircularColor() {
	return (
		<div className="loaderContainer">
			<div className="loaders">
				<div className="loader loader3">
					<div className="spinner">
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
					</div>
					<svg>
						<defs>
							<filter id="goo">
								<feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
								<feColorMatrix
									in="blur"
									values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 50 -8"
									result="goo"
								/>
								<feBlend in="SourceGraphic" in2="goo" />
							</filter>
						</defs>
					</svg>
				</div>
			</div>
		</div>
	);
}
