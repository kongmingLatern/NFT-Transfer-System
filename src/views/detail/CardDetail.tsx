import Image from '@/assets/gd1.png';
import { DetailProvider } from '@/pages/Detail';
import { useContext } from 'react';

export default function CardDetail() {
	
	const { nft_img,nft_desc } =useContext(DetailProvider);
	return (
		<div className="card bg-base-100 shadow-xl w-[40%]">
			<img className=" h-96 " src={nft_img} alt="" />
			<div className="indent-8">
				<div className="card-title">
					详情
					<div className="indent-0 badge badge-secondary">New</div>
				</div>
				<div className="break-words overflow-scroll h-[200px]">{nft_desc}</div>
			</div>
		</div>
	);
}
