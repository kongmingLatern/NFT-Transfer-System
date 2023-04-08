import { DetailProvider } from '@/pages/Detail';
import { useContext } from 'react';
import classNames from 'classNames';
import style from '@/assets/img.module.css';
import { Box, Text } from '@chakra-ui/react';

export default function CardDetail() {
	const { nft_name, nft_img, transfer_type, nft_desc } =
		useContext(DetailProvider);
	return (
		// <div className="card bg-base-100 shadow-xl w-[40%]">
		// 	<img className=" h-96 " src={nft_img} alt="" />
		// 	<div className="indent-8">
		// 		<div className="card-title">
		// 			详情
		// 			<div className="indent-0 badge badge-secondary">New</div>
		// 		</div>
		// 		<div className="break-words overflow-scroll h-[200px]">{nft_desc}</div>
		// 	</div>
		// </div>
		<div className="card bg-base-100 shadow-xl w-[35vw] h-[60vh] p-[30px] relative">
			<img
				src="https://static.theone.art/pc/market-2/frame-top.png"
				className={classNames(
					'absolute',
					'top-0 ',
					'left-0',
					'w-full',
					style.frame
				)}
			/>
			<img
				src="https://static.theone.art/pc/market-2/frame-right.png"
				className={classNames(
					'absolute',
					'top-0 ',
					'right-0',
					'h-full',
					'z-10',
					style.frame
				)}
			/>
			<img
				src="https://static.theone.art/pc/market-2/frame-bottom.png"
				className={classNames(
					'absolute',
					'bottom-0 ',
					'left-0',
					'w-full',
					style.frame
				)}
			/>
			<img
				src="https://static.theone.art/pc/market-2/frame-left.png"
				className={classNames(
					'absolute',
					'top-0',
					'left-0',
					'h-full',
					'z-10',
					'cursor-zoom-in',
					style.frame
				)}
			/>

			<main className="h-full">
				<img
					src={nft_img}
					alt="图片加载失败"
					className={classNames('h-[85%]', 'object-cover')}
				/>
				<Box className="flex items-center justify-center mt-2  flex-col h-[10%]">
					<div className="card-title">
						<span>{nft_name}</span>
						{transfer_type === 0 ? (
							<span className="badge badge-primary">直售中</span>
						) : (
							<span className="badge badge-warning">拍卖中</span>
						)}
					</div>
					<Text noOfLines={5}>{nft_desc}</Text>
				</Box>
			</main>
		</div>
	);
}
