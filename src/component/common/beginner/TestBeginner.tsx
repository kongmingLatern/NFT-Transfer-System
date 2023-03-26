import Beginner from "./Beginner";
import { Step } from "./Step";

export function TestBeginer() {
  return (
    <Beginner>
      <Step order={1}>
        <div>第一部分的内容</div>
        <div>第一部分的内容</div>
        <div>第一部分的内容</div>
      </Step>
      <Step order={2}>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
      </Step>
      <Step order={4}>
        <div>10</div>
        <div>10</div>
        <div>10</div>
        <div>10</div>
        <div>10</div>
      </Step>
      <Step order={3}>
        <div>8</div>
        <div>8</div>
        <div>8</div>
        <div>8</div>
        <div>8</div>
      </Step>
    </Beginner>
  );
}
