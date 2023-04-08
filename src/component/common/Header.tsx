import NavSubmenu from '../../views/home/NavSubmenu';
import UserInfo from '../home/UserInfo';
import SearchInput from '../home/SearchInput';
import { useNavigate } from 'react-router-dom';
interface HeaderType {
	auth?: boolean;
	text?: string;
	fixed?: boolean;
}

export default function Header({
	auth = true,
	text = '',
	fixed = true
}: HeaderType) {
	const navigate = useNavigate();
	return fixed ? (
		<div className="min-h-[4rem]">
			<div className="navbar text-black justify-between fixed top-0 left-0 bg-white z-20">
				<div className="w-[50%]">
					<button className="btn btn-ghost normal-case text-xl font-sans">
						NFT 交易系统&nbsp;
						<span className="text-[17px] text-blue-500">
							{auth ? '' : ` > ${text}`}
						</span>
					</button>
					{auth ? (
						<>
							<SearchInput
								className={'w-[400px]'}
								search={(value) => {
									navigate('/search/nft/' + value);
									console.log('search', value);
								}}
							/>
						</>
					) : (
						''
					)}
				</div>
				{auth ? (
					<div className="gap-2">
						<NavSubmenu />
						<UserInfo />
					</div>
				) : (
					''
				)}
			</div>
		</div>
	) : (
		<div className="navbar text-black justify-between bg-white z-20">
			<div className="w-[50%]">
				<button className="btn btn-ghost normal-case text-xl font-sans">
					NFT 交易系统&nbsp;
					<span className="text-[17px] text-blue-500">
						{auth ? '' : ` > ${text}`}
					</span>
				</button>
			</div>
			{auth ? (
				<div className="gap-2">
					<NavSubmenu />
					<UserInfo />
				</div>
			) : (
				''
			)}
		</div>
	);
}
