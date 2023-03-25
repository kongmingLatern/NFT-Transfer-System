import { isLegalSortArray } from "@/utils";
import React, { useMemo, useState } from "react";

// NOTE: 新手导航
function Beginner(props) {
  console.log(props);
  const { children } = props;
  const orderList = useMemo(
    () => getChildrenOrderByProps(children),
    [children]
  );
  const [currentStep, setCurrentStep] = useState(orderList[0]);
  // 根据 orderList 的顺序进行渲染
  if (!isLegalSortArray(orderList)) {
    console.warn("order 顺序不合法，各个步骤之间的差值只为1");
    return;
  }
  return (
    <>
      {React.Children.map(children, (child) => {
        if (child.props.order === currentStep) {
          return (
            <>
              {React.cloneElement(child)}
              <button
                className="btn"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                下一步
              </button>
            </>
          );
        }
      })}
    </>
  );
}

function getChildrenOrderByProps(children: any) {
  const orderList = [];
  children.map((item) => {
    orderList.push(item.props.order);
  });
  return orderList.sort();
}

// NOTE: 新手导航步骤
function Step({ order, children }) {
  const renderChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, { order });
  });

  // 根据order来渲染
  return <>{renderChildren}</>;
}

Beginner.Step = Step;

export function TestBeginer() {
  return (
    <Beginner>
      <Step order={1}>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
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

export { Step };

export default Beginner;
