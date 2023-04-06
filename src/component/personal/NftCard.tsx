import Image from '@/assets/1.jpg';
import { Fragment } from 'react';
import Divider from '../common/Divider';
import Modal from '../common/modal/Modal';
import DetailNFTCard from './DetailNFTCard';
export default function NftCard({ data }) {
	console.log(data);

	return (
		<>
			{data.length === 0 ? (
				<span>暂无卡片</span>
			) : (
				data.map((item, index) => {
					return (
						<Fragment key={index}>
							<div className="card card-side glass mb-2 rounded-lg overflow-hidden">
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
								<div className="card-body bg-black glass text-white hover:text-black hover:ease-in-out hover:duration-300 hover:bg-blue-100">
									<h2 className="card-title">
										<span>{item.nft_name}</span>
										{item.status === 0 ? (
											<span className="badge badge-accent">审核中</span>
										) : item.status === 1 ? (
											<span className="badge badge-success">直售中</span>
										) : item.status === 2 ? (
											<span className="badge badge-warning ">拍卖中</span>
										) : (
											<span className="badge text-gray-500">下架</span>
										)}
									</h2>
									<p className="italic">{item.nft_desc}</p>
									<p>
										<span>该NFT唯一标识：</span>
										<span className="italic">{item.nft_id}</span>
									</p>
									<p>
										<span>原作者：</span>
										<span className="italic">{item.username}</span>
									</p>
									<div className="card-actions justify-end">
										<Modal
											open={(onOpen) => (
												<button className="btn btn-secondary" onClick={onOpen}>
													查看详情
												</button>
											)}
											title="查看详情"
											bodyContent={() => <DetailNFTCard item={item} />}
										/>
									</div>
								</div>
							</div>
							<Divider />
						</Fragment>
					);
				})
			)}
		</>
	);
}
