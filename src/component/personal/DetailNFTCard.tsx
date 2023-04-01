export default function DetailNFTCard({ item }) {
	return (
		<>
			<div className="card w-96 bg-base-100 shadow-xl">
				<figure>
					<img src={item.nft_img} alt={item.nft_name} />
				</figure>
				<div className="card-body">
					<h2 className="card-title">
						<span className="font-thin">NFT 名称：</span>
						<span className="font-bold">{item.nft_name}</span>
					</h2>
					<p>
						<span className="font-thin">分类：</span>
						<span className="font-bold text-lg">{item.nft_type}</span>
					</p>
					<p className="font-thin italic text-lg">{item.nft_desc}</p>
					<div className="card-actions justify-end">
						<button className="btn btn-primary">
							状态：
							{item.status === 0
								? '审核'
								: item.status === 1
								? '直售'
								: item.status === 2
								? '拍卖'
								: '下架'}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
