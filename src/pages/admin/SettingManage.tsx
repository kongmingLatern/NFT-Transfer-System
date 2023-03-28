import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
export default function SettingManage() {
	const columns = [
		{
			title: '轮播图 ID',
			id: 'swiper_id',
			key: 'swiper_id'
		},
		{
			title: '轮播图路径',
			id: 'swiper_src',
			key: 'swiper_src',
			type: 'string',
			render: (text, record) => <img src={text} />
		},
		{
			title: '轮播图分类',
			id: 'swiper_type',
			key: 'swiper_type',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '描述',
			id: 'swiper_desc',
			key: 'swiper_desc',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '操作',
			id: 'operation',
			key: 'operation',
			render: (text, record) => (
				<Space>
					<button
						className="btn btn-secondary w-[100px] font-thin text-white"
						onClick={() => console.log(record.swiper_id)}
					>
						查看
					</button>
					<button className="btn btn-error w-[100px] font-thin text-white">
						删除
					</button>
				</Space>
			)
		}
	];
	const dataSource = [];

	for (let i = 0; i < 10; i++) {
		dataSource.push({
			swiper_id: i,
			swiper_src: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
			swiper_type: '首页轮播图',
			swiper_desc: '描述信息' + i,
			operation: '查看'
		});
	}
	return <Table dataSource={dataSource} columns={columns} />;
}
