import { TextBadge } from '@/utils/react';
import { Link } from 'react-router-dom';
export default function Card({ item }) {
	return (
		<Link to={'/detail/' + item.nft_id}>
			<div className="card card-compact w-60 bg-base-100 shadow-xl transform hover:-translate-y-1 hover:scale-100 h-[100%] mx-auto">
				<figure className="h-[60%] relative">
					<img className="w-full h-[100%]" src={item.nft_img} />
					<TextBadge
						className="absolute right-0 top-0 text-lg h-[2rem]"
						status={item.status}
					/>
				</figure>
				<div className="w-full text-ellipsis px-2 text-center line-clamp-2 overflow-hidden mt-2 ">
					<span className="text-sm font-bold font-sans">{item.nft_name}</span>
					<img src="" alt="" />
				</div>
				<div className="w-full flex mt-4 mb-4 text-center ">
					{
						item.transfer_type ===0 ? (
							<div className='w-ull '>
								<div className='ml-16  w-24  text-2xl font-bold'>
									￥{item.basic_bid}
								</div>
							</div>
						):(
							<>
								<div className="w-1/2">
									<div className="text-md font-bold text-[#707a83]">底价</div>
									<div className="text-lg font-bold">￥{item.basic_bid}</div>
								</div>
								<div className="w-1/2">
									<div className="text-md font-bold text-[#707a83]">最高价</div>
									<div className="text-lg font-bold">￥{item.high_bid}</div>
								</div>
							</>
						)
					}
					
				</div>
			</div>
		</Link>
	);
}
