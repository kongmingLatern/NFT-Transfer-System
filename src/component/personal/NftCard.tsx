import Image from '@/assets/1.jpg';
import { Fragment } from 'react';
import Divider from '../common/Divider';
export default function NftCard({ data }) {
	return (
		<>
			{data &&
				data.map((item, index) => {
					return (
						<Fragment key={index}>
							<div className="card card-side glass mb-2">
								<figure className="w-1/3">
									<img
										src={item.nft_img}
										style={{
											width: '100%',
											minHeight: '100px',
											height: '260px'
										}}
									/>
								</figure>
								<div className="card-body bg-black rounded-lg glass text-white hover:text-black hover:ease-in-out hover:duration-300 hover:bg-blue-100">
									<h2 className="card-title">{item.nft_name}</h2>
									<p className="italic">{item.nft_desc}</p>
									<div className="card-actions justify-end">
										<button className="btn btn-secondary">查看详情</button>
									</div>
								</div>
							</div>
							<Divider />
						</Fragment>
					);
				})}
		</>
	);
}
