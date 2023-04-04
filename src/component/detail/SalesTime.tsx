import { DetailProvider } from '@/pages/Detail';
import { timestampToTime } from '@/utils';
import { useContext, useEffect, useMemo, useState } from 'react';

export default function SalesTime() {
	const { finish_date } = useContext(DetailProvider);

	const [timeStamp, setTimeStamp] = useState(new Date().getTime());

	useEffect(() => {
		let timer = setInterval(() => {
			setTimeStamp(timeStamp - 1);
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [timeStamp]);

	return (
		<div className="grid grid-flow-col gap-5 text-center auto-cols-max">
			<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
				<span className="countdown font-mono text-5xl">
					<span
						style={{
							'--value':
								finish_date &&
								timestampToTime(timeStamp - new Date(finish_date).getTime()).day
						}}
					></span>
				</span>
				days
			</div>
			<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
				<span className="countdown font-mono text-5xl">
					<span
						style={{
							'--value':
								finish_date &&
								timestampToTime(timeStamp - new Date(finish_date).getTime())
									.hour
						}}
					></span>
				</span>
				hours
			</div>
			<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
				<span className="countdown font-mono text-5xl">
					<span
						style={{
							'--value':
								finish_date &&
								timestampToTime(timeStamp - new Date(finish_date).getTime())
									.minutes
						}}
					></span>
				</span>
				min
			</div>
			<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
				<span className="countdown font-mono text-5xl">
					<span
						style={{
							'--value':
								finish_date &&
								timestampToTime(timeStamp - new Date(finish_date).getTime())
									.seconds
						}}
					></span>
				</span>
				sec
			</div>
		</div>
	);
}
