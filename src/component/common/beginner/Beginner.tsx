import { getChildrenOrderByProps, isLegalSortArray, isObject } from "@/utils";
import React, { Fragment, useMemo, useRef, useState } from "react";
import "./style/beginner.css";

interface BeginnerType {
  className: string;
  type: "remove" | "origin";
  children: any;
}

interface StepType {
  order: number;
  children: any;
  step: number;
}

function render(children) {
  const orderList = useMemo(
    () => getChildrenOrderByProps(children),
    [children]
  );
  const [currentStep, setCurrentStep] = useState(orderList[0]);
  console.log("render", currentStep);
  // 根据 orderList 的顺序进行渲染
  if (!isLegalSortArray(orderList)) {
    console.warn("order 顺序不合法，各个步骤之间的差值只为1");
    return;
  } else if (currentStep > orderList[orderList.length - 1]) {
    console.warn("已经是最后一步了");
    return children;
  }

  return React.Children.map(children, (child) => {
    // NOTE: 如果当前的 order 等于当前的步骤，就渲染出来
    if (child?.props?.order && child?.props?.order === currentStep) {
      console.log(child);
      return (
        <Fragment key={child}>
          {React.cloneElement(child, { order: currentStep, step: currentStep })}
          <button
            className="btn"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            下一步
          </button>
        </Fragment>
      );
    } else {
      return child;
    }
  });
}

// NOTE: 新手导航
function Beginner({
  className,
  type = "remove",
  children,
}: Partial<BeginnerType>) {
  const orderList = useMemo(
    () => getChildrenOrderByProps(children),
    [children]
  );
  const [currentStep, setCurrentStep] = useState(orderList[0]);

  function removeCover(currentStep) {
    const cover: Element = document.querySelector(`#cover${currentStep}`);
    console.log("cover", cover);
    if (cover) {
      cover.style.display = "none";
      console.log("remove", cover);
      setCurrentStep(currentStep + 1);
      // cover.remove();
    }
  }

  console.log("render", currentStep);
  // 根据 orderList 的顺序进行渲染
  if (!isLegalSortArray(orderList)) {
    console.warn("order 顺序不合法，各个步骤之间的差值只为1");
    return;
  } else if (currentStep > orderList[orderList.length - 1]) {
    console.warn("已经是最后一步了");
    return type === "remove" ? null : children;
  }

  return React.Children.map(children, (child) => {
    // NOTE: 如果当前的 order 等于当前的步骤，就渲染出来

    // NOTE: 含有 order 属性
    if (child?.props?.order) {
      // NOTE: 当前执行的步骤为当前的 order
      if (child?.props?.order === currentStep) {
        console.log("child", child);
        return (
          <Fragment key={child}>
            {React.cloneElement(child, {
              order: currentStep,
              step: currentStep,
            })}
            <button className="btn" onClick={() => removeCover(currentStep)}>
              下一步
            </button>
          </Fragment>
        );
      } else {
        return type === "remove" ? null : child;
      }
    } else {
      return child;
    }
  });
  // console.log(children);
  // if (!Array.isArray(children) && children.props.children) {
  //   return className ? (
  //     <div className={className}>{render(children.props.children)}</div>
  //   ) : (
  //     render(children.props.children)
  //   );
  // }
  // // NOTE: 获取到所有 Step 内部的 order 属性

  // return className ? (
  //   <div className={className}>{render(children)}</div>
  // ) : (
  //   render(children)
  // );
}

function HighLight({ cover, children }) {
  function helpers(node) {
    // 获取到children的位置
    if (!node) {
      return;
    }
    const body = document.body;
    const doc = document.documentElement;

    const targetWidth = node?.clientWidth,
      targetHeight = node?.clientHeight;
    // page size
    const pageWidth = doc?.scrollWidth,
      pageHeight = doc?.scrollHeight;
    // offset of node
    const offsetTop =
        node.getBoundingClientRect()?.top + (body?.scrollTop || doc?.scrollTop),
      offsetLeft =
        node.getBoundingClientRect()?.left +
        (body?.scrollLeft || doc?.scrollLeft);

    const top = offsetTop;
    const right = pageWidth - targetWidth - offsetLeft;
    const bottom = pageHeight - targetHeight - offsetTop;
    const left = offsetLeft;

    return {
      targetHeight,
      targetWidth,
      pageHeight,
      pageWidth,
      offsetTop,
      offsetLeft,
      top,
      right,
      bottom,
      left,
    };
  }
  function addStyles(node, { targetHeight, targetWidth, offsetLeft, top }) {
    if (!node) {
      return;
    }
    console.log(node);
    node.style.width = targetWidth + "px";
    node.style.height = targetHeight + "px";
    node.style.top = top + "px";
    node.style.left = offsetLeft + "px";
    // node.style.borderWidth =
    //   offsetTop +
    //   "px " +
    //   (pageWidth - targetWidth - offsetLeft) +
    //   "px " +
    //   (pageHeight - targetHeight - offsetTop) +
    //   "px " +
    //   offsetLeft +
    //   "px";
    node.style.display = "block";
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        ref: (node) => {
          if (index !== 0 || !node) {
            return;
          }
          const positionInfo = helpers(node);
          const coverNode = cover.current;
          addStyles(coverNode, positionInfo);
        },
        key: child + index,
      });
    });
  };
  return (
    <>
      {/* 高亮显示 children   */}
      {renderChildren()}
    </>
  );
}

// NOTE: 新手导航步骤
function Step({ order, children, step }: Partial<StepType>) {
  console.log("step", step);
  console.log("order", order);
  console.log("children", children);

  const cover = useRef(null);
  // 根据order来渲染
  return (
    <>
      {/* 需要对这个children进行高亮处理 */}
      {/* 遮罩层 */}
      {step === order && (
        <div className="cover" id={"cover" + order} ref={cover}></div>
      )}
      <HighLight cover={cover}>
        <div>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              key: child,
              order,
            });
          })}
        </div>
      </HighLight>
    </>
  );
}

Beginner.Step = Step;

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

export { Step };

export default Beginner;
