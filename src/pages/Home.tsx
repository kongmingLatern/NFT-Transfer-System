import Divider from "@/component/common/Divider";
import Header from "@/component/common/Header";
import Trending from "@/views/home/Trending";
import Carousel from "@/component/common/Carousel";
import Title from "@/component/common/Title";
import Tabs from "@/component/common/Tabs";
import CardList from "@/views/home/CardList";
import Echarts from "@/echarts/Echarts";
import { useState } from "react";
import message from "@/component/common/message/Message";
import Bread from "@/component/home/Bread";
import Item from "@/component/home/Item";
import Beginner, {
  Step,
  TestBeginer,
} from "@/component/common/beginner/Beginner";

export default function Home() {
  const [data, setData] = useState([820, 932, 901, 934, 1290, 1330, 1320]);
  const [loading, setLoading] = useState(true);

  const tabList = ["All", "Art", "Music", "Video"];
  const tabPanelList = ["All", "Art", "Music", "Video"];

  return (
    <>
      <div className="min-h-[4rem]">
        <Header />
      </div>

      <Beginner type={"origin"}>
        <Step order={1}>
          <Carousel />
        </Step>
        {/* <TestBeginer /> */}
        <Divider />
        <Tabs
          className={"px-4"}
          tabList={tabList}
          tabPanelList={tabPanelList}
        />

        {/* <Step order={2}> */}
        <Title title={"Trending"} />
        {/* </Step> */}
        <Trending />
        <Divider />

        <Title title={"Trending In Art"} />
        <Step order={2}>
          <CardList />
        </Step>

        <Divider />

        {/* <Step order={2}> */}
        <button className="btn" onClick={() => setData([1, 2, 3])}>
          setNum
        </button>
        {/* </Step> */}

        <button className="btn" onClick={() => message.error("123")}>
          HH
        </button>

        <Step order={3}>
          <Echarts type="line" data={data} />
        </Step>
      </Beginner>
    </>
  );
}
