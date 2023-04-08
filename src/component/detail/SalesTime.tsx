import { DetailProvider } from '@/pages/Detail';
import { timestampToTime,lastTime } from '@/utils';
import { useContext, useEffect, useMemo, useState } from 'react';

export default function SalesTime() {
	const { finish_date } = useContext(DetailProvider);
	const [timeStamp, setTimeStamp] = useState(new Date().getTime());
    const [seconds,setSeconds]=useState(lastTime(new Date(finish_date).getTime()-timeStamp).seconds)
	const [day,setDay]=useState(lastTime(new Date(finish_date).getTime()-timeStamp).day)
	const [minutes,setMinutes]=useState(lastTime(new Date(finish_date).getTime()-timeStamp).minutes)
	const [hour,setHour]=useState(lastTime(new Date(finish_date).getTime()-timeStamp).hour)
	useEffect(() => {
		if (seconds ===1 && minutes ===0) {
			if(hour === 0){
				setHour(23)
			}
			setMinutes(59)
		}
		let timer = setInterval(() => {
			setTimeStamp(timeStamp - 1);
			
		}, 1000);
         
		return () => {
			clearInterval(timer);
		};

	}, [timeStamp]);
	let ttt=setTimeout(()=>{
        const diffTime = new Date(finish_date).getTime()-timeStamp
		const seconds =60- (diffTime % 60)^0
		if (seconds===1) {
			if (minutes ===0 ) {
				if (hour ===0) {
					setDay(day-1)
				}
				setHour(hour-1)
			}
			setMinutes(minutes-1)
		}
		setSeconds(seconds)
	},1000)
	return (
		<div className="grid grid-flow-col gap-5 text-center auto-cols-max">
			<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
				<span className="countdown font-mono text-5xl">
					<span
						style={{
							'--value':
								finish_date &&
								day
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
								hour
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
								minutes
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
								seconds
						}}
					></span>
				</span>
				sec
			</div>
		</div>
	);
}
